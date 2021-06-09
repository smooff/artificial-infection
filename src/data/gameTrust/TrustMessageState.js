import {atom} from "recoil";

/**
 * represents global state value for game messages from trust, messages are added to array after hitting specific game trust check breakpoint
 * default value is empty array - game starts with no trust messages
 */
export const TrustMessageState = atom({
    key: 'TrustMessageState',
    default: [],
});
