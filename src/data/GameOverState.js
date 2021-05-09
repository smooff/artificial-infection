import {atom} from "recoil";

export const GameOverState = atom({
    key: 'GameOverState',
    default: {
        lose:0,
        win:0,

        loseReason:"",
        winReason:"",
    },
});
