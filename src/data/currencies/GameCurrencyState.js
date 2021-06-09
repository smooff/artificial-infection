import {atom} from "recoil";

/**
 * represents global state value for main game currency
 * default value is 10 - game starts with 10 main game currency
 */
export const GameCurrencyState = atom({
    key: 'gameCurrenyValue',
    default: 10,
});
