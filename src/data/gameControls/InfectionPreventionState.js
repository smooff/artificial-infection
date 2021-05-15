import {atom, selector} from "recoil";
import {betaPerMeasurementStrength, deltaPerMeasurementStrength} from "../parameters/parametersCalculation";

export const InfectionPreventionState = atom({
    key: 'InfectionPreventionState',
    default: {
        quarantineState: true,
        socialDistancingState: true,

        EnvironmentDisinfection: 0,
        EnvironmentDisinfectionPrice: 4,
        EnvironmentDisinfectionBeta: 0.01 * betaPerMeasurementStrength,

        PPE: 0,
        PPEPrice: 6,
        PPEBeta: 0.15 * betaPerMeasurementStrength,

        InfectiousIsolation: 0,
        InfectiousIsolationPrice: 4,
        InfectiousIsolationBeta: 0.02 * betaPerMeasurementStrength,

        Quarantine: 0,
        QuarantinePrice: 5,
        QuarantineBeta: 0.3 * betaPerMeasurementStrength,

        QuarantineFacilities: 0,
        QuarantineFacilitiesPrice: 3,
        QuarantineFacilitiesBeta: 0.05 * betaPerMeasurementStrength,

        ArmyHelp: 0,
        ArmyHelpPrice: 5,
        ArmyHelpBeta: 0.17 * betaPerMeasurementStrength,
        ArmyHelpDelta: 0.17 * deltaPerMeasurementStrength,

        SpecialEstablishments: 0,
        SpecialEstablishmentsPrice: 4,
        SpecialEstablishmentsBeta: 0.21 * betaPerMeasurementStrength,
        SpecialEstablishmentsDelta: 0.21 * deltaPerMeasurementStrength,

        SpecialPopulation: 0,
        SpecialPopulationPrice: 6,
        SpecialPopulationBeta: 0.22 * betaPerMeasurementStrength,
        SpecialPopulationDelta: 0.22 * deltaPerMeasurementStrength,

        SocialDistancing: 0,
        SocialDistancingPrice: 3,

        MassGathering: 0,
        MassGatheringPrice: 6,
        MassGatheringBeta: 0.35 * betaPerMeasurementStrength,

        SmallGathering: 0,
        SmallGatheringPrice: 6,
        SmallGatheringBeta: 0.38 * betaPerMeasurementStrength,

        EducationalInstitutions: 0,
        EducationalInstitutionsPrice: 6,
        EducationalInstitutionsBeta: 0.25 * betaPerMeasurementStrength,

        SafetyProtocols: 0,
        SafetyProtocolsPrice: 4,
        SafetyProtocolsBeta: 0.01 * betaPerMeasurementStrength,

        Surveillance: 0,
        SurveillancePrice: 3,
        SurveillanceBeta: -0.1 * betaPerMeasurementStrength,
    },
});

//selector pre prepocet dovery
export const InfectionPreventionMeasuresSelector = selector({
    key: 'InfectionPreventionMeasuresSelector',
    get: ({get}) => {
        const bigState = get(InfectionPreventionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (measurement === "EnvironmentDisinfection" || measurement === "PPE" || measurement === "InfectiousIsolation" ||
                measurement === "Quarantine" || measurement === "QuarantineFacilities" || measurement === "ArmyHelp" || measurement === "SpecialEstablishments"
                || measurement === "SpecialPopulation" || measurement === "SocialDistancing" || measurement === "MassGathering" || measurement === "SmallGathering"
                || measurement === "EducationalInstitutions" || measurement === "SafetyProtocols" || measurement === "Surveillance") {
                if (bigState[measurement] === 1) {
                    count++;
                }
            }
        });
        return count;
    },
});
