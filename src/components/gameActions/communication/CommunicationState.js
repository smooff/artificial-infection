import {atom, selector} from "recoil";

const beta = 0.941;
const beta2 = 0.0504;
const betaDiff = beta - beta2;
const x = Math.round((betaDiff/5.24)*10000)/10000;

const delta =0.0959;
const delta2 = 0.0099;
const deltaDiff = delta - delta2;
const y = Math.round((deltaDiff/2.78)*10000)/10000;

export const CommunicationState = atom({
    key: 'CommunicationState',
    default: {
        EmergencyStateActive:true,
        EducateCommunicateActive:true,

        EducateCommunicate:0,
        EducateCommunicatePrice:6,
        EducateCommunicateBeta:0.3*x,
        EducateCommunicateDelta:0.3*y,

        GovernmentHelpsVulnerable:0,
        GovernmentHelpsVulnerablePrice:6,
        GovernmentHelpsVulnerableBeta:0.21*x,
        GovernmentHelpsVulnerableDelta:0.21*y,

        EmergencyState:0,
        EmergencyStatePrice:5,
        EmergencyStateBeta:0.15*x,

        Curfew:0,
        CurfewPrice:6,
        CurfewBeta:0.15*x,

        TravelWarning:0,
        TravelWarningPrice:5,
        TravelWarningBeta:0.15*x,

        ExpertCommunication:0,
        ExpertCommunicationPrice:5,
        ExpertCommunicationBeta:0.11*x,
        ExpertCommunicationDelta:0.11*y,

        CrisisManagement:0,
        CrisisManagementPrice:5,
        CrisisManagementBeta:0.2*x,
        CrisisManagementDelta:0.2*y,

        SupplySecurity:0,
        SupplySecurityPrice:4,
        SupplySecurityBeta:0.15*x,
        SupplySecurityDelta:0.15*y,

        InternationalHelp:0,
        InternationalHelpPrice:4,
        InternationalHelpBeta:0.25*x,
        InternationalHelpDelta:0.25*y,
        
        InformationCampaign:0,
        InformationCampaignPrice:6,
        InformationCampaignBeta:0.15*x,
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
