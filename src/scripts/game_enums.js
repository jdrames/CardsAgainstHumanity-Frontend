/**
 * Enums for the game
 */

/**
 * Game status enums
 */
export const GameStatus = Object.freeze({
	"Created": 1,
	"ActiveRound": 2,
	"WaitingCardZarSelection": 3,
	"DisplayWinner": 4,
	"Cancelled": 5,
	"WaitingOtherPlayers": 6
});

/**
 * Pause reason enums
 */
export const PauseReason = Object.freeze({
	"NotPaused": 0,
	"NotEnoughPlayers": 1,
	"CardZarLeftGame": 2,
	"NoHost": 3,
	"Reconnecting": 4
});

export default {GameStatus, PauseReason} 