import {atom} from "recoil";

// sluzi na ulozenie stavu farebneho vyzobraznia dat pre mapu
/**
 * represents global state value for map color, which determines what color scale will be in the map
 * default value is infectious - game starts with maps showing the infectious compartment, second option is deceased compartment
 */
export const mapColorDataState = atom({
    key: 'mapColorDataState',
    default: 'infectious',
});
