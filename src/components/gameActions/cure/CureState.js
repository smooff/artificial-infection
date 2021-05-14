import {atom, selector} from "recoil";

const beta = 0.941;
const beta2 = 0.0504;
const betaDiff = beta - beta2;
const x = Math.round((betaDiff/5.24)*10000)/10000;

const delta =0.0959;
const delta2 = 0.0099;
const deltaDiff = delta - delta2;
const y = Math.round((deltaDiff/2.78)*10000)/10000;

export const CureState = atom({
    key: 'CureState',
    default: {
        HospitalMeasuresState: true,

        WorkForce: 0,
        WorkForcePrice: 6,
        WorkForcePriceMedUnits:4,
        WorkForceDelta:0.2*y,

        PatientsCapacity: 0,
        PatientsCapacityPrice: 5,
        PatientsCapacityPriceMedUnits:4,
        PatientsCapacityDelta:0.18*y,

        FieldHospital: 0,
        FieldHospitalPrice: 5,
        FieldHospitalPriceMedUnits:4,
        FieldHospitalBeta:0.18*x,
        FieldHospitalDelta:0.18*y,

        MedicalTechnology: 0,
        MedicalTechnologyPrice: 5,
        MedicalTechnologyPriceMedUnits:4,
        MedicalTechnologyDelta:0.2*y,

        HospitalMeasures: 0,
        HospitalMeasuresPrice: 4,
        HospitalMeasuresPriceMedUnits:4,
        HospitalMeasuresBeta:0.15*x,
        HospitalMeasuresDelta:0.15*y,

        MedicalSurgery: 0,
        MedicalSurgeryPrice: 4,
        MedicalSurgeryPriceMedUnits:4,
        MedicalSurgeryBeta:0.1*x,
        MedicalSurgeryDelta:0.1*y,
    },
});

//selector pre prepocet dovery
export const CureMeasuresSelector = selector({
    key: 'CureMeasuresSelector',
    get: ({get}) => {
        const bigState = get(CureState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
           if(measurement==="WorkForce" || measurement==="PatientsCapacity" || measurement==="FieldHospital" ||
               measurement==="MedicalTechnology" || measurement==="HospitalMeasures" || measurement==="MedicalSurgery"){
               if(bigState[measurement]===1){
                   count++;
               }
           }
        });

        return count;
    },
});
