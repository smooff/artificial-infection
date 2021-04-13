import {atom} from "recoil";


export const TravelRestrictionState = atom({
    key: 'TravelRestrictionState',
    default: {
        NationalLockdown: 0,
        NationalLockdownPrice:5,
        CordonSanitaire:0,
        CordonSanitairePrice:4,
        PublicTransportRestriction:0,
        PublicTransportRestrictionPrice:3,
        RiskCountriesRestriction:0,
        RiskCountriesRestrictionPrice:2,
    },
});