import {atom} from "recoil";


export const TravelRestrictionState = atom({
    key: 'TravelRestrictionState',
    default: {
        NationalLockdown: 0,
        NationalLockdownPrice:5,
        NationalLockdownBeta:0.02325,

        CordonSanitaire:0,
        CordonSanitairePrice:4,
        CordonSanitaireBeta:0.0155,

        PublicTransportRestriction:0,
        PublicTransportRestrictionPrice:3,
        PublicTransportRestrictionBeta:0.03875,

        RiskCountriesRestriction:0,
        RiskCountriesRestrictionPrice:2,
        RiskCountriesRestrictionBeta:0.031,
    },
});