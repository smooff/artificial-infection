import {atom} from "recoil";


export const bottomInfoBarState = atom({
    key: 'bottomBar',
    default: {
        SusceptiblesCount: 0,
        InfectiousCount: 0,
        RecoveredCount: 0,
        DeceasedCount: 0,
    },
});