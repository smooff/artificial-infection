import {atom} from "recoil";


export const CureState = atom({
    key: 'CureState',
    default: {
        HospitalMeasuresState: true,

        WorkForce: 0,
        WorkForcePrice: 1,

        PatientsCapacity: 0,
        PatientsCapacityPrice: 1,

        FieldHospital: 0,
        FieldHospitalPrice: 1,

        MedicalTechnology: 0,
        MedicalTechnologyPrice: 1,

        HospitalMeasures: 0,
        HospitalMeasuresPrice: 1,

        MedicalSurgery: 0,
        MedicalSurgeryPrice: 1,
    },
});