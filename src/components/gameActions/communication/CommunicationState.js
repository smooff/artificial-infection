import {atom, selector} from "recoil";


export const CommunicationState = atom({
    key: 'CommunicationState',
    default: {
        EmergencyStateActive:true,
        EducateCommunicateActive:true,

        EducateCommunicate:0,
        EducateCommunicatePrice:1,
        EducateCommunicateBeta:0.051,
        EducateCommunicateDelta:0.01296,

        GovernmentHelpsVulnerable:0,
        GovernmentHelpsVulnerablePrice:1,
        GovernmentHelpsVulnerableBeta:0.0357,
        GovernmentHelpsVulnerableDelta:0.009072,

        EmergencyState:0,
        EmergencyStatePrice:1,
        EmergencyStateBeta:0.0255,

        Curfew:0,
        CurfewPrice:1,
        CurfewBeta:0.0255,

        TravelWarning:0,
        TravelWarningPrice:1,
        TravelWarningBeta:0.0255,

        ExpertCommunication:0,
        ExpertCommunicationPrice:1,
        ExpertCommunicationBeta:0.0187,
        ExpertCommunicationDelta:0.004752,

        CrisisManagement:0,
        CrisisManagementPrice:1,
        CrisisManagementBeta:0.034,
        CrisisManagementDelta:0.00864,

        SupplySecurity:0,
        SupplySecurityPrice:1,
        SupplySecurityBeta:0.0255,
        SupplySecurityDelta:0.00648,

        InternationalHelp:0,
        InternationalHelpPrice:1,
        InternationalHelpBeta:0.0425,
        InternationalHelpDelta:0.00432,
        
        InformationCampaign:0,
        InformationCampaignPrice:1,
        InformationCampaignBeta:0.0255,
    },
});

//selector pre prepocet dovery
export const CommunicationMeasuresSelector = selector({
    key: 'CommunicationMeasuresSelector',
    get: ({get}) => {
        const bigState = get(CommunicationState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if(measurement==="EducateCommunicate" || measurement==="GovernmentHelpsVulnerable" || measurement==="EmergencyState" ||
                measurement==="Curfew" || measurement==="TravelWarning" || measurement==="ExpertCommunication" || measurement==="CrisisManagement"
                || measurement==="SupplySecurity" || measurement==="InternationalHelp" || measurement==="InformationCampaign"){
                if(bigState[measurement]===1){
                    count++;
                }
            }
        });

        return count;
    },
});
