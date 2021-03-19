/**
 * Game Hub
 */

import EventBus from './eventBus'
import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr'
import GameEnums from './game_enums'
import $store from '../store'
import $router from '../router'
import { ref, reactive, set } from '@vue/composition-api'

// Default Game State Object
const Game = reactive({
	id: "",
	creator_id: "",
	state: GameEnums.GameStatus.Created,
	card_zar_id: "",
	player_cards: [],
	players: [],
	player_card_to_play: [],
	played_cards: {},
	current_prompt_card: {},	
	is_paused: false,
	paused_reason: GameEnums.PauseReason.NotPaused
});

var ConnectionStatus = ref(HubConnectionState.Disconnected);
var Connection = null;

export const Start = (game_id) => {
	set(Game, "id", game_id);

	Connection = new HubConnectionBuilder()
		.withUrl(`${EventBus.$axios.defaults.baseURL}/game-hub`, { accessTokenFactory: () => $store.state.token })
		.configureLogging(EventBus.$mode == 'dev' ? LogLevel.Debug : LogLevel.Information)
		.withAutomaticReconnect()		
		.build();

	// Connection Lifecycle event listeners
	Connection.onreconnecting(() => {
		ConnectionStatus.value = HubConnectionState.Reconnecting;
		Game.is_paused = true;
		Game.paused_reason = GameEnums.PauseReason.Reconnecting;
	});

	Connection.onreconnected(() => {
		ConnectionStatus.value = HubConnectionState.Connected;
		GetGame(game_id);
	});

	Connection.onclose(() => {
		RemoveListeners();
		Connection = null;
		$router.push("/");
	});

	AddListeners();

	Connection.start().then(() => {
		GetGame(game_id);
	});
}

export const Stop = () => {
	if (Connection != null) {
		if (Connection.state != HubConnectionState.Disconnected || Connection.state != HubConnectionState.Disconnecting) {
			Connection.stop()
				.then(() => {
					Connection = null;
				})
		}
	}
	RemoveListeners();
	$router.push("/");
}

const AddListeners = () => {
	if (Connection == null)
		return;

	// SignalR Game-Hub Events
	Connection.on('player_joined', (player) => PlayerJoined(player));
	Connection.on('player_left', (player_id) => PlayerLeft(player_id));
	Connection.on('start_round', (game) => StartRound(game));
	Connection.on('all_players_ready', (played_cards)=>AllPlayersReady(played_cards));
	Connection.on('round_winner', (player_id)=>RoundWinner(player_id));
	Connection.on('game_cancelled', ()=> Stop());
	Connection.on('pause_game', (paused_reason)=>PauseGame(paused_reason));

	// Player action events
	EventBus.$on('start_game', () => StartGame());
	EventBus.$on('submit_cards', ()=> SubmitCards());
	EventBus.$on('select_card', (card_index) => SelectCard(card_index));
	EventBus.$on('return_card_to_hand', (card_index)=> ReturnCardToHand(card_index));
	EventBus.$on('select_winner', (winner_id) => SelectWinner(winner_id));
}

const RemoveListeners = () => {
	Connection.off('player_joined');
	Connection.off('player_left');
	Connection.off('start_round');
	Connection.off('all_players_ready');
	Connection.off('round_winner');
	Connection.off('game_cancelled');

	EventBus.$off('start_game');
	EventBus.$off('submit_cards');
	EventBus.$off('select_card');
	EventBus.$off('return_card_to_hand');
	EventBus.$off('select_winner');
}

// Event Processors for received events

const PlayerJoined = (player) => {
	//Game.players.filter(p=>p.id == player.id)
	var player_index = Game.players.findIndex(p=>p.id == player.id);
	if(player_index < 0)
		Game.players.push(player);
	set(Game.players, player_index, player);
}

const PlayerLeft = (player_id) => {
	var player_index = Game.players.findIndex(p=>p.id == player_id);
	if(player_index >= 0)
		Game.players.splice(player_index, 1);
}

const StartRound = (game) => {
	set(Game, "state", game.state);
	set(Game, "card_zar_id", game.card_zar_id);
	set(Game, "players", game.players);
	set(Game, "current_prompt_card", game.current_prompt_card);
	set(Game, "is_paused", game.is_paused);
	set(Game, "paused_reason", game.paused_reason);
	set(Game, "player_card_to_play", []);	
	set(Game, "played_cards", {});

	// get the players cards
	Connection.invoke('GetPlayerCards', Game.id).then((player_cards)=>{
		set(Game, "player_cards", player_cards);
	});
}

const AllPlayersReady = (played_cards) => {
	set(Game, "state", GameEnums.GameStatus.WaitingCardZarSelection);
	set(Game, "played_cards", played_cards);
}

const RoundWinner = (winner_id) => {
	Object.keys(Game.played_cards).forEach((key)=>{
		if(key != winner_id)
			delete Game.played_cards[key];
	});

	set(Game, "state", GameEnums.GameStatus.DisplayWinner);
}

const PauseGame = (pause_reason) => {
	set(Game, "is_paused", true);
	set(Game, "paused_reason", pause_reason);
}

// Event processors for submitted events
const GetGame = () => {
	console.log(Game.id);
	Connection.invoke("GetGame", Game.id).then((game)=>{
		if(game == null)
			return Stop();
			
		Game.creator_id = game.creator_id;
		Game.current_prompt_card = game.current_prompt_card;
		Game.is_paused = game.is_paused;
		Game.paused_reason = game.paused_reason;		
		Game.players = game.players;
		Game.state = game.state;
	})
}

const StartGame = () => {
	if(Game.creator_id != $store.state.id)
		return;
	
	Connection.invoke('StartGame', Game.id);
}

const SubmitCards = () =>{
	Game.state = GameEnums.GameStatus.WaitingOtherPlayers;
	Connection.invoke('SubmitPlayerCards', Game.id, Game.player_card_to_play).then((result)=>{
		if(result === false)
			Game.state = GameEnums.GameStatus.ActiveRound;
	});
}

const SelectCard = (card_index) => {
	if(Game.state != GameEnums.GameStatus.ActiveRound)
		return;
	if(Game.card_zar_id == $store.state.id)		
		return;
	if(Game.player_card_to_play.length == Game.current_prompt_card.pick_amount)
		return;

	var card = Game.player_cards.splice(card_index, 1);
	Game.player_card_to_play.push(card[0]);
}

const ReturnCardToHand = (card_index) => {
	if(Game.state != GameEnums.GameStatus.ActiveRound)
		return;

	var card = Game.player_card_to_play.splice(card_index, 1);
	Game.player_cards.push(card[0]);
}

const SelectWinner = (winner_id) => {
	Connection.invoke("SubmitWinner", Game.id, winner_id);
}

export default {
	ConnectionStatus,
	Game
}