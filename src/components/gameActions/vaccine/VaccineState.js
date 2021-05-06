import {atom, selector} from "recoil";


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

        //jedno z dvoch poslednych opatreni v strome opatreni (aktivovatelne az po aktivacii vsetkych ostatnych)
        FinanceVaccineDevelopment:0,
        FinanceVaccineDevelopmentPrice:1,

        //druhe z dvoch poslednych opatreni v strome opatreni (aktivovatelne az po aktivacii vsetkych ostatnych)
        InternationalCooperation:0,
        InternationalCooperationPrice:1,

        recalculateTimeForPlayer:0,
        recalculatedTime:0,
    },
});

//selector pre prepocet dovery
export const VaccineMeasuresSelector = selector({
    key: 'VaccineMeasuresSelector',
    get: ({get}) => {
        const bigState = get(VaccineState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if(measurement==="ActivationVaccineDevelopment" || measurement==="step1" || measurement==="step2" ||
                measurement==="step3" || measurement==="FinanceVaccineDevelopment" || measurement==="InternationalCooperation"){
                if(bigState[measurement]===1){
                    count++;
                }
            }
        });

        return count;
    },
});
