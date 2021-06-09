import {atom, selector} from "recoil";
import {betaPerMeasurementStrength, deltaPerMeasurementStrength} from "../parameters/parametersCalculation";

/**
 * Represents global state value for Communication measurements.
 * This object contains multiple variables, for example:
 * EducateCommunicate: 0, determines if measurement EducateCommunicate is activated (if yes, values is 1).
 * EducateCommunicatePrice: 6, determines price (main game currency) for EducateCommunicate measurement.
 * EducateCommunicateBeta: 0.3 * betaPerMeasurementStrength, determines the strength of measurement for changing beta parameter.
 * EducateCommunicateDelta: 0.3 * deltaPerMeasurementStrength, determines the strength of measurement for changing delta parameter.
 * EmergencyStateActive: true, determines if measurements that are part of tree, can be activated (if they can be accessed).
 *
 * Similar objects with same core structure are also CureState.js, InfectionPreventionState.js. Other states are also similar, but with few changes.
 */
export const CommunicationState = atom({
    key: 'CommunicationState',
    default: {
        EmergencyStateActive: true,
        EducateCommunicateActive: true,

        EducateCommunicate: 0,
        EducateCommunicatePrice: 6,
        EducateCommunicateBeta: 0.3 * betaPerMeasurementStrength,
        EducateCommunicateDelta: 0.3 * deltaPerMeasurementStrength,

        GovernmentHelpsVulnerable: 0,
        GovernmentHelpsVulnerablePrice: 6,
        GovernmentHelpsVulnerableBeta: 0.21 * betaPerMeasurementStrength,
        GovernmentHelpsVulnerableDelta: 0.21 * deltaPerMeasurementStrength,

        EmergencyState: 0,
        EmergencyStatePrice: 5,
        EmergencyStateBeta: 0.15 * betaPerMeasurementStrength,

        Curfew: 0,
        CurfewPrice: 6,
        CurfewBeta: 0.15 * betaPerMeasurementStrength,

        TravelWarning: 0,
        TravelWarningPrice: 5,
        TravelWarningBeta: 0.15 * betaPerMeasurementStrength,

        ExpertCommunication: 0,
        ExpertCommunicationPrice: 5,
        ExpertCommunicationBeta: 0.11 * betaPerMeasurementStrength,
        ExpertCommunicationDelta: 0.11 * deltaPerMeasurementStrength,

        CrisisManagement: 0,
        CrisisManagementPrice: 5,
        CrisisManagementBeta: 0.2 * betaPerMeasurementStrength,
        CrisisManagementDelta: 0.2 * deltaPerMeasurementStrength,

        SupplySecurity: 0,
        SupplySecurityPrice: 4,
        SupplySecurityBeta: 0.15 * betaPerMeasurementStrength,
        SupplySecurityDelta: 0.15 * deltaPerMeasurementStrength,

        InternationalHelp: 0,
        InternationalHelpPrice: 4,
        InternationalHelpBeta: 0.25 * betaPerMeasurementStrength,
        InternationalHelpDelta: 0.25 * deltaPerMeasurementStrength,

        InformationCampaign: 0,
        InformationCampaignPrice: 6,
        InformationCampaignBeta: 0.15 * betaPerMeasurementStrength,
    },
});

/**
 * Selectors are used for accessing  certain (also modified) data from global recoil states.
 * This selector is used for counting activated measurements in Communication section.
 *
 * Selectors like this one are also in others states, mainly used for accessing data of the state.
 */
export const CommunicationMeasuresSelector = selector({
    key: 'CommunicationMeasuresSelector',
    get: ({get}) => {
        const bigState = get(CommunicationState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (measurement === "EducateCommunicate" || measurement === "GovernmentHelpsVulnerable" || measurement === "EmergencyState" ||
                measurement === "Curfew" || measurement === "TravelWarning" || measurement === "ExpertCommunication" || measurement === "CrisisManagement"
                || measurement === "SupplySecurity" || measurement === "InternationalHelp" || measurement === "InformationCampaign") {
                if (bigState[measurement] === 1) {
                    count++;
                }
            }
        });
        return count;
    },
});
