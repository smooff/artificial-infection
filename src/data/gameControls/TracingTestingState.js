import {atom, selector} from "recoil";
import {betaPerMeasurementStrength} from "../parameters/parametersCalculation";


export const TracingTestingState = atom({
    key: 'TracingTestingState',
    default: {
        testingState: true,
        contactTracingState: true,

        Testing: 0,
        TestingPrice: 3,

        AdvancedDetectionSystem: 0,
        AdvancedDetectionSystemPrice: 5,
        AdvancedDetectionSystemBeta: 0.23 * betaPerMeasurementStrength,

        TestingCapacityEnhancement: 0,
        TestingCapacityEnhancementPrice: 3,
        TestingCapacityEnhancementBeta: -0.1 * betaPerMeasurementStrength,

        TestingInformation: 0,
        TestingInformationPrice: 3,
        TestingInformationBeta: -0.1 * betaPerMeasurementStrength,

        InfrastructureTesting: 0,
        InfrastructureTestingPrice: 3,
        InfrastructureTestingBeta: 0.05 * betaPerMeasurementStrength,

        BorderHealthCheck: 0,
        BorderHealthCheckPrice: 4,
        BorderHealthCheckBeta: 0.09 * betaPerMeasurementStrength,

        AirportHealthCheck: 0,
        AirportHealthCheckPrice: 3,
        AirportHealthCheckBeta: -0.2 * betaPerMeasurementStrength,

        ContactTracing: 0,
        ContactTracingPrice: 4,
        ContactTracingBeta: 0.15 * betaPerMeasurementStrength,

        AdvancedContactTracing: 0,
        AdvancedContactTracingPrice: 4,
        AdvancedContactTracingBeta: 0.15 * betaPerMeasurementStrength,
    },
});

//selector which returns number of active measurements  in TracingTestingState.js
//used for trust breakpoint checks
export const TracingTestingMeasuresSelector = selector({
    key: 'TracingTestingMeasuresSelector',
    get: ({get}) => {
        const bigState = get(TracingTestingState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (measurement === "Testing" || measurement === "AdvancedDetectionSystem" || measurement === "TestingCapacityEnhancement" ||
                measurement === "TestingInformation" || measurement === "InfrastructureTesting" || measurement === "BorderHealthCheck" || measurement === "AirportHealthCheck"
                || measurement === "ContactTracing" || measurement === "AdvancedContactTracing") {
                if (bigState[measurement] === 1) {
                    count++;
                }
            }
        });
        return count;
    },
});
