import {atom} from "recoil";

/**
 *  represents global state value for some of the strict measurements
 *  default is object containing variables, those variables are set to 0
 *  after activating specific measurements, those variables will be set to 1
 *  this state is used for game trust breakpoints check
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
