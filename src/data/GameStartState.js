import {atom} from "recoil";

/**
 * Represents global state value for game start, which determines if game has started.
 * This value is changed after start button on main page is triggered.
 */
export const GameStartState = atom({
    key: 'GameStartState',
    default: true,
});
