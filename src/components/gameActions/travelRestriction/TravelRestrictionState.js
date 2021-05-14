import {atom, selector} from "recoil";

const beta = 0.941;
const beta2 = 0.0504;
const betaDiff = beta - beta2;
const x = Math.round((betaDiff/5.24)*10000)/10000;

const delta =0.0959;
const delta2 = 0.0099;
const deltaDiff = delta - delta2;
const y = Math.round((deltaDiff/2.78)*10000)/10000;

export const TravelRestrictionState = atom({
    key: 'TravelRestrictionState',
    default: {
        NationalLockdown: 0,
        NationalLockdownPrice:6,
        NationalLockdownBeta:0.15*x,

        CordonSanitaire:0,
        CordonSanitairePrice:4,
        CordonSanitaireBeta:0.1*x,
        CordonSanitaireDelta:0.1*y,

        PublicTransportRestriction:0,
        PublicTransportRestrictionPrice:5,
        PublicTransportRestrictionBeta:0.25*x,

        RiskCountriesRestriction:0,
        RiskCountriesRestrictionPrice:5,
        RiskCountriesRestrictionBeta:0.2*x,
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
