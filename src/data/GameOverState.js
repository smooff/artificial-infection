import {atom} from "recoil";

/**
 * Represents global state value for game over, which determines if game has ended.
 * Default values lose - 0, win - 0. These values are only set after game over check is triggered.
 * Default values loseReason/winReason is set after game has ended, it contains string value with message why game has ended.
 */
export const GameOverState = atom({
    key: 'GameOverState',
    default: {
        lose: 0,
        win: 0,

        loseReason: "",
        winReason: "",
    },
});
