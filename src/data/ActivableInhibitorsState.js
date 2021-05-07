import {atom} from "recoil";

//urcuje ci uz bola prva infikovana krajina nasatavena
export const ActivableInhibitorsState = atom({
    key: 'ActivableInhibitorsState',
    default: {
        infectivityInhibitor: 0,
        mortalityInhibitor: 0
    },
});
