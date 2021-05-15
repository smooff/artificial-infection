import {atom, selector} from "recoil";
import {betaPerMeasurementStrength, deltaPerMeasurementStrength} from "../parameters/parametersCalculation";

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

//selector pre prepocet dovery
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
