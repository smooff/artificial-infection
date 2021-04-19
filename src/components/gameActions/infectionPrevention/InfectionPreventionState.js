import {atom} from "recoil";


export const InfectionPreventionState = atom({
    key: 'InfectionPreventionState',
    default: {
        quarantineState:true,
        socialDistancingState:true,

        EnvironmentDisinfection:0,
        EnvironmentDisinfectionPrice:1,
        EnvironmentDisinfectionBeta:0.00155,

        PPE:0,
        PPEPrice:2,
        PPEBeta:0.02325,

        InfectiousIsolation:0,
        InfectiousIsolationPrice:2,
        InfectiousIsolationBeta:0.0031,

        Quarantine:0,
        QuarantinePrice:2,
        QuarantineBeta:0.0465,

        QuarantineFacilities:0,
        QuarantineFacilitiesPrice:2,
        QuarantineFacilitiesBeta:0.00775,

        ArmyHelp:0,
        ArmyHelpPrice:2,
        ArmyHelpBeta:0.02635,

        SpecialEstablishments:0,
        SpecialEstablishmentsPrice:2,
        SpecialEstablishmentsBeta:0.03255,

        SpecialPopulation:0,
        SpecialPopulationPrice:2,
        SpecialPopulationBeta:0.0341,

        SocialDistancing:0,
        SocialDistancingPrice:2,

        MassGathering:0,
        MassGatheringPrice:2,
        MassGatheringBeta:0.05425,

        SmallGathering:0,
        SmallGatheringPrice:2,
        SmallGatheringBeta:0.0589,

        EducationalInstitutions:0,
        EducationalInstitutionsPrice:2,
        EducationalInstitutionsBeta:0.03875,

        SafetyProtocols:0,
        SafetyProtocolsPrice:2,
        SafetyProtocolsBeta:0.00155,

        Surveillance:0,
        SurveillancePrice:2,
        SurveillanceBeta:-0.0155,
    },
});