import {atom, selector} from "recoil";


export const InfectionPreventionState = atom({
    key: 'InfectionPreventionState',
    default: {
        quarantineState:true,
        socialDistancingState:true,

        EnvironmentDisinfection:0,
        EnvironmentDisinfectionPrice:4,
        EnvironmentDisinfectionBeta:0.0017,

        PPE:0,
        PPEPrice:6,
        PPEBeta:0.0255,

        InfectiousIsolation:0,
        InfectiousIsolationPrice:4,
        InfectiousIsolationBeta:0.0034,

        Quarantine:0,
        QuarantinePrice:5,
        QuarantineBeta:0.051,

        QuarantineFacilities:0,
        QuarantineFacilitiesPrice:3,
        QuarantineFacilitiesBeta:0.0085,

        ArmyHelp:0,
        ArmyHelpPrice:5,
        ArmyHelpBeta:0.0289,
        ArmyHelpDelta:0.007344,

        SpecialEstablishments:0,
        SpecialEstablishmentsPrice:4,
        SpecialEstablishmentsBeta:0.0357,
        SpecialEstablishmentsDelta:0.009072,

        SpecialPopulation:0,
        SpecialPopulationPrice:6,
        SpecialPopulationBeta:0.0374,
        SpecialPopulationDelta:0.009504,

        SocialDistancing:0,
        SocialDistancingPrice:3,

        MassGathering:0,
        MassGatheringPrice:6,
        MassGatheringBeta:0.0595,

        SmallGathering:0,
        SmallGatheringPrice:6,
        SmallGatheringBeta:0.0646,

        EducationalInstitutions:0,
        EducationalInstitutionsPrice:6,
        EducationalInstitutionsBeta:0.0425,

        SafetyProtocols:0,
        SafetyProtocolsPrice:4,
        SafetyProtocolsBeta:0.0017,

        Surveillance:0,
        SurveillancePrice:3,
        SurveillanceBeta:-0.017,
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
