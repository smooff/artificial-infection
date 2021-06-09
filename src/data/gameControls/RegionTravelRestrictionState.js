import {atom, selector} from "recoil";

/**
 * represents global state value for Region travel measurements
 * these measurements are used for decreasing spread across new countries (infecting new countries)
 * default value is object, that contains objects with key, which determines region affected
 * inside these multiple objects are prices like  bordersPrice: 6, and variables which determines if the specific measurement is activated, like borders: 0,
 */
export const RegionTravelRestrictionState = atom({
    key: 'RegionTravelRestrictionState',
    default: {
        Europe: {
            bordersPrice: 6,
            airportsPrice: 5,
            seaportsPrice: 4,
            borders: 0,
            airports: 0,
            seaports: 0,
        },
        Asia: {
            bordersPrice: 6,
            airportsPrice: 5,
            seaportsPrice: 4,
            borders: 0,
            airports: 0,
            seaports: 0,
        },
        Africa: {
            bordersPrice: 6,
            airportsPrice: 5,
            seaportsPrice: 4,
            borders: 0,
            airports: 0,
            seaports: 0,
        },
        Americas: {
            bordersPrice: 6,
            airportsPrice: 5,
            seaportsPrice: 4,
            borders: 0,
            airports: 0,
            seaports: 0,
        },
        Oceania: {
            bordersPrice: 6,
            airportsPrice: 5,
            seaportsPrice: 4,
            borders: 0,
            airports: 0,
            seaports: 0,
        }
    },
});

//selector which returns number of closed borders/airports/seaports
//used for trust breakpoint checks
export const RegionTravelRestrictionMeasuresSelector = selector({
    key: 'RegionTravelRestrictionMeasuresSelector',
    get: ({get}) => {
        const bigState = get(RegionTravelRestrictionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (bigState[measurement].borders === 1) {
                count++;
            }
            if (bigState[measurement].airports === 1) {
                count++;
            }
            if (bigState[measurement].seaports === 1) {
                count++;
            }
        });
        return count;
    },
});

//same as above
export const RegionBordersSelector = selector({
    key: 'RegionBordersSelector',
    get: ({get}) => {
        const bigState = get(RegionTravelRestrictionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (bigState[measurement].borders === 1) {
                count++;
            }
        });
        return count;
    },
});

export const RegionAirportsSelector = selector({
    key: 'RegionAirportsSelector',
    get: ({get}) => {
        const bigState = get(RegionTravelRestrictionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (bigState[measurement].airports === 1) {
                count++;
            }
        });
        return count;
    },
});

export const RegionSeaportsSelector = selector({
    key: 'RegionSeaportsSelector',
    get: ({get}) => {
        const bigState = get(RegionTravelRestrictionState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (bigState[measurement].seaports === 1) {
                count++;
            }
        });
        return count;
    },
});
