import {atom} from "recoil";

/**
 * Represents global state value, which determines if game is running.
 * Default value is false - game starts paused.
 */
export const GameFlowState = atom({
    key: 'GameFlowState',
    default: false,
});
