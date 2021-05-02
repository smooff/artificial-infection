import {atom} from "recoil";


export const TracingTestingState = atom({
    key: 'TracingTestingState',
    default: {
        testingState:true,
        contactTracingState:true,

        Testing:0,
        TestingPrice:2,

        AdvancedDetectionSystem:0,
        AdvancedDetectionSystemPrice:3,
        AdvancedDetectionSystemBeta:0.0391,

        TestingCapacityEnhancement :0,
        TestingCapacityEnhancementPrice:3,
        TestingCapacityEnhancementBeta:-0.017,

        TestingInformation:0,
        TestingInformationPrice:1,
        TestingInformationBeta:-0.017,

        InfrastructureTesting:0,
        InfrastructureTestingPrice:1,
        InfrastructureTestingBeta:0.0085,

        BorderHealthCheck:0,
        BorderHealthCheckPrice:2,
        BorderHealthCheckBeta:0.0153,

        AirportHealthCheck:0,
        AirportHealthCheckPrice:2,
        AirportHealthCheckBeta:-0.034,

        ContactTracing:0,
        ContactTracingPrice:3,
        ContactTracingBeta:0.0255,

        AdvancedContactTracing:0,
        AdvancedContactTracingPrice:3,
        AdvancedContactTracingBeta:0.0255,
    },
});
