import {atom} from "recoil";

//reprezentuje hlavnu hernu menu
export const GameCurrencyState = atom({
    key: 'gameCurrenyValue',
    default: 10,
});
