import {atom, selector} from "recoil";


export const TracingTestingState = atom({
    key: 'TracingTestingState',
    default: {
        testingState:true,
        contactTracingState:true,

        Testing:0,
        TestingPrice:3,

        AdvancedDetectionSystem:0,
        AdvancedDetectionSystemPrice:5,
        AdvancedDetectionSystemBeta:0.0391,

        TestingCapacityEnhancement :0,
        TestingCapacityEnhancementPrice:3,
        TestingCapacityEnhancementBeta:-0.017,

        TestingInformation:0,
        TestingInformationPrice:3,
        TestingInformationBeta:-0.017,

        InfrastructureTesting:0,
        InfrastructureTestingPrice:3,
        InfrastructureTestingBeta:0.0085,

        BorderHealthCheck:0,
        BorderHealthCheckPrice:4,
        BorderHealthCheckBeta:0.0153,

        AirportHealthCheck:0,
        AirportHealthCheckPrice:3,
        AirportHealthCheckBeta:-0.034,

        ContactTracing:0,
        ContactTracingPrice:4,
        ContactTracingBeta:0.0255,

        AdvancedContactTracing:0,
        AdvancedContactTracingPrice:4,
        AdvancedContactTracingBeta:0.0255,
    },
});

//selector pre prepocet dovery
export const TracingTestingMeasuresSelector = selector({
    key: 'TracingTestingMeasuresSelector',
    get: ({get}) => {
        const bigState = get(TracingTestingState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if(measurement==="Testing" || measurement==="AdvancedDetectionSystem" || measurement==="TestingCapacityEnhancement" ||
                measurement==="TestingInformation" || measurement==="InfrastructureTesting" || measurement==="BorderHealthCheck" || measurement==="AirportHealthCheck"
                || measurement==="ContactTracing" || measurement==="AdvancedContactTracing"){
                if(bigState[measurement]===1){
                    count++;
                }
            }
        });

        return count;
    },
});
