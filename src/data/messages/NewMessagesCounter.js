import {atom} from "recoil";

//pocitadlo nezobrazenuch sprav
/**
 * Represents global state value for unread messages counter.
 * Default value is 0 - game starts with no new messages, so counter is also 0.
 */
export const NewMessagesCounter = atom({
    key: 'NewMessagesCounter',
    default: 0,
});
