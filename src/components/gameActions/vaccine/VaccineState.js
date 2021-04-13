import {atom} from "recoil";


export const VaccineState = atom({
    key: 'VaccineState',
    default: {
        DevelopmentProcess:true,

        DevelopVaccine:0,
        DevelopVaccinePrice:1,

        FinanceVaccineDevelopment:0,
        FinanceVaccineDevelopmentPrice:1,

        InternationalCooperation:0,
        InternationalCooperationPrice:1,
    },
});