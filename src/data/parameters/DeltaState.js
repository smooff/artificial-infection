import {atom} from "recoil";

/**
 * represents global state value for Delta parameter, which is used for new deaths calculation
 * default value is 0.0959 - game starts with delta parameter set to 0.0959
 * lowest possible value is 0.0099 - this value can be this low after activating all game measurements connected with delta parameter
 */
export const DeltaState = atom({
    key: 'DeltaState',
    default:
         0.0959,
        //0.0099
});
