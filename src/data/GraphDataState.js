import {atom} from "recoil";

//sluzi na ukladanie dat pre graf (sus,inf,rec,dec)
export const GraphDataState = atom({
    key: 'GraphDataState',
    default:[],
});
