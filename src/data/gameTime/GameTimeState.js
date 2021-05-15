import {atom} from "recoil";

//urcuje cas v hre
export const GameTimeState = atom({
    key: 'GameTimeState',
    default: 0,
});