import {atom} from "recoil";

/**
 * represents global state value for game start, which determines if game has started
 * this value is changed after start button on main page is triggered
 */
export const GameStartState = atom({
    key: 'GameStartState',
    default: true,
});
