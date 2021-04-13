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

        TestingCapacityEnhancement :0,
        TestingCapacityEnhancementPrice:3,

        TestingInformation:0,
        TestingInformationPrice:1,

        InfrastructureTesting:0,
        InfrastructureTestingPrice:1,

        BorderHealthCheck:0,
        BorderHealthCheckPrice:2,

        AirportHealthCheck:0,
        AirportHealthCheckPrice:2,

        Surveillance:0,
        SurveillancePrice:2,

        ContactTracing:0,
        ContactTracingPrice:3,

        AdvancedContactTracing:0,
        AdvancedContactTracingPrice:3,
    },
});