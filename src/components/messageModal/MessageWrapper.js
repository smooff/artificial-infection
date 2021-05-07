import React from 'react';
import {Badge, Dialog, DialogTitle} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import {useRecoilValue} from "recoil";
import {NewMessagesCounter} from "../../data/NewMessagesCounter";
import MessageModal from "./MessageModal";
import {MessageModalState} from "../../data/MessageModalState";

function MessageWrapper() {

    const [openMessages, setOpenMessages] = React.useState(false);
    const handleClickOpenMessages = () => {
        setOpenMessages(true);
    };
    const handleCloseMessages = () => {
        setOpenMessages(false);
    };
    const messageCounter = useRecoilValue(NewMessagesCounter);
    return (
        <>
        <Badge invisible={messageCounter === 0} badgeContent={messageCounter}
               color="error">
            <ListItemText primary="Správy" onClick={handleClickOpenMessages}/>
        </Badge>

    <Dialog fullWidth={true} maxWidth={"sm"} scroll={"paper"} onClose={handleCloseMessages}
            aria-labelledby="customized-dialog-title"
            open={openMessages}>
        <DialogTitle id="customized-dialog-title" onClose={handleCloseMessages}>
            Správy
        </DialogTitle>
        <MessageModal dataSelector={MessageModalState}/>
    </Dialog>
        </>
    );
}

export default MessageWrapper;
