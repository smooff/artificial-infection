import React from 'react';
import {Badge} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import {useRecoilValue} from "recoil";
import {NewMessagesCounter} from "../../data/messages/NewMessagesCounter";

function MessageWrapper() {

    const messageCounter = useRecoilValue(NewMessagesCounter);
    return (
        <>
            <Badge invisible={messageCounter === 0} badgeContent={messageCounter}
                   color="error">
                <ListItemText primary="Správy"/>
            </Badge>
        </>
    );
}

export default MessageWrapper;
