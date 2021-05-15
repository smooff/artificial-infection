import {atom} from "recoil";

//urcuje ci sa hra ukoncila - bud vitazstvom alebo prehrou
export const GameOverState = atom({
    key: 'GameOverState',
    default: {
        lose: 0,
        win: 0,

        loseReason: "",
        winReason: "",
    },
});
