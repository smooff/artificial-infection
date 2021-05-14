import {atom, selector} from "recoil";

const beta = 0.941;
const beta2 = 0.0504;
const betaDiff = beta - beta2;
const x = Math.round((betaDiff/5.24)*10000)/10000;


export const TracingTestingState = atom({
    key: 'TracingTestingState',
    default: {
        testingState:true,
        contactTracingState:true,

        Testing:0,
        TestingPrice:3,

        AdvancedDetectionSystem:0,
        AdvancedDetectionSystemPrice:5,
        AdvancedDetectionSystemBeta:0.23*x,

        TestingCapacityEnhancement :0,
        TestingCapacityEnhancementPrice:3,
        TestingCapacityEnhancementBeta:-0.1*x,

        TestingInformation:0,
        TestingInformationPrice:3,
        TestingInformationBeta:-0.1*x,

        InfrastructureTesting:0,
        InfrastructureTestingPrice:3,
        InfrastructureTestingBeta:0.05*x,

        BorderHealthCheck:0,
        BorderHealthCheckPrice:4,
        BorderHealthCheckBeta:0.09*x,

        AirportHealthCheck:0,
        AirportHealthCheckPrice:3,
        AirportHealthCheckBeta:-0.2*x,

        ContactTracing:0,
        ContactTracingPrice:4,
        ContactTracingBeta:0.15*x,

        AdvancedContactTracing:0,
        AdvancedContactTracingPrice:4,
        AdvancedContactTracingBeta:0.15*x,
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
