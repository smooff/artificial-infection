import {atom} from "recoil";


export const CommunicationState = atom({
    key: 'CommunicationState',
    default: {
        EmergencyStateActive:true,

        EducateCommunicate:0,
        EducateCommunicatePrice:1,

        GovernmentHelpsVulnerable:0,
        GovernmentHelpsVulnerablePrice:1,

        EmergencyState:0,
        EmergencyStatePrice:1,

        Curfew:0,
        CurfewPrice:1,

        TravelWarning:0,
        TravelWarningPrice:1,

        ExpertCommunication:0,
        ExpertCommunicationPrice:1,

        CrisisManagement:0,
        CrisisManagementPrice:1,

        SupplySecurity:0,
        SupplySecurityPrice:1,

        InternationalHelp:0,
        InternationalHelpPrice:1,
    },
});