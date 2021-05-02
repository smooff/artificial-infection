import {atom} from "recoil";


export const CureState = atom({
    key: 'CureState',
    default: {
        HospitalMeasuresState: true,

        WorkForce: 0,
        WorkForcePrice: 1,
        WorkForceDelta:0.00864,

        PatientsCapacity: 0,
        PatientsCapacityPrice: 1,
        PatientsCapacityDelta:0.007776,

        FieldHospital: 0,
        FieldHospitalPrice: 1,
        FieldHospitalBeta:0.0306,
        FieldHospitalDelta:0.007776,

        MedicalTechnology: 0,
        MedicalTechnologyPrice: 1,
        MedicalTechnologyDelta:0.00864,

        HospitalMeasures: 0,
        HospitalMeasuresPrice: 1,
        HospitalMeasuresBeta:0.0255,
        HospitalMeasuresDelta:0.00648,

        MedicalSurgery: 0,
        MedicalSurgeryPrice: 1,
        MedicalSurgeryBeta:0.017,
        MedicalSurgeryDelta:0.00432,
    },
});
