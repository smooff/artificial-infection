import {atom} from "recoil";


/**
 * Represents global state value for clickable (temporary) game currency.
 * Default value is 0 - game starts with 0 clickable game currency
 */
//user transform this currency into main currency (GameCurrencyState.js)
export const ClickableGameCurrencyState = atom({
    key: 'ClickableGameCurrencyState',
    default: 0,
});

