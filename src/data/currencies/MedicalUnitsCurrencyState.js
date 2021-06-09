import {atom} from "recoil";

/**
 * Represents global state value for secondary game currency (medical units).
 * Default value is 0 - game starts with 0 secondary game currency.
 */
export const MedicalUnitsCurrencyState = atom({
    key: 'MedicalUnitsCurrencyState',
    default: 0,
});
