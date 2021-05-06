import {atom, selector} from "recoil";


export const RegionTravelRestrictionState = atom({
    key: 'RegionTravelRestrictionState',
    default: {
        Europe: {
            bordersPrice: 5,
            airportsPrice: 4,
            seaportsPrice: 3,
            borders: 0,
            airports: 0,
            seaports: 0,
        },
        Asia: {
            bordersPrice: 5,
            airportsPrice: 4,
            seaportsPrice: 3,
            borders: 0,
            airports: 0,
            seaports: 0,
        },
        Africa: {
            bordersPrice: 5,
            airportsPrice: 4,
            seaportsPrice: 3,
            borders: 0,
            airports: 0,
            seaports: 0,
        },
        Americas: {
            bordersPrice: 5,
            airportsPrice: 4,
            seaportsPrice: 3,
            borders: 0,
            airports: 0,
            seaports: 0,
        },
        Oceania: {
            bordersPrice: 5,
            airportsPrice: 4,
            seaportsPrice: 3,
            borders: 0,
            airports: 0,
            seaports: 0,
        }
    },
});

//selector pre prepocet dovery
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

//selector pre prepocet dovery
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

//selector pre prepocet dovery
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
