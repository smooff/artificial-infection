import {atom} from "recoil";

//sluzi ako stav, ze kolko dni je aktivovany lockdown, ...
//je to pre prepocet dovery
export const StrictMeasuresTimeState = atom({
    key: 'StrictMeasuresTimeState',
    default: {
        lockdown: 0,
        borders:0,
        airports:0,
        seaports:0
    },
});
