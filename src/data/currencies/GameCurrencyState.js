import {atom} from "recoil";

/**
 * Represents global state value for main game currency.
 * Default value is 10 - game starts with 10 main game currency.
 */
export const GameCurrencyState = atom({
    key: 'gameCurrenyValue',
    default: 10,
});
