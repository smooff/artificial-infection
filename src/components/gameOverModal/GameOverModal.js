import React from 'react';
import {Card, CardContent, Dialog, DialogTitle, ListItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import GraphContainer from "../graphContainer/GraphContainer";
import ListItemText from "@material-ui/core/ListItemText";
import {EmailTwoTone, ExitToAppTwoTone, ListAltTwoTone, PollTwoTone} from "@material-ui/icons";
import CountriesListRightBar from "../countriesListRightBar/countriesListRightBar";
import {
    infectiousCountriesCountSelector,
    separateCountryByInfectivitySelector
} from "../mapContainer/MapContainerState";
import MessageModal from "../messageModal/MessageModal";
import {MessageModalState} from "../../data/MessageModalState";
import MessageWrapper from "../messageModal/MessageWrapper";
import PagesNavigationModal from "../pagesNavigation/PagesNavigationModal";


function GameOverModal({data}) {
    const useStyles = makeStyles((theme) => ({
        itemAligns: {
            textAlign: "center",
        },
        actionsButtons: {
            textAlign: "center",
            marginTop: "6px"
        },
        drawerIcons:{
            marginRight:"20px"
        }
    }));
    const classes = useStyles();

    const endType = data;

    const [openGraph, setOpenGraph] = React.useState(false);
    const handleClickOpenGraph = () => {
        setOpenGraph(true);
    };
    const handleCloseGraph = () => {
        setOpenGraph(false);
    };

    const [openCountriesList, setOpenCountriesList] = React.useState(false);
    const handleClickOpenCountriesList = () => {
        setOpenCountriesList(true);
    };
    const handleClickCloseCountriesList = () => {
        setOpenCountriesList(false);
    };

    const [openMessages, setOpenMessages] = React.useState(false);
    const handleClickOpenMessages = () => {
        setOpenMessages(true);
    };
    const handleCloseMessages = () => {
        setOpenMessages(false);
    };

    const [openPageNavigation, setOpenPageNavigation] = React.useState(false);
    const handleClickOpenPageNavigation = () => {
        setOpenPageNavigation(true);
    };
    const handleClickClosePageNavigation = () => {
        setOpenPageNavigation(false);
    };
    return (
        <div><Card>
            <CardContent>
                <Typography variant={"h6"} className={classes.itemAligns}> Koniec hry</Typography>

                <Divider/>
                <br/>

                <Typography variant={"h4"} color={"secondary"} className={classes.itemAligns}>
                    {endType.win === 1 ? "Výhra" : "Prehra"}
                </Typography>
                <Typography className={classes.itemAligns}>
                    {endType.win === 1 ? endType.winReason : endType.loseReason}
                </Typography>

                <Divider/>

                <List>
                    <ListItem button onClick={handleClickOpenCountriesList}>
                        <ListAltTwoTone className={classes.drawerIcons}/>
                        <ListItemText primary="Prehľad všetkých krajín"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenGraph}>
                        <PollTwoTone className={classes.drawerIcons}/>
                        <ListItemText primary="Globálny graf"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenMessages}>
                        <EmailTwoTone className={classes.drawerIcons}/>
                        <MessageWrapper/>
                    </ListItem>

                    <Divider/>

                    <ListItem button onClick={handleClickOpenPageNavigation} className={classes.actionsButtons}>
                        <ExitToAppTwoTone/>
                        <ListItemText primary="Návrat na úvodnú stránku"/>
                    </ListItem>
                </List>

            </CardContent>
        </Card>
            <Dialog fullWidth={true} maxWidth={"lg"} onClose={handleClickCloseCountriesList}
                    aria-labelledby="customized-dialog-title"
                    open={openCountriesList}>
                <DialogTitle id="customized-dialog-title" onClose={handleClickCloseCountriesList}>
                    Zoznam krajín
                </DialogTitle>
                <CountriesListRightBar dataSelector={separateCountryByInfectivitySelector}
                                       dataSelectorCount={infectiousCountriesCountSelector}/>
            </Dialog>
            <Dialog fullWidth={true} maxWidth={"md"} onClose={handleCloseGraph}
                    aria-labelledby="customized-dialog-title"
                    open={openGraph}>
                <GraphContainer/>
            </Dialog>
            <Dialog fullWidth={true} maxWidth={"sm"} scroll={"paper"} onClose={handleCloseMessages}
                    aria-labelledby="customized-dialog-title"
                    open={openMessages}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseMessages}>
                    Správy
                </DialogTitle>
                <MessageModal dataSelector={MessageModalState}/>
            </Dialog>

            <Dialog onClose={handleClickClosePageNavigation} open={openPageNavigation}>
                <PagesNavigationModal/>
            </Dialog>
        </div>
    );
}

export default GameOverModal;
