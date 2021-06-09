import {atom} from "recoil";

/**
 * represents global state value, which determines how often game interval is called (in milliseconds)
 * default value is 2500 milliseconds - game starts paused, after unpausing the game, game speed (interval) is 2500 milliseconds
 */
export const GameIntervalState = atom({
    key: 'GameIntervalState',
    default: 2500,
});
