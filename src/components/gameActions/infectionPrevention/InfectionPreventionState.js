import {atom, selector} from "recoil";


const beta = 0.941;
const beta2 = 0.0504;
const betaDiff = beta - beta2;
const x = Math.round((betaDiff/5.24)*10000)/10000;

const delta =0.0959;
const delta2 = 0.0099;
const deltaDiff = delta - delta2;
const y = Math.round((deltaDiff/2.78)*10000)/10000;


export const InfectionPreventionState = atom({
    key: 'InfectionPreventionState',
    default: {
        quarantineState:true,
        socialDistancingState:true,

        EnvironmentDisinfection:0,
        EnvironmentDisinfectionPrice:4,
        EnvironmentDisinfectionBeta:0.01*x,

        PPE:0,
        PPEPrice:6,
        PPEBeta:0.15*x,

        InfectiousIsolation:0,
        InfectiousIsolationPrice:4,
        InfectiousIsolationBeta:0.02*x,

        Quarantine:0,
        QuarantinePrice:5,
        QuarantineBeta:0.3*x,

        QuarantineFacilities:0,
        QuarantineFacilitiesPrice:3,
        QuarantineFacilitiesBeta:0.05*x,

        ArmyHelp:0,
        ArmyHelpPrice:5,
        ArmyHelpBeta:0.17*x,
        ArmyHelpDelta:0.17*y,

        SpecialEstablishments:0,
        SpecialEstablishmentsPrice:4,
        SpecialEstablishmentsBeta:0.21*x,
        SpecialEstablishmentsDelta:0.21*y,

        SpecialPopulation:0,
        SpecialPopulationPrice:6,
        SpecialPopulationBeta:0.22*x,
        SpecialPopulationDelta:0.22*y,

        SocialDistancing:0,
        SocialDistancingPrice:3,

        MassGathering:0,
        MassGatheringPrice:6,
        MassGatheringBeta:0.35*x,

        SmallGathering:0,
        SmallGatheringPrice:6,
        SmallGatheringBeta:0.38*x,

        EducationalInstitutions:0,
        EducationalInstitutionsPrice:6,
        EducationalInstitutionsBeta:0.25*x,

        SafetyProtocols:0,
        SafetyProtocolsPrice:4,
        SafetyProtocolsBeta:0.01*x,

        Surveillance:0,
        SurveillancePrice:3,
        SurveillanceBeta:-0.1*x,
    },
});

//selector pre prepocet dovery
export const InfectionPreventionMeasuresSelector = selector({
    key: 'InfectionPreventionMeasuresSelector',
    get: ({get}) => {
        const bigState = get(InfectionPreventionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if(measurement==="EnvironmentDisinfection" || measurement==="PPE" || measurement==="InfectiousIsolation" ||
                measurement==="Quarantine" || measurement==="QuarantineFacilities" || measurement==="ArmyHelp" || measurement==="SpecialEstablishments"
                || measurement==="SpecialPopulation" || measurement==="SocialDistancing" || measurement==="MassGathering" || measurement==="SmallGathering"
                || measurement==="EducationalInstitutions" || measurement==="SafetyProtocols" || measurement==="Surveillance"){
                if(bigState[measurement]===1){
                    count++;
                }
            }
        });

        return count;
    },
});
