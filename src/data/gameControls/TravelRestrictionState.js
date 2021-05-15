import {atom, selector} from "recoil";
import {betaPerMeasurementStrength, deltaPerMeasurementStrength} from "../parameters/parametersCalculation";

export const TravelRestrictionState = atom({
    key: 'TravelRestrictionState',
    default: {
        NationalLockdown: 0,
        NationalLockdownPrice: 6,
        NationalLockdownBeta: 0.15 * betaPerMeasurementStrength,

        CordonSanitaire: 0,
        CordonSanitairePrice: 4,
        CordonSanitaireBeta: 0.1 * betaPerMeasurementStrength,
        CordonSanitaireDelta: 0.1 * deltaPerMeasurementStrength,

        PublicTransportRestriction: 0,
        PublicTransportRestrictionPrice: 5,
        PublicTransportRestrictionBeta: 0.25 * betaPerMeasurementStrength,

        RiskCountriesRestriction: 0,
        RiskCountriesRestrictionPrice: 5,
        RiskCountriesRestrictionBeta: 0.2 * betaPerMeasurementStrength,
    },
});

//selector pre prepocet dovery
export const TravelRestrictionMeasuresSelector = selector({
    key: 'TravelRestrictionMeasuresSelector',
    get: ({get}) => {
        const bigState = get(TravelRestrictionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (measurement === "NationalLockdown" || measurement === "CordonSanitaire" || measurement === "PublicTransportRestriction" ||
                measurement === "RiskCountriesRestriction") {
                if (bigState[measurement] === 1) {
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
            if (measurement === "NationalLockdown") {
                if (bigState[measurement] === 1) {
                    count++;
                }
            }
        });
        return count;
    },
});
