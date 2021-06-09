import {atom} from "recoil";

/**
 * represents global state value, which determines if game is running
 * default value is false - game starts paused
 */
export const GameFlowState = atom({
    key: 'GameFlowState',
    default: false,
});
