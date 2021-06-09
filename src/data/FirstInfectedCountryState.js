import {atom} from "recoil";

/**
 * represents global state value for first picked country, which determines if the first country was already infected (at the start of the game)
 */
export const FirstInfectedCountryState = atom({
    key: 'FirstInfectedCountryState',
    default: 0,
});
