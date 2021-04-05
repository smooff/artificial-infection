import {atom} from "recoil";

//urcuje ci uz bola prva infikovana krajina nasatavena
export const FirstInfectedCountryState = atom({
    key: 'FirstInfectedCountryState',
    default: 0,
});