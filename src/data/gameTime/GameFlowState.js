import {atom} from "recoil";

//urcuje ci hra bezi alebo je pauznuta
export const GameFlowState = atom({
    key: 'GameFlowState',
    default: true,
});