import {atom} from "recoil";

/**
 * represents global state value for inhibitors, which is slows the infection spread and mortality (beta and delta param.)
 */
export const ActivableInhibitorsState = atom({
    key: 'ActivableInhibitorsState',
    default: {
        infectivityInhibitor: 0,
        mortalityInhibitor: 0
    },
});
