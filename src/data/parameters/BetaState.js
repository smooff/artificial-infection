import {atom} from "recoil";

/**
 * represents global state value for Beta parameter, which is used for infection spread calculation
 * default value is 0.941 - game starts with beta parameter set to 0.941
 * lowest possible value is 0.0513 - this value can be this low after activating all game measurements connected with beta parameter
 */
export const BetaState = atom({
    key: 'BetaState',
    default:
        0.941,
        //0.0513
});
