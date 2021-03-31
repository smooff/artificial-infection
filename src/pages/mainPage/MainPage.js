import React, {useEffect, useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapContainer from "../../components/mapContainer/MapContainer";

import {
    BottomNavigation,
    BottomNavigationAction,
    Button, Card, CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';


import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ReactTooltip from "react-tooltip";
import DataContainer from "../../components/dataContainer/DataContainer";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    deceasedSelector,
    infectiousSelector,
    mapContainerState,
    recoveredSelector, susceptiblesSelector
} from "../../components/mapContainer/MapContainerState";
import BottomInfoBar from "../../components/bottomInfoBar/BottomInfoBar";
import DateRightBar from "../../components/dateRightBar/DateRightBar";
import {Apps, Contacts, FastForward, Pause, PlayArrow, Public} from "@material-ui/icons";
import NewsBar from "../../components/newsBar/NewsBar";
import HromadneOblastneOpatrenia
    from "../../components/gameActions/hromadneOblastneOpatrenia/HromadneOblastneOpatrenia";
import {GameCurrencyState} from "../../data/GameCurrencyState.js";
import ZoznamOpatreni from "../../components/gameActions/ZoznamOpatreni";
import {GameTimeState} from "../../data/GameTimeState";
import {GameFlowState} from "../../data/GameFlowState";
import {GameIntervalState} from "../../data/GameIntervalState";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {},
    downInfoBar: {
        marginLeft: '-15%',
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


function MainPage(props) {



    const classes = useStyles();

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


//modal
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    //zoznam opatreni
    const [openZoznamOpatreni, setOpenZoznamOpatreni] = React.useState(false);

    const handleClickOpenZoznamOpatreni = () => {
        setOpenZoznamOpatreni(true);
    };
    const handleClickCloseZoznamOpatreni = () => {
        setOpenZoznamOpatreni(false);
    };

    //opatrenia modal 1
    const [openOblastneOpatrenia, setOpenOblastneOpatrenia] = React.useState(false);

    const handleClickOpenOblastneOpatrenia = () => {
        setOpenOblastneOpatrenia(true);
    };
    const handleCloseOblastneOpatrenia = () => {
        setOpenOblastneOpatrenia(false);
    };

    //react-tooltip
    const [content, setContent] = useState("");

    //game currency
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);


    const [gameFlow, setgameFlow] = useRecoilState(GameFlowState);

    const [intervalSpeed, setIntervalSpeed] = useRecoilState(GameIntervalState);

    const [pauseColor, setPauseColor] = useState("default");
    const [unpauseColor, setUnpauseColor] = useState("primary");
    const [forwardColor, setForwardColor] = useState("default");

    const [pauseOutline, setPauseOutline] = useState("outlined");
    const [unpauseOutline, setUnpauseOutline] = useState("contained");
    const [forwardOutline, setForwardOutline] = useState("outlined");

    const gamePause = () => {
        setgameFlow(false);

        setPauseColor("primary");
        setUnpauseColor("default");
        setForwardColor("default");

        setPauseOutline("contained");
        setUnpauseOutline("outlined");
        setForwardOutline("outlined");
    }

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







    //nahodny vyber prvej infikovanej krajiny
    // const [firstInfectedCountry, ] = useState(() => {
    //     const countryCodes = Object.keys(allCountries);
    //     const firstCountryIndex = Math.floor(Math.random() * countryCodes.length);
    //     return [countryCodes[firstCountryIndex]]
    // });




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
                    <Grid container xs={12} direction="row" justify="space-around" alignItems="center" spacing="2"
                          className={classes.appBar}>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Susceptibles" dataSelector={susceptiblesSelector}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Infectious" dataSelector={infectiousSelector}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Recovered" dataSelector={recoveredSelector}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Deceased" dataSelector={deceasedSelector}/>
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
                <div className={classes.toolbar}/>
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
                    <ListItem button>
                        <ListItemText>
                            herna dovera
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <ListItemText>
                            Herná mena: {gameCurrency}
                        </ListItemText>
                    </ListItem>
                </List>
                <Divider/>
                <ListItem button>
                    <ListItemText primary="Prehľad všetkých opatrení" onClick={handleClickOpenZoznamOpatreni}/>
                </ListItem>
                <Divider/>
                <List>
                    <ListItem button>
                        <Public/>
                        <ListItemText primary="Hromadné oblastné opatrenia" onClick={handleClickOpenOblastneOpatrenia}/>
                    </ListItem>
                    <ListItem button>
                        <Contacts/>
                        <ListItemText primary="Trasovanie kontaktov a testovanie" onClick={handleClickOpen}/>
                    </ListItem>
                    <ListItem button>
                        <Apps/>
                        <ListItemText primary="Prevencia" onClick={handleClickOpen}/>
                    </ListItem>
                    <ListItem button>
                        <Apps/>
                        <ListItemText primary="Liečba" onClick={handleClickOpen}/>
                    </ListItem>
                    <ListItem button>
                        <Apps/>
                        <ListItemText primary="Vakcína" onClick={handleClickOpen}/>
                    </ListItem>
                </List>
            </Drawer>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                        lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog onClose={handleClickCloseZoznamOpatreni} aria-labelledby="customized-dialog-title"
                    open={openZoznamOpatreni}>
                <DialogTitle id="customized-dialog-title" onClose={handleClickCloseZoznamOpatreni}>
                    Zoznam opatrení
                </DialogTitle>
                <ZoznamOpatreni/>
            </Dialog>

            <Dialog onClose={handleCloseOblastneOpatrenia} aria-labelledby="customized-dialog-title"
                    open={openOblastneOpatrenia}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseOblastneOpatrenia}>
                    Hromadné oblastné opatrenia
                </DialogTitle>
                <HromadneOblastneOpatrenia/>
            </Dialog>

        </div>


    );
}

export default MainPage;