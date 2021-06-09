import {atom} from "recoil";

/**
 * represents global state value for Gamma parameter, which is used for new recovered calculation
 * default value is 0 - game starts with gamma parameter set to 0
 * this parameter is set to 0.49 after vaccine development is finished
 */
export const GammaState = atom({
    key: 'GammaState',
    default:
        0
        //0.49
});
