import {atom} from "recoil";


export const CommunicationState = atom({
    key: 'CommunicationState',
    default: {
        EmergencyStateActive:true,
        EducateCommunicateActive:true,

        EducateCommunicate:0,
        EducateCommunicatePrice:1,
        EducateCommunicateBeta:0.0465,

        GovernmentHelpsVulnerable:0,
        GovernmentHelpsVulnerablePrice:1,
        GovernmentHelpsVulnerableBeta:0.03255,

        EmergencyState:0,
        EmergencyStatePrice:1,
        EmergencyStateBeta:0.02325,

        Curfew:0,
        CurfewPrice:1,
        CurfewBeta:0.02325,

        TravelWarning:0,
        TravelWarningPrice:1,
        TravelWarningBeta:0.02325,

        ExpertCommunication:0,
        ExpertCommunicationPrice:1,
        ExpertCommunicationBeta:0.01705,

        CrisisManagement:0,
        CrisisManagementPrice:1,
        CrisisManagementBeta:0.031,

        SupplySecurity:0,
        SupplySecurityPrice:1,
        SupplySecurityBeta:0.02325,

        InternationalHelp:0,
        InternationalHelpPrice:1,
        InternationalHelpBeta:0.03875,
        
        InformationCampaign:0,
        InformationCampaignPrice:1,
        InformationCampaignBeta:0.02325,
    },
});