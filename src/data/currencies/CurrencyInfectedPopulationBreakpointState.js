import {atom} from "recoil";

/**
 * Represents global state value for breakpoints check (after hitting breakpoint clickable currency is added).
 * Default value is 50000000, every other 50000000 is added after hitting breakpoint
 */
export const CurrencyInfectedPopulationBreakpointState = atom({
    key: 'CurrencyInfectedPopulationBreakpointState',
    default: 50000000,
});
