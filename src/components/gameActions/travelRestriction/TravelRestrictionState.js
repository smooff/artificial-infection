import {atom, selector} from "recoil";


export const TravelRestrictionState = atom({
    key: 'TravelRestrictionState',
    default: {
        NationalLockdown: 0,
        NationalLockdownPrice:6,
        NationalLockdownBeta:0.0255,

        CordonSanitaire:0,
        CordonSanitairePrice:4,
        CordonSanitaireBeta:0.017,
        CordonSanitaireDelta:0.00432,

        PublicTransportRestriction:0,
        PublicTransportRestrictionPrice:5,
        PublicTransportRestrictionBeta:0.0425,

        RiskCountriesRestriction:0,
        RiskCountriesRestrictionPrice:5,
        RiskCountriesRestrictionBeta:0.034,
    },
});

//selector pre prepocet dovery
export const TravelRestrictionMeasuresSelector = selector({
    key: 'TravelRestrictionMeasuresSelector',
    get: ({get}) => {
        const bigState = get(TravelRestrictionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if(measurement==="NationalLockdown" || measurement==="CordonSanitaire" || measurement==="PublicTransportRestriction" ||
                measurement==="RiskCountriesRestriction"){
                if(bigState[measurement]===1){
                    count++;
                }
            }
        });

        return count;
    },
});

//selector pre prepocet dovery
export const TravelRestrictionLockDownSelector = selector({
    key: 'TravelRestrictionLockDownSelector',
    get: ({get}) => {
        const bigState = get(TravelRestrictionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if(measurement==="NationalLockdown"){
                if(bigState[measurement]===1){
                    count++;
                }
            }
        });

        return count;
    },
});
