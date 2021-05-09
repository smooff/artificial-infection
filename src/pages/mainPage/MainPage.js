import React, {useCallback, useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MapContainer from "../../components/mapContainer/MapContainer";

import {Button, Dialog, DialogTitle} from "@material-ui/core";

import {useRecoilState} from "recoil";
import {
    deceasedSelector,
    infectiousCountriesCountSelector,
    infectiousSelector,
    recoveredSelector,
    separateCountryByInfectivitySelector,
    susceptiblesSelector
} from "../../components/mapContainer/MapContainerState";
import BottomInfoBar from "../../components/bottomInfoBar/BottomInfoBar";
import DateRightBar from "../../components/dateRightBar/DateRightBar";
import {Apps, Contacts, FastForward, Pause, PlayArrow, Public} from "@material-ui/icons";

import TravelRestriction from "../../components/gameActions/travelRestriction/TravelRestriction";
import CountriesListRightBar from "../../components/countriesListRightBar/countriesListRightBar";
import {GameTimeState} from "../../data/GameTimeState";
import {GameFlowState} from "../../data/GameFlowState";
import {GameIntervalState} from "../../data/GameIntervalState";
import TracingTesting from "../../components/gameActions/tracingTesting/TracingTesting";
import InfectionPrevention from "../../components/gameActions/infectionPrevention/InfectionPrevention";
import Cure from "../../components/gameActions/cure/Cure";
import Communication from "../../components/gameActions/communication/Communication";
import Vaccine from "../../components/gameActions/vaccine/Vaccine";
import GraphContainer from "../../components/graphContainer/GraphContainer";
import MessageModal from "../../components/messageModal/MessageModal";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {mapColorDataState} from "../../data/MapColorDataState";
import GameTrust from "../../components/gameTrust/GameTrust";
import {GameTrustState} from "../../components/gameTrust/GameTrustState";
import {TrustMessageState} from "../../data/TrustMessageState";
import GameCurrencyRightBar from "../../components/gameCurrencyRightBar/GameCurrencyRightBar";
import MessageWrapper from "../../components/messageModal/MessageWrapper";
import {MessageModalState} from "../../data/MessageModalState";
import PagesNavigationModal from "../../components/pagesNavigation/PagesNavigationModal";
import {GameOverState} from "../../data/GameOverState";
import GameOverModal from "../../components/gameOverModal/GameOverModal";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {},
    downInfoBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
    },
    bottom: {
        width: '100%',
        position: 'fixed',
        bottom: 15,
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    gameSpeedButtons: {
        margin: '2px',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        // flexGrow: 1,
        backgroundColor: 'lightgrey',
        position: 'absolute',
        width: '100% !important',
        height: '100% !important',
        // padding: theme.spacing(3),
    },
}));


function MainPage() {


    const classes = useStyles();

    //herny cas a interakcie s nim
    const [, setgameFlow] = useRecoilState(GameFlowState);
    const [, setIntervalSpeed] = useRecoilState(GameIntervalState);

    const [pauseColor, setPauseColor] = useState("default");
    const [unpauseColor, setUnpauseColor] = useState("primary");
    const [forwardColor, setForwardColor] = useState("default");

    const [pauseOutline, setPauseOutline] = useState("outlined");
    const [unpauseOutline, setUnpauseOutline] = useState("contained");
    const [forwardOutline, setForwardOutline] = useState("outlined");

    const gamePause = useCallback(() => {
        setgameFlow(false);

        setPauseColor("primary");
        setUnpauseColor("default");
        setForwardColor("default");

        setPauseOutline("contained");
        setUnpauseOutline("outlined");
        setForwardOutline("outlined");
    },[setgameFlow])

    const gameUnpause = () => {
        setgameFlow(true);

        setPauseColor("default");
        setUnpauseColor("primary");
        setForwardColor("default");

        setPauseOutline("outlined");
        setUnpauseOutline("contained");
        setForwardOutline("outlined");

        setIntervalSpeed(2500);
    }

    const gameForward = () => {
        setgameFlow(true);

        setPauseColor("default");
        setUnpauseColor("default");
        setForwardColor("primary");

        setPauseOutline("outlined");
        setUnpauseOutline("outlined");
        setForwardOutline("contained");

        setIntervalSpeed(1000);
    }

    //zoznam krajin
    const [openCountriesList, setOpenCountriesList] = React.useState(false);
    const handleClickOpenCountriesList = () => {
        gamePause();
        setOpenCountriesList(true);
    };
    const handleClickCloseCountriesList = () => {
        gameUnpause();
        setOpenCountriesList(false);
    };

    //opatrenia modal 1
    const [openTravelRestriction, setOpenTravelRestriction] = React.useState(false);
    const handleClickOpenTravelRestriction = () => {
        setOpenTravelRestriction(true);
    };
    const handleCloseTravelRestriction = () => {
        setOpenTravelRestriction(false);
    };

    //opatrenia modal2
    const [openTracingTesting, setOpenTracingTesting] = React.useState(false);
    const handleClickOpenTracingTesting = () => {
        setOpenTracingTesting(true);
    };
    const handleCloseTracingTesting = () => {
        setOpenTracingTesting(false);
    };

    //opatrenia modal3
    const [openInfectionPrevention, setOpenInfectionPrevention] = React.useState(false);
    const handleClickOpenInfectionPrevention = () => {
        setOpenInfectionPrevention(true);
    };
    const handleCloseInfectionPrevention = () => {
        setOpenInfectionPrevention(false);
    };

    //opatrenia modal4
    const [openCure, setOpenCure] = React.useState(false);
    const handleClickOpenCure = () => {
        setOpenCure(true);
    };
    const handleCloseCure = () => {
        setOpenCure(false);
    };

    //opatrenia modal5
    const [openCommunication, setOpenCommunication] = React.useState(false);
    const handleClickOpenCommunication = () => {
        setOpenCommunication(true);
    };
    const handleCloseCommunication = () => {
        setOpenCommunication(false);
    };

    //opatrenia modal6
    const [openVaccine, setOpenVaccine] = React.useState(false);
    const handleClickOpenVaccine = () => {
        setOpenVaccine(true);
    };
    const handleCloseVaccine = () => {
        setOpenVaccine(false);
    };

    //modal7 - graf
    const [openGraph, setOpenGraph] = React.useState(false);
    const handleClickOpenGraph = () => {
        setOpenGraph(true);
    };
    const handleCloseGraph = () => {
        setOpenGraph(false);
    };


    // modal8 - herna dovera
    const [openTrust, setOpenTrust] = React.useState(false);
    const handleClickOpenTrust = () => {
        setOpenTrust(true);
    };
    const handleCloseTrust = () => {
        setOpenTrust(false);
    };

    //modal9 - spravy
    const [openMessages, setOpenMessages] = React.useState(false);
    const handleClickOpenMessages = () => {
        setOpenMessages(true);
    };
    const handleCloseMessages = () => {
        setOpenMessages(false);
    };

    //modal10 - navigovanie na welcome page
    const [openPageNavigation, setOpenPageNavigation] = React.useState(false);
    const handleClickOpenPageNavigation = () => {
        setOpenPageNavigation(true);
    };
    const handleClickClosePageNavigation = () => {
        setOpenPageNavigation(false);
    };

    //game over check
    const [gameOver, ] = useRecoilState(GameOverState);
    const [openGameOver, setOpenGameOver] = React.useState(false);

    useEffect(() => {
        return () => {
            setOpenGameOver(true);
            gamePause();
        };
    }, [gameOver, gamePause]);


    //react-tooltip
    const [, setContent] = useState("");

    //mapa data - farba
    const [mapColor, setmapColor] = useRecoilState(mapColorDataState);
    const handleMapColor = (event, newColor) => {
        setmapColor(newColor);
    };




    return (
        <div className={classes.root}>
            <CssBaseline/>
            {/*<AppBar position="fixed" className={classes.appBar}>*/}
            {/*    <Toolbar>*/}
            {/*        <Grid container xs={12}>*/}
            {/*            <Grid item xs={3}>*/}
            {/*            <Typography variant="h6" noWrap>*/}
            {/*                Main Page*/}
            {/*            </Typography>*/}
            {/*            </Grid>*/}
            {/*            <Grid xs={9}>*/}
            {/*                <Typography variant="h6" noWrap>*/}
            {/*                    <NewsBar msg="ahoj"/>*/}
            {/*                </Typography>*/}
            {/*            </Grid>*/}
            {/*        </Grid>*/}
            {/*    </Toolbar>*/}
            {/*</AppBar>*/}
            <main className={classes.content}>
                {/*<div className={classes.toolbar}/>*/}
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"

                    // spacing={2}
                >
                    <Grid item xs={12}
                        // style={{maxHeight: '15rem'}}
                          className={classes.appBar}
                    >
                        <MapContainer setTooltipContent={setContent}/>
                    </Grid>
                    {/*<BottomNavigation*/}
                    {/*    value={value}*/}
                    {/*    onChange={(event, newValue) => {*/}
                    {/*        setValue(newValue);*/}
                    {/*    }}*/}
                    {/*    showLabels*/}
                    {/*    className={classes.appBar}*/}
                    {/*>*/}
                    {/*            <BottomInfoBar name="Susceptibles" type="Susceptibles" count="SusceptiblesCount"/>*/}
                    {/*            <BottomInfoBar name="Infectious" type="Infectious" count="InfectiousCount"/>*/}
                    {/*            <BottomInfoBar name="Recovered" type="Recovered" count="RecoveredCount"/>*/}
                    {/*            <BottomInfoBar name="Deceased" type="Deceased" count="DeceasedCount"/>*/}
                    {/*</BottomNavigation>*/}
                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={1}
                          className={classes.downInfoBar}>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Náchylní" dataSelector={susceptiblesSelector}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Infekční" dataSelector={infectiousSelector}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Zotavení" dataSelector={recoveredSelector}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Zosnulí" dataSelector={deceasedSelector}/>
                        </Grid>
                    </Grid>
                    {/*<MapContainer/>*/}

                    {/*<ReactTooltip>{content}</ReactTooltip>*/}

                    {/*<DataContainer/>*/}

                </Grid>
                {/*<Grid container className={classes.downInfoBar} xs={12} justify="center"*/}
                {/*      alignItems="center">*/}

                {/*    <BottomInfoBar name="Susceptibles" type="Susceptibles" count="SusceptiblesCount"/>*/}
                {/*    <BottomInfoBar name="Infectious" type="Infectious" count="InfectiousCount"/>*/}
                {/*    <BottomInfoBar name="Recovered" type="Recovered" count="RecoveredCount"/>*/}
                {/*    <BottomInfoBar name="Deceased" type="Deceased" count="DeceasedCount"/>*/}

                {/*</Grid>*/}
            </main>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="right"
            >

                <ToggleButtonGroup
                    value={mapColor}
                    exclusive
                    onChange={handleMapColor}
                    aria-label="text alignment"
                    style={{display: 'flex'}}
                >
                    <ToggleButton value="infectious" aria-label="left aligned" style={{flex: 1}}>
                        Infekční
                    </ToggleButton>
                    <ToggleButton value="deceased" aria-label="centered" style={{flex: 1}}>
                        Zosnulí
                    </ToggleButton>
                </ToggleButtonGroup>

                <Divider/>
                <List>
                    <ListItem button>
                        <ListItemText>
                            <DateRightBar dateState={GameTimeState}/>
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <Button onClick={gamePause} color={pauseColor} variant={pauseOutline}
                                className={classes.gameSpeedButtons}>
                            <Pause/>
                        </Button>
                        <Button onClick={gameUnpause} color={unpauseColor} variant={unpauseOutline}
                                className={classes.gameSpeedButtons}>
                            <PlayArrow/>
                        </Button>
                        <Button onClick={gameForward} color={forwardColor} variant={forwardOutline}
                                className={classes.gameSpeedButtons}>
                            <FastForward/>
                        </Button>
                    </ListItem>

                    <Divider/>

                    <ListItem button>
                        <ListItemText onClick={handleClickOpenTrust}>
                            <GameTrust trustState={GameTrustState}/>
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>
                            <GameCurrencyRightBar/>
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button onClick={handleClickOpenTravelRestriction}>
                        <Public/>
                        <ListItemText primary="Obmedzenia cestovania"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenTracingTesting}>
                        <Contacts/>
                        <ListItemText primary="Trasovanie kontaktov a testovanie"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenInfectionPrevention}>
                        <Apps/>
                        <ListItemText primary="Prevencia nakazenia"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenCure}>
                        <Apps/>
                        <ListItemText primary="Liečba"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenCommunication}>
                        <Apps/>
                        <ListItemText primary="Komunikácia a spolupráca"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenVaccine}>
                        <Apps/>
                        <ListItemText primary="Vakcína"/>
                    </ListItem>
                </List>

                <Divider/>

                <List>
                    <ListItem button onClick={handleClickOpenCountriesList}>
                        <Apps/>
                        <ListItemText primary="Prehľad všetkých krajín"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenGraph}>
                        <Apps/>
                        <ListItemText primary="Globálny graf"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenMessages}>
                        <Apps/>
                        <MessageWrapper/>
                    </ListItem>
                </List>

                <Divider/>

                <List>
                    <ListItem button onClick={handleClickOpenPageNavigation}>
                        <Apps/>
                        <ListItemText primary="Návrat na úvodnú stránku"/>
                    </ListItem>
                </List>
            </Drawer>

            <Dialog fullWidth={true} maxWidth={"lg"} onClose={handleClickCloseCountriesList}
                    aria-labelledby="customized-dialog-title"
                    open={openCountriesList}>
                <DialogTitle id="customized-dialog-title" onClose={handleClickCloseCountriesList}>
                    Zoznam krajín
                </DialogTitle>
                <CountriesListRightBar dataSelector={separateCountryByInfectivitySelector}
                                       dataSelectorCount={infectiousCountriesCountSelector}/>
            </Dialog>

            <Dialog onClose={handleCloseTravelRestriction} aria-labelledby="customized-dialog-title"
                    open={openTravelRestriction}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseTravelRestriction}>
                    Obmedzenia cestovania
                </DialogTitle>
                <TravelRestriction/>
            </Dialog>

            <Dialog onClose={handleCloseTracingTesting} aria-labelledby="customized-dialog-title"
                    open={openTracingTesting}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseTracingTesting}>
                    Trasovanie kontaktov a testovanie
                </DialogTitle>
                <TracingTesting/>
            </Dialog>

            <Dialog onClose={handleCloseInfectionPrevention} aria-labelledby="customized-dialog-title"
                    open={openInfectionPrevention}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseInfectionPrevention}>
                    Prevencia nakazenia
                </DialogTitle>
                <InfectionPrevention/>
            </Dialog>

            <Dialog onClose={handleCloseCure} aria-labelledby="customized-dialog-title"
                    open={openCure}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseCure}>
                    Liečba
                </DialogTitle>
                <Cure/>
            </Dialog>

            <Dialog onClose={handleCloseCommunication} aria-labelledby="customized-dialog-title"
                    open={openCommunication}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseCommunication}>
                    Komunikácia a spolupráca
                </DialogTitle>
                <Communication/>
            </Dialog>

            <Dialog onClose={handleCloseVaccine} aria-labelledby="customized-dialog-title"
                    open={openVaccine}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseVaccine}>
                    Vakcína
                </DialogTitle>
                <Vaccine/>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={"md"} onClose={handleCloseGraph}
                    aria-labelledby="customized-dialog-title"
                    open={openGraph}>
                <GraphContainer/>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={"sm"} scroll={"paper"} onClose={handleCloseTrust}
                    aria-labelledby="customized-dialog-title"
                    open={openTrust}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseTrust}>
                    Dôvera
                </DialogTitle>
                <MessageModal dataSelector={TrustMessageState}/>
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

            <Dialog  fullWidth={true} maxWidth={"xs"} scroll={"paper"} open={openGameOver}>
              <GameOverModal data={gameOver}/>
            </Dialog>
        </div>
    );
}

export default MainPage;
