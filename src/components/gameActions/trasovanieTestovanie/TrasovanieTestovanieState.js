import {atom} from "recoil";


export const TrasovanieTestovanieState = atom({
    key: 'TrasovanieTestovanieState',
    default: {
        BasicTracing:0,
        BasicTracingPrice:2,
        AdvancedTracing:0,
        AdvancedTracingPrice:3,
    },
});