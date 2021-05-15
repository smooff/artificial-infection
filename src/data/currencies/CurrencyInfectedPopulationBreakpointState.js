import {atom} from "recoil";

//uchovava stav breakpointu pre pridanie hernej meny za pocet infikovanych
export const CurrencyInfectedPopulationBreakpointState = atom({
    key: 'CurrencyInfectedPopulationBreakpointState',
    default: 50000000,
});
