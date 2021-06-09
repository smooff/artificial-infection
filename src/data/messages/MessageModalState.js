import {atom} from "recoil";

/**
 * Represents global state value for general game messages, messages are added to array after hitting specific.
 * Game check like infecting new country or starting vaccine development.
 * Default value is empty array - game starts with no trust messages.
 */
export const MessageModalState = atom({
    key: 'MessageModalState',
    default: [],
});
