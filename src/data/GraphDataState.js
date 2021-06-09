import {atom} from "recoil";

/**
 * Represents global state value for graph data.
 * Default value is empty array - data will be added after first infected country.
 * After filling the array, data contains global values for infectious, susceptible, recovered, death and certain game time for these values.
 */
export const GraphDataState = atom({
    key: 'GraphDataState',
    default: [],
});
