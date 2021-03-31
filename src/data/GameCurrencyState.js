import {atom} from "recoil";

//reprezentuje hernu menu
export const GameCurrencyState = atom({
    key: 'gameCurrenyValue',
    default: 100,
});