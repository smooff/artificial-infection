import {atom, selector} from "recoil";
import {betaPerMeasurementStrength, deltaPerMeasurementStrength} from "../parameters/parametersCalculation";

export const CureState = atom({
    key: 'CureState',
    default: {
        HospitalMeasuresState: true,

        WorkForce: 0,
        WorkForcePrice: 6,
        WorkForcePriceMedUnits: 4,
        WorkForceDelta: 0.2 * deltaPerMeasurementStrength,

        PatientsCapacity: 0,
        PatientsCapacityPrice: 5,
        PatientsCapacityPriceMedUnits: 4,
        PatientsCapacityDelta: 0.18 * deltaPerMeasurementStrength,

        FieldHospital: 0,
        FieldHospitalPrice: 5,
        FieldHospitalPriceMedUnits: 4,
        FieldHospitalBeta: 0.18 * betaPerMeasurementStrength,
        FieldHospitalDelta: 0.18 * deltaPerMeasurementStrength,

        MedicalTechnology: 0,
        MedicalTechnologyPrice: 5,
        MedicalTechnologyPriceMedUnits: 4,
        MedicalTechnologyDelta: 0.2 * deltaPerMeasurementStrength,

        HospitalMeasures: 0,
        HospitalMeasuresPrice: 4,
        HospitalMeasuresPriceMedUnits: 4,
        HospitalMeasuresBeta: 0.15 * betaPerMeasurementStrength,
        HospitalMeasuresDelta: 0.15 * deltaPerMeasurementStrength,

        MedicalSurgery: 0,
        MedicalSurgeryPrice: 4,
        MedicalSurgeryPriceMedUnits: 4,
        MedicalSurgeryBeta: 0.1 * betaPerMeasurementStrength,
        MedicalSurgeryDelta: 0.1 * deltaPerMeasurementStrength,
    },
});

//selector pre prepocet dovery
export const CureMeasuresSelector = selector({
    key: 'CureMeasuresSelector',
    get: ({get}) => {
        const bigState = get(CureState);
        let count = 0;
        Object.keys(bigState).forEach(measurement => {
            if (measurement === "WorkForce" || measurement === "PatientsCapacity" || measurement === "FieldHospital" ||
                measurement === "MedicalTechnology" || measurement === "HospitalMeasures" || measurement === "MedicalSurgery") {
                if (bigState[measurement] === 1) {
                    count++;
                }
            }
        });
        return count;
    },
});
