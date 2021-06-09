import {atom} from "recoil";

/**
 * represents global state value for game time, which determines how long the game is running
 * default value is 0 - game starts with 0 game time, after each iteration game time is increasing by one
 */
export const GameTimeState = atom({
    key: 'GameTimeState',
    default: 0,
});
