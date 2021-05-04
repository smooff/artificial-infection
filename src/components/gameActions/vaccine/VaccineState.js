import {atom} from "recoil";


export const VaccineState = atom({
    key: 'VaccineState',
    default: {
        //pre uvodne nainicializovanie casu pre tradicny vyvoj vakciny
        InitializeVaccineTime:false,

        //hodnota urcujuca ci je vakcina vyvinuta
        vaccineDevelopmentFinished:false,

        //cas vyjadrujuci o aktualnom stave vyvoja  - jeho pocitanie sa zacne po aktivacii ActivationVaccineDevelopment
        actualDevelopmentTime:0,

        //nadväzujuce opatrenia
        step1:0,
        step2:0,
        step3:0,

        //cas opatreni - sucet tychto casov je celkovy cas na vyvoj vakciny
        step1Time:0,
        step2Time:0,
        step3Time:0,

        //cena
        step1Price:1,
        step2Price:1,
        step3Price:1,

        //pre povolenie pouzitia dalsich buttonov
        DevelopmentProcessTree:true,
        Step1Tree:true,
        Step2Tree:true,
        Step3Tree:true,

        //uvodne opatrenie pre zacatie vyvoja
        ActivationVaccineDevelopment:0,
        VaccineDevelopmentPrice:1,

        //posledne 2 opatrenia v strome opatreni (aktivovatelne az po aktivacii vsetkych ostatnych)
        FinanceVaccineDevelopment:0,
        FinanceVaccineDevelopmentPrice:1,

        InternationalCooperation:0,
        InternationalCooperationPrice:1,

        recalculateTimeForPlayer:0,
        recalculatedTime:0,
    },
});
