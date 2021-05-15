import {atom} from "recoil";

// sluzi na ulozenie stavu farebneho vyzobraznia dat pre mapu
export const mapColorDataState = atom({
    key: 'mapColorDataState',
    default: 'infectious',
});
