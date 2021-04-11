import {atom} from "recoil";


export const InfectionPreventionState = atom({
    key: 'InfectionPreventionState',
    default: {

        EnvironmentDisinfection:0,
        EnvironmentDisinfectionPrice:1,

        PPE:0,
        PPEPrice:2,

        InfectiousIsolation:0,
        InfectiousIsolationPrice:2,

        Quarantine:0,
        QuarantinePrice:2,

        QuarantineFacilities:0,
        QuarantineFacilitiesPrice:2,

        ArmyHelp:0,
        ArmyHelpPrice:2,

        SpecialEstablishments:0,
        SpecialEstablishmentsPrice:2,

        SpecialPopulation:0,
        SpecialPopulationPrice:2,

        SocialDistancing:0,
        SocialDistancingPrice:2,

        MassGathering:0,
        MassGatheringPrice:2,

        SmallGathering:0,
        SmallGatheringPrice:2,

        EducationalInstitutions:0,
        EducationalInstitutionsPrice:2,

        SafetyProtocols:0,
        SafetyProtocolsPrice:2,
    },
});