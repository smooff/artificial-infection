import {atom} from "recoil";

/**
 * represents global state value for general game messages, messages are added to array after hitting specific
 * game check like infecting new country or starting vaccine development
 * default value is empty array - game starts with no trust messages
 */
export const MessageModalState = atom({
    key: 'MessageModalState',
    default: [],
});
