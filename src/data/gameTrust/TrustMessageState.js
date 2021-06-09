import {atom} from "recoil";

/**
 * Represents global state value for game messages from trust, messages are added to array after hitting specific game trust check breakpoint.
 * Default value is empty array - game starts with no trust messages.
 */
export const TrustMessageState = atom({
    key: 'TrustMessageState',
    default: [],
});
