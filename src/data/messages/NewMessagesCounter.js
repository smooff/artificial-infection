import {atom} from "recoil";

//pocitadlo nezobrazenuch sprav
export const NewMessagesCounter = atom({
    key: 'NewMessagesCounter',
    default: 0,
});
