/**
 * Game hub used to interact with the ForceMX CAH game server
 */
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export default {
    install(Vue){
        // Create a new vue instance.
        // This will be used to handle events
        const hub = new Vue();
        Vue.prototype.$gamehub = hub;

        /** HubConnection */
        let connection = null;

        /** promise for when connection is started */
        let startedPromise = null;

        /** Indicates if the connection was manually closed by the user */
        let manuallyClosed = false;

        Vue.prototype.startGameHub = (jwtToken, gameId) => {
            connection = new HubConnectionBuilder()
                .withUrl(`${Vue.prototype.$axios.default.baseUrl}/game-hub`, jwtToken ? {accessTokenFactory:()=>jwtToken} : null)
                .configureLogging(Vue.config.devtools ? LogLevel.Debug : LogLevel.Information)
                .build();

            function start(){
                startedPromise = connection.start()
                    .then(()=>{hub.$emit('connected')})
                    .catch(error=>console.error(error));
                return startedPromise;
            }

            connection.onclose(()=>{
                hub.$emit('disconnected');
                if(!manuallyClosed) start(); // attempt to reconnect if the disconnection was not triggered by user
            });

            // Setup Hub Listeners
            connection.on('PlayerJoined', (gameid, player) => gameid == gameId ? hub.$emit('PlayerJoined', player) : null);
            connection.on('PlayerLeft', (gameid, player) => gameid == gameId ? hub.$emit('PlayerLeft', player) : null);
            connection.on('RoundStarted', (gameid, game) => gameid == gameId ? hub.$emit('RoundStarted', game) : null);
            connection.on('AwaitingWinnerSelection', (gameid, cards) => gameid == gameId ? hub.$emit('AwaitingWinnerSelection', cards) : null);
            connection.on('WinnerSelected', (gameid, winner)=> gameid == gameId ? hub.$emit('WinnerSelected', winner) : null);
            connection.on('GamePaused', (gameid, reason) => gameid == gameId ? hub.$emit('GamePaused', reason) : null);
            connection.on('GameResumed', (gameid) => gameid == gameId ? hub.$emit('GameResumed') : null);

            // start connection
            manuallyClosed = false;
            start();
        }
    }
}