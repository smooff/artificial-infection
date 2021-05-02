import {atom} from "recoil";


export const TravelRestrictionState = atom({
    key: 'TravelRestrictionState',
    default: {
        NationalLockdown: 0,
        NationalLockdownPrice:5,
        NationalLockdownBeta:0.0255,

        CordonSanitaire:0,
        CordonSanitairePrice:4,
        CordonSanitaireBeta:0.017,
        CordonSanitaireDelta:0.00432,

        PublicTransportRestriction:0,
        PublicTransportRestrictionPrice:3,
        PublicTransportRestrictionBeta:0.0425,

        RiskCountriesRestriction:0,
        RiskCountriesRestrictionPrice:2,
        RiskCountriesRestrictionBeta:0.034,
    },
});
