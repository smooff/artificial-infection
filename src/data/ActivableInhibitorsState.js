import {atom} from "recoil";

//urcuje pocet aktivovanych inhibitorov (spomalovacov) sirenia nakazy a smrtnosti
export const ActivableInhibitorsState = atom({
    key: 'ActivableInhibitorsState',
    default: {
        infectivityInhibitor: 0,
        mortalityInhibitor: 0
    },
});
