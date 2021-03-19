<template>
	<v-container fluid class="fill-height" id="gameboard">
		

		<!-- Active Game Board -->
		<v-layout align-start class="d-flex flex-column" v-if="Game.state != 1">
			<div v-if="Game.state == 6">
				Waiting for other players
				<v-progress-linear indeterminate color="cyan"></v-progress-linear>
			</div>

			<div class="d-flex flex-wrap mb-6">
				<!-- Prompt Card -->
				<div class="d-flex flex-column">
					Prompt card
					<fmx-card :card="Game.current_prompt_card" class="mb-4 mr-4"></fmx-card>
				</div>

				<!-- Playing Section -->
				<div class="d-flex flex-column">
					Play Area
					<div class="d-flex flex-wrap card-container">
						<template v-if="Game.state == 2 && Game.card_zar_id == $store.state.id" class="justify-center">
							<h3>You Are The Card Zar</h3>
						</template>
						<player-board :Cards="Game.player_card_to_play" :GameStatus="Game.state" :PickAmount="Game.current_prompt_card.pick_amount" v-if="Game.state == 2 && Game.card_zar_id != $store.state.id" />
						<card-zar-board :Cards="Game.played_cards" :GameStatus="Game.state" :CardZar="Game.card_zar_id" v-if="Game.state == 3" />
						<winner-board :Cards="Game.played_cards" v-if="Game.state == 4" />
					</div>
				</div>
			</div>
		

			<!-- Players Cards -->
			<div class="align-end">
				<div class="d-flex flex-column">
					Your Cards
					<div class="card-container">
						<fmx-card v-for="(card, card_index) in Game.player_cards" :key="card.id" :card="card" class="mb-2" @click.native="EventBus.$emit('select_card', card_index)"></fmx-card>
					</div>
				</div>
			</div>
		</v-layout>

		<!-- Waiting To Start Game -->
		<v-overlay absolute opacity="90" class="pa-2" v-if="Game.state == 1">
			<v-card light>
				<v-card-title class="headline">
					Waiting to start game
				</v-card-title>
				<v-card-text>
					<div v-if="Game.creator_id == $store.state.id" class="mb-2" @click="copyJoinLink">
						<h3 class="subheading">Game Details</h3>
						<em>Click to copy Join Link to Clipboard</em>
						<br />
						GameId: {{$route.query.id}}<br />
						AccessCode: {{$route.query.code}}
					</div>
					<h3 class="subheading">Players in Lobby</h3>
					<v-list dense>
						<template v-for="player in Game.players">
							<v-list-item :key="player.id">
								{{player.name}}
								<v-icon color="yellow darken-3" v-if="player.id == Game.creator_id">mdi-crown</v-icon>
							</v-list-item>
						</template>
					</v-list>
				</v-card-text>
				<v-card-actions v-if="Game.creator_id == $store.state.id">
					<v-spacer></v-spacer>
					<v-btn color="primary darken-2" @click="EventBus.$emit('start_game')" v-if="Game.players.length >= 3">Start Game</v-btn>
				</v-card-actions>
			</v-card>
		</v-overlay>		
		<!-- End Waiting to Start Game -->

		<v-navigation-drawer class="mr-2" app right permanent bottom v-if="Game.state != 1">
			<h3 class="text-center">Players</h3>
			<v-list dense>
				<v-list-item v-for="player in Game.players" :key="player.id">
					<v-icon v-if="Game.card_zar_id == player.id" class="mr-2" color="yellow darken-2">mdi-crown</v-icon>
					{{player.points}} - {{player.name}} 
				</v-list-item>
				
			</v-list>
		</v-navigation-drawer>
	</v-container>
</template>
<script>
import EventBus from '../scripts/eventBus';
import Card from "../components/Game/Card.vue";
import PlayerBoard from "../components/Game/PlayerSelectedCards.vue";
import CardZarBoard from "../components/Game/PlayedCards.vue";
import WinnerBoard from "../components/Game/Winner.vue";

import router from "../router/index";

import {
	ref,
	onMounted,
	onUnmounted,
	
} from "@vue/composition-api";

//import game, { Connect } from "../scripts/game";
import Game, {Start, Stop} from "../scripts/gamehub.v2";

export default {
	name: "Game",
	components: {
		"fmx-card": Card,
		"card-zar-board": CardZarBoard,
		"player-board": PlayerBoard,
		"winner-board": WinnerBoard
	},
	setup() {
		const slider = ref(0);
				
		onMounted(() => {
			if (!router.currentRoute.query?.id) return router.push("/");

			Start(router.currentRoute.query.id);
		});

		let copyJoinLink = () => {
			window.navigator.clipboard.writeText(
				`${window.origin}/?join=${router.currentRoute.query.id}&code=${router.currentRoute.query.code}`
			);
		};

		let onlinePlayerCount = () => {
			let count = 0;
			Game.Game.players.forEach((p)=>{
				console.log("player online", p);
				if(p.is_online) count++;
			})
			return count;
		};

		onUnmounted(() => {
			Stop();
		});

		return { ...Game, copyJoinLink, onlinePlayerCount, slider, EventBus };
	},
};
</script>
<style>
.card-container > *:not(:last-child) {
	margin-right: 8px;
}

.card-container > .play-box {
	margin-bottom: 8px;
}

.v-list-item {
	min-height: fit-content !important;
}

.card-actions {
	position: absolute;
	width: 100%;
	bottom: 0;
}
</style>