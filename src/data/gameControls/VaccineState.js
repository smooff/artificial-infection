import {atom, selector} from "recoil";

export const VaccineState = atom({
    key: 'VaccineState',
    default: {
        //value, which determines if the vaccine time has been initialized
        InitializeVaccineTime: false,

        //value, which determines if the vaccine development has been finished
        vaccineDevelopmentFinished: false,

        //value, which stores actual game time of vaccine development
        //increase after activating ActivationVaccineDevelopment
        actualDevelopmentTime: 0,

        //measurements creating specific tree of measurm.
        step1: 0,
        step2: 0,
        step3: 0,

        //value of game time for finishing certain vaccine development step
        //sum of these three - total vaccine development time
        step1Time: 0,
        step2Time: 0,
        step3Time: 0,

        //price
        step1Price: 6,
        step2Price: 6,
        step3Price: 6,

        //price medical units (secondary game currency)
        step1PriceMedUnits: 6,
        step2PriceMedUnits: 6,
        step3PriceMedUnits: 6,

        //value, which determines if next measurements in tree can be accessed (activated)
        DevelopmentProcessTree: true,
        Step1Tree: true,
        Step2Tree: true,
        Step3Tree: true,

        //first measurement in tree - activates the development
        ActivationVaccineDevelopment: 0,
        VaccineDevelopmentPrice: 5,
        VaccineDevelopmentPriceMedUnits: 5,

        //one of two last measurements in measur. tree - activable only after all above are already activated
        FinanceVaccineDevelopment: 0,
        FinanceVaccineDevelopmentPrice: 6,
        FinanceVaccineDevelopmentPriceMedUnits: 7,
        FinanceVaccineDevelopmentTree: true,

        //one of two last measurements in measur. tree - activable only after all above are already activated
        InternationalCooperation: 0,
        InternationalCooperationPrice: 6,
        InternationalCooperationPriceMedUnits: 7,
        InternationalCooperationTree: true,

        //infinite measurement
        SuperDevelopmentPriceMedUnits: 12,

        recalculateTimeForPlayer: 0,
        recalculatedTime: 0,
    },
});

//selector which returns number of active measurements  in VaccineState.js
//used for trust breakpoint checks
export const VaccineMeasuresSelector = selector({
    key: 'VaccineMeasuresSelector',
    get: ({get}) => {
        const bigState = get(VaccineState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (measurement === "ActivationVaccineDevelopment" || measurement === "step1" || measurement === "step2" ||
                measurement === "step3" || measurement === "FinanceVaccineDevelopment" || measurement === "InternationalCooperation") {
                if (bigState[measurement] === 1) {
                    count++;
                }
            }
        });
        return count;
    },
});
