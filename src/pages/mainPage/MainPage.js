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

import {Button, Dialog, DialogTitle, Tooltip} from "@material-ui/core";

import {useRecoilState} from "recoil";
import {
    deceasedSelector,
    infectiousCountriesCountSelector,
    infectiousSelector,
    recoveredSelector,
    separateCountryByInfectivitySelector,
    susceptiblesSelector
} from "../../data/map/MapContainerState";
import BottomInfoBar from "../../components/bottomInfoBar/BottomInfoBar";
import DateRightBar from "../../components/dateRightBar/DateRightBar";
import {
    AirplanemodeInactive,
    DeveloperBoardTwoTone,
    EmailTwoTone,
    ExitToAppTwoTone,
    FastForward,
    ForumTwoTone,
    ListAltTwoTone,
    LocalHospitalTwoTone,
    Pause,
    PlayArrow,
    PollTwoTone,
    SecurityTwoTone
} from "@material-ui/icons";
import PermContactCalendarTwoToneIcon from '@material-ui/icons/PermContactCalendarTwoTone';
import TravelRestriction from "../../components/gameControls/TravelRestriction";
import CountriesListRightBar from "../../components/countriesListRightBar/countriesListRightBar";
import {GameTimeState} from "../../data/gameTime/GameTimeState";
import {GameFlowState} from "../../data/gameTime/GameFlowState";
import {GameIntervalState} from "../../data/gameTime/GameIntervalState";
import TracingTesting from "../../components/gameControls/TracingTesting";
import InfectionPrevention from "../../components/gameControls/InfectionPrevention";
import Cure from "../../components/gameControls/Cure";
import Communication from "../../components/gameControls/Communication";
import Vaccine from "../../components/gameControls/Vaccine";
import GraphContainer from "../../components/graphContainer/GraphContainer";
import MessageModal from "../../components/messageModal/MessageModal";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {mapColorDataState} from "../../data/map/MapColorDataState";
import GameTrust from "../../components/gameTrust/GameTrust";
import {GameTrustState} from "../../data/gameTrust/GameTrustState";
import {TrustMessageState} from "../../data/gameTrust/TrustMessageState";
import GameCurrencyRightBar from "../../components/gameCurrencyRightBar/GameCurrencyRightBar";
import MessageWrapper from "../../components/messageModal/MessageWrapper";
import {MessageModalState} from "../../data/messages/MessageModalState";
import PagesNavigationModal from "../../components/pagesNavigation/PagesNavigationModal";
import {GameOverState} from "../../data/GameOverState";
import GameOverModal from "../../components/gameOverModal/GameOverModal";
import ResponsiveDesign, {useWindowDimensions} from "../ResponsiveDesign";
import Typography from "@material-ui/core/Typography";
import {GameStartState} from "../../data/GameStartState";


function MainPage() {

    let drawerWidth = 240;

    const {height, width} = useWindowDimensions();

    const mobileDrawerBreakpoint = 820;

    if (width < mobileDrawerBreakpoint) {
        drawerWidth = 200;
    }
    const useStyles = makeStyles(() => ({
        downInfoBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,
            backgroundColor: 'lightgrey',
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
            margin: "2px"
        },
        gameSpeedButtonsMobile: {
            margin: '1px',
        },
        content: {
            backgroundColor: 'lightgrey',
            position: 'absolute',
            width: '100% !important',
            height: '100% !important',
        },
        drawerIcons: {
            marginRight: "20px"
        },
        gameSpeedButtonsWrapperMobile: {
            padding: "0px"
        },
        gameSpeedButtonsWrapper: {},
        toggleButtonGroup: {
            display: 'flex'
        },
        toggleButton: {
            flex: 1
        },
        aboutInfo: {
            marginLeft: "10px",
        }
    }));

    const classes = useStyles();

    //herny cas a interakcie s nim
    const [, setGameFlow] = useRecoilState(GameFlowState);
    const [, setIntervalSpeed] = useRecoilState(GameIntervalState);

    const [pauseColor, setPauseColor] = useState("primary");
    const [unpauseColor, setUnpauseColor] = useState("default");
    const [forwardColor, setForwardColor] = useState("default");

    const [pauseOutline, setPauseOutline] = useState("contained");
    const [unpauseOutline, setUnpauseOutline] = useState("outlined");
    const [forwardOutline, setForwardOutline] = useState("outlined");

    const gamePause = useCallback(() => {
        setGameFlow(false);

        setPauseColor("primary");
        setUnpauseColor("default");
        setForwardColor("default");

        setPauseOutline("contained");
        setUnpauseOutline("outlined");
        setForwardOutline("outlined");
    }, [setGameFlow])

    const gameUnpause = () => {
        setGameFlow(true);

        setPauseColor("default");
        setUnpauseColor("primary");
        setForwardColor("default");

        setPauseOutline("outlined");
        setUnpauseOutline("contained");
        setForwardOutline("outlined");

        setIntervalSpeed(2500);
    }

    const gameForward = () => {
        setGameFlow(true);

        setPauseColor("default");
        setUnpauseColor("default");
        setForwardColor("primary");

        setPauseOutline("outlined");
        setUnpauseOutline("outlined");
        setForwardOutline("contained");

        setIntervalSpeed(1000);
    }

    //modal zoznam krajin
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

    //game started check
    const [openGameStartModal, setOpenGameStartModal] = useRecoilState(GameStartState);
    const handleCloseGameStartModal = () => {
        setOpenGameStartModal(false);
        gameUnpause();
    };

    //game over check
    const [gameOver,] = useRecoilState(GameOverState);
    const [openGameOver, setOpenGameOver] = React.useState(false);

    useEffect(() => {
        return () => {
            setOpenGameOver(true);
            gamePause();
        };
    }, [gameOver, gamePause]);

    //mapa data - farba
    const [mapColor, setMapColor] = useRecoilState(mapColorDataState);
    const handleMapColor = (event, newColor) => {
        setMapColor(newColor);
    };


    return (
        <div>
            <CssBaseline/>
            <main className={classes.content}>
                <Grid container direction="row" justify="center" alignItems="center">

                    <Grid item xs={12} className={classes.appBar}>
                        <MapContainer/>
                    </Grid>

                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={1}
                          className={classes.downInfoBar}>
                        <Grid item xs={6} md={3}>
                            <BottomInfoBar name="Náchylní" dataSelector={susceptiblesSelector}/>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <BottomInfoBar name="Infekční" dataSelector={infectiousSelector}/>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <BottomInfoBar name="Zotavení" dataSelector={recoveredSelector}/>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <BottomInfoBar name="Zosnulí" dataSelector={deceasedSelector}/>
                        </Grid>
                    </Grid>

                </Grid>
            </main>

            <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}
                    anchor="right">

                <ToggleButtonGroup value={mapColor} exclusive onChange={handleMapColor}
                                   className={classes.toggleButtonGroup}>
                    <ToggleButton value="infectious" className={classes.toggleButton}>
                        <Tooltip title="Mapa infekčných">
                            <Typography> Infekční</Typography>
                        </Tooltip>
                    </ToggleButton>

                    <ToggleButton value="deceased" className={classes.toggleButton}>
                        <Tooltip title="Mapa zosnulých">
                            <Typography> Zosnulí</Typography>
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>

                <Divider/>

                <List>
                    <ListItem button>
                        <Tooltip title="Herný dátum">
                            <ListItemText>
                                <DateRightBar dateState={GameTimeState}/>
                            </ListItemText>
                        </Tooltip>
                    </ListItem>
                    <ListItem button
                              className={width < mobileDrawerBreakpoint ? classes.gameSpeedButtonsWrapperMobile : classes.gameSpeedButtonsWrapper}>
                        <Tooltip title="Stopnutie hry">
                            <Button onClick={gamePause} color={pauseColor} variant={pauseOutline}
                                    className={width < mobileDrawerBreakpoint ? classes.gameSpeedButtonsMobile : classes.gameSpeedButtons}>
                                <Pause/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Pokračovať v hre">
                            <Button onClick={gameUnpause} color={unpauseColor} variant={unpauseOutline}
                                    className={width < mobileDrawerBreakpoint ? classes.gameSpeedButtonsMobile : classes.gameSpeedButtons}>
                                <PlayArrow/>
                            </Button>
                        </Tooltip>
                        <Tooltip title="Zrýchliť hru">
                            <Button onClick={gameForward} color={forwardColor} variant={forwardOutline}
                                    className={width < mobileDrawerBreakpoint ? classes.gameSpeedButtonsMobile : classes.gameSpeedButtons}>
                                <FastForward/>
                            </Button>
                        </Tooltip>
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
                        <AirplanemodeInactive className={classes.drawerIcons}/>
                        <ListItemText primary="Obmedzenia cestovania"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenTracingTesting}>
                        <PermContactCalendarTwoToneIcon className={classes.drawerIcons}/>
                        <ListItemText primary="Trasovanie kontaktov a testovanie"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenInfectionPrevention}>
                        <SecurityTwoTone className={classes.drawerIcons}/>
                        <ListItemText primary="Prevencia nakazenia"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenCure}>
                        <LocalHospitalTwoTone className={classes.drawerIcons}/>
                        <ListItemText primary="Liečba"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenCommunication}>
                        <ForumTwoTone className={classes.drawerIcons}/>
                        <ListItemText primary="Komunikácia a spolupráca"/>
                    </ListItem>
                    <ListItem button onClick={handleClickOpenVaccine}>
                        <DeveloperBoardTwoTone className={classes.drawerIcons}/>
                        <ListItemText primary="Vakcína"/>
                    </ListItem>
                </List>

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
                </List>

                <Divider/>

                <List>
                    <ListItem button onClick={handleClickOpenPageNavigation}>
                        <ExitToAppTwoTone className={classes.drawerIcons}/>
                        <ListItemText primary="Návrat na úvodnú stránku"/>
                    </ListItem>
                </List>

            </Drawer>

            <Dialog fullWidth={true} maxWidth={"lg"} onClose={handleClickCloseCountriesList} open={openCountriesList}>
                <DialogTitle onClose={handleClickCloseCountriesList}>
                    Zoznam krajín
                </DialogTitle>
                <CountriesListRightBar dataHeight={height} dataSelector={separateCountryByInfectivitySelector}
                                       dataSelectorCount={infectiousCountriesCountSelector}/>
            </Dialog>

            <Dialog onClose={handleCloseTravelRestriction} open={openTravelRestriction}>
                <DialogTitle onClose={handleCloseTravelRestriction}>
                    Obmedzenia cestovania
                </DialogTitle>
                <TravelRestriction/>
            </Dialog>

            <Dialog onClose={handleCloseTracingTesting} open={openTracingTesting}>
                <DialogTitle onClose={handleCloseTracingTesting}>
                    Trasovanie kontaktov a testovanie
                </DialogTitle>
                <TracingTesting/>
            </Dialog>

            <Dialog onClose={handleCloseInfectionPrevention} open={openInfectionPrevention}>
                <DialogTitle onClose={handleCloseInfectionPrevention}>
                    Prevencia nakazenia
                </DialogTitle>
                <InfectionPrevention/>
            </Dialog>

            <Dialog onClose={handleCloseCure} open={openCure}>
                <DialogTitle onClose={handleCloseCure}>
                    Liečba
                </DialogTitle>
                <Cure/>
            </Dialog>

            <Dialog onClose={handleCloseCommunication} open={openCommunication}>
                <DialogTitle onClose={handleCloseCommunication}>
                    Komunikácia a spolupráca
                </DialogTitle>
                <Communication/>
            </Dialog>

            <Dialog onClose={handleCloseVaccine} open={openVaccine}>
                <DialogTitle onClose={handleCloseVaccine}>
                    Vakcína
                </DialogTitle>
                <Vaccine/>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={"md"} onClose={handleCloseGraph} open={openGraph}>
                <GraphContainer dataWidth={width} dataHeight={height}/>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={"sm"} scroll={"paper"} onClose={handleCloseTrust} open={openTrust}>
                <DialogTitle onClose={handleCloseTrust}>
                    Dôvera
                </DialogTitle>
                <MessageModal dataSelector={TrustMessageState}/>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={"sm"} scroll={"paper"} onClose={handleCloseMessages} open={openMessages}>
                <DialogTitle onClose={handleCloseMessages}>
                    Správy
                </DialogTitle>
                <MessageModal dataSelector={MessageModalState}/>
            </Dialog>

            <Dialog onClose={handleClickClosePageNavigation} open={openPageNavigation}>
                <PagesNavigationModal/>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={"xs"} scroll={"paper"} open={openGameOver}>
                <GameOverModal data={gameOver} dataWidth={width} dataHeight={height} pointsRecovered={recoveredSelector}
                               pointsInfected={infectiousSelector} pointsSusceptibles={susceptiblesSelector}/>
            </Dialog>

            {/*kontrola ci je (mobilne) zariadenie otocene horizontalne*/}
            <ResponsiveDesign/>

            <Dialog fullWidth={true} maxWidth={"xs"} open={openGameStartModal}>
                <Grid className={classes.aboutInfo}>
                    <Typography variant={"h6"}>
                        Cieľ:
                    </Typography>
                    <Typography>
                        Cieľom hry je vyliečiť aspoň 1-milión ľudí (Zotavení) pomocou vakcíny.
                        <br/>
                        <br/>
                    </Typography>
                    <Typography variant={"h6"}>
                        Tipy:
                    </Typography>
                    <Typography>
                        1. Hernú menu získavaš viacerými spôsobmi - napr. šanca na získanie za novo-nakazenú krajinu,
                        plynutím času...
                        <br/>
                        2. Zdravotnícke jednotky je možné zakúpiť po kliknutí na symbol hernej meny (dolár).
                        <br/>
                        3. Skóre na konci hry sa počíta z počtu zotavených ľudí.
                        <br/>
                    </Typography>
                    <br/>
                </Grid>
                <Button color={"primary"} variant={"contained"} onClick={handleCloseGameStartModal}>
                    <PlayArrow/>
                </Button>

            </Dialog>
        </div>
    );
}

export default MainPage;
