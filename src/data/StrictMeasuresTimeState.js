import {atom} from "recoil";

/**
 *  Represents global state value for some of the strict measurements.
 *  Default is object containing variables, those variables are set to 0.
 *  After activating specific measurements, those variables will be set to 1.
 *  This state is used for game trust breakpoints check.
 */
export const StrictMeasuresTimeState = atom({
    key: 'StrictMeasuresTimeState',
    default: {
        lockdown: 0,
        borders: 0,
        airports: 0,
        seaports: 0
    },
});
