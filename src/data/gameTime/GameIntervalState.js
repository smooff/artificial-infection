import {atom} from "recoil";

//urcuje interval v ktorom sa budu data prepocitavat
export const GameIntervalState = atom({
    key: 'GameIntervalState',
    default: 2500,
});