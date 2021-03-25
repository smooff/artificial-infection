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
import {useRecoilState} from "recoil";
import {mapContainerState} from "../../components/mapContainer/MapContainerState";
import BottomInfoBar from "../../components/bottomInfoBar/BottomInfoBar";
import DateRightBar from "../../components/dateRightBar/DateRightBar";
import {Apps, Contacts, FastForward, Pause, PlayArrow, Public} from "@material-ui/icons";
import NewsBar from "../../components/newsBar/NewsBar";
import {bottomInfoBarState} from "../../components/bottomInfoBar/BottomInfoBarState";
import HromadneOblastneOpatrenia
    from "../../components/gameActions/hromadneOblastneOpatrenia/HromadneOblastneOpatrenia";
import {GameCurrencyState} from "../../data/GameCurrencyState.js";
import {HromadneOblastneOpatreniaState} from "../../components/gameActions/hromadneOblastneOpatrenia/HromadneOblastneOpatreniaState";
import ZoznamOpatreni from "../../components/gameActions/ZoznamOpatreni";


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
    gameSpeedButtons:{
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
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

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

    //
    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);

    // state na udrzanie kompartmentovych stavov celej populacie - statitika na spodnej strane main page
    const [allStats, setAllStats] = useRecoilState(bottomInfoBarState);

    //HERNY CAS------------
    //herny cas v jednotke den
    const [days, setDays] = useState(0);

    const [gameFlow, setgameFlow] = useState(true);

    const [pauseColor, setPauseColor] = useState("default");
    const [unpauseColor, setUnpauseColor] = useState("primary");
    const [forwardColor, setForwardColor] = useState("default");

    const [pauseOutline, setPauseOutline] = useState("outlined");
    const [unpauseOutline, setUnpauseOutline] = useState("contained");
    const [forwardOutline, setForwardOutline] = useState("outlined");

    const [intervalSpeed, setIntervalSpeed] = useState(2500);

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
//---------------------------

    const susceptibleCalculate = (S, I, N, beta) => {
        // let nachylny = Math.round(S - (beta * S * I) / N);
        let nachylny = (S - Math.ceil((beta * S * I) / N));
        // console.log('nach',nachylny);


        if (nachylny < 0) {
            nachylny = 0;
        }

        return [nachylny];
    }

    const infectiousCalculate = (S, I, N, beta, gamma, delta) => {
        let infekcny = (I + Math.ceil((beta * S * I) / N)) - Math.round(gamma * I) - Math.round(delta * I);
        // console.log('inf', data.Infectious);
        // console.log('round do R: ', Math.round(gamma * I));
        // console.log('bez do R: ', (gamma * I));

        // console.log('ceil do R: ', Math.ceil(gamma * I));
        // console.log('ROZDIEL MEDZI I A INF', I - infekcny);

        let infekcnyVacsiNezPopulaciaCheck = 0;
        let povodnyInfekcny = 0;
        if (infekcny > N) {
            // console.log('INFEKCNY JE VASCI', N - Math.round(gamma * I) - Math.round(delta * I));
            infekcny = N - Math.round(gamma * N) - Math.round(delta * N);
            infekcnyVacsiNezPopulaciaCheck = 1;
        } else if (infekcny < 0) {
            povodnyInfekcny = infekcny;
            infekcny = 0;
        }

        const infekcnyPushToRD = I - infekcny;
        if ((I - infekcny) === 0) {
            if ((Math.round(gamma * I) + Math.round(delta * I)) === 0) {
                infekcny = (I + Math.ceil((beta * S * I) / N) - Math.ceil(gamma * I) - Math.ceil(delta * I));

                if (infekcny < 0) {
                    povodnyInfekcny = infekcny;
                    infekcny = 0;
                }
                //ak nastane ze sa nemeni pocet infikovanych, a infikovany stahuju nachylnych(kvoli ceil z S do I) aj napriek tomu ze maju byt sami stiahnuty
            }
            // else if((Math.ceil((beta * S * I) / N))===(Math.round(gamma * I) + Math.round(delta * I))){
            //     if(((beta * S * I) / N)<((gamma * I) + (delta * I))){
            //         infekcny=(I - Math.ceil(gamma * I) - Math.ceil(delta * I));
            //         if (infekcny < 0) {
            //             povodnyInfekcny = infekcny;
            //             infekcny = 0;
            //         }
            //     }
            // }

        }

        return [infekcny, povodnyInfekcny, infekcnyPushToRD, infekcnyVacsiNezPopulaciaCheck];
    }

    const recoveredCalculate = (I, R, gamma, delta, I2, infekcnyPush, infekcnyVacsiNezPopulaciaCheckValue, N, beta, S) => {
        //if funkcny v pripade presunu z kompartmentu I do R,
        //kde I sa dostava do zapornej hodnoty a je potrebne to vykompenzovat v R (aj v D) upravenym-znizenym pripocitanim
        if (I2 < 0) {
            let splittedI2 = I2 / (gamma + delta);
            let recoveredReduction = Math.round(gamma * splittedI2);
            let zotavenyZmena = R - recoveredReduction;

            if (gamma === delta) {
                return R;
            }

            return zotavenyZmena;
        }

        if (infekcnyVacsiNezPopulaciaCheckValue === 1) {
            let zotaveny = Math.round(gamma * N);
            return zotaveny;
        }

        if (infekcnyPush === 0) {
            if ((Math.round(gamma * I) + Math.round(delta * I)) === 0) {
                if (I === 1) {
                    if (gamma > delta) {
                        let zotaveny = Math.ceil(R + gamma * I);
                        return zotaveny;
                    } else if (delta > gamma) {
                        return R;
                    }
                }
                let zotaveny = Math.ceil(R + gamma * I);
                return zotaveny;
            }
            // else if((Math.ceil((beta * S * I) / N))===(Math.round(gamma * I) + Math.round(delta * I))){
            //     if(((beta * S * I) / N)<((gamma * I) + (delta * I))){
            //         if (I === 1) {
            //             if (gamma > delta) {
            //                 let zotaveny = Math.ceil(R + gamma * I);
            //                 return zotaveny;
            //             } else if (delta > gamma) {
            //                 return R;
            //             }
            //         }
            //        let zotaveny = Math.ceil(R + gamma * I);
            //         return zotaveny;
            //     }
            // }
        }

        let zotaveny = Math.round(R + gamma * I);

        return zotaveny;
    }

    const deceasedCalculate = (I, D, delta, gamma, I2, infekcnyPush, infekcnyVacsiNezPopulaciaCheckValue, N, beta, S) => {
        //rovnake osetrenie ako vo funkcii vyssie
        if (I2 < 0) {
            let splittedI2 = I2 / (gamma + delta);
            let deceasedReduction = Math.round(delta * splittedI2);
            let zosnulyZmena = D - deceasedReduction;

            if (gamma === delta) {
            }
            return zosnulyZmena;
        }

        if (infekcnyVacsiNezPopulaciaCheckValue === 1) {
            let zosnuly = Math.round(delta * N);
            return zosnuly;
        }

        if (infekcnyPush === 0) {
            if ((Math.round(gamma * I) + Math.round(delta * I)) === 0) {
                if (I === 1) {
                    if (delta > gamma) {
                        let zosnuly = Math.ceil(D + delta * I);
                        return zosnuly;
                    } else if (gamma > delta) {
                        return D;
                    }
                }
                let zosnuly = Math.ceil(D + delta * I);
                return zosnuly;
            }
            // else if((Math.ceil((beta * S * I) / N))===(Math.round(gamma * I) + Math.round(delta * I))){
            //     if(((beta * S * I) / N)<((gamma * I) + (delta * I))){
            //         if (I === 1) {
            //             if (delta > gamma) {
            //                 let zosnuly = Math.ceil(D + delta * I);
            //                 return zosnuly;
            //             } else if (gamma > delta) {
            //                 return D;
            //             }
            //         }
            //         let zosnuly = Math.ceil(D + delta * I);
            //         return zosnuly;
            //     }
            // }
        }

        let zosnuly = Math.round(D + delta * I);

        return zosnuly;
    }

    const compartmentsRecalculateValues = (countryName) => {
        const data = allCountries[countryName];
        const {beta, gamma, delta, Susceptible: S, Infectious: I, Recovered: R, Deceased: D, Population: N} = data;
        // console.log('data:', data);
        // console.log('sus: ', new Intl.NumberFormat('de-DE').format(data.Susceptible));
        //console.log('inf: ', new Intl.NumberFormat('de-DE').format(data.Infectious));
        // console.log('rec: ', new Intl.NumberFormat('de-DE').format(data.Recovered));
        // console.log('dec: ', new Intl.NumberFormat('de-DE').format(data.Deceased));
        // console.log('NovaPopulacia: ', new Intl.NumberFormat('de-DE').format(data.Susceptible + data.Infectious + data.Recovered + data.Deceased),
        //     '\n rozdiel populacie: ', new Intl.NumberFormat('de-DE').format(data.Population - (data.Susceptible + data.Infectious + data.Recovered + data.Deceased)));

        const [susceptibleValue] = susceptibleCalculate(S, I, N, beta);
        const [actualInfectiousNumber, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking] = infectiousCalculate(S, I, N, beta, gamma, delta);
        // console.log(actualInfectiousNumber, negativeNumberInfectious);
        const infectiousValue = actualInfectiousNumber;
        const recoveredValue = recoveredCalculate(I, R, gamma, delta, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, N, beta, S);
        const deceasedValue = deceasedCalculate(I, D, delta, gamma, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, N, beta, S);
        // const infekcny = data.Infectious + +50000;

        // if (povodnyNachylny >= 0) {
        //
        // } else if (povodnyNachylny < 0) {
        //     infekcny -= povodnyNachylny;
        // }

        return {
            ...data,
            Susceptible: susceptibleValue,
            Infectious: infectiousValue,
            Recovered: recoveredValue,
            Deceased: deceasedValue
        };


        // setAllCountries((prevAllCountriesState) => ({
        //     ...prevAllCountriesState, ...{
        //         [countryName]: {
        //             ...data,
        //             Susceptible: susceptibleValue,
        //             Infectious: infectiousValue,
        //             Recovered: recoveredValue,
        //             Deceased: deceasedValue
        //         }
        //     }
        // }));

    };

    const infectingByBorders = (countryName) => {
        const data = allCountries[countryName];
        let {beta, gamma, delta, Susceptible: S, Infectious: I} = data;
        beta = 0.940961;
        gamma = 0.0622677;
        delta = 0.01559;
        S = S - 10;
        I = 10;

        return {
            ...data,
            infectivity: 1,
            Susceptible: S,
            Infectious: I,
            beta: beta,
            gamma: gamma,
            delta: delta,
        };
    }

    const infectingByRegions = (countryName) => {
        const data = allCountries[countryName];
        let {beta, gamma, delta, Susceptible: S, Infectious: I} = data;
        beta = 0.940961;
        gamma = 0.0622677;
        delta = 0.01559;
        S = S - 5;
        I = 5;

        return {
            ...data,
            infectivity: 1,
            Susceptible: S,
            Infectious: I,
            beta: beta,
            gamma: gamma,
            delta: delta,
        };
    }

    const infectingBySubRegions = (countryName) => {
        const data = allCountries[countryName];
        let {beta, gamma, delta, Susceptible: S, Infectious: I} = data;
        beta = 0.940961;
        gamma = 0.0622677;
        delta = 0.01559;
        S = S - 8;
        I = 8;

        return {
            ...data,
            infectivity: 1,
            Susceptible: S,
            Infectious: I,
            beta: beta,
            gamma: gamma,
            delta: delta,
        };
    }


    //
    const [infectiousIncrement, setInfectiousIncrement] = useState(0);

    //nahodny vyber prvej infikovanej krajiny
    // const [firstInfectedCountry, ] = useState(() => {
    //     const countryCodes = Object.keys(allCountries);
    //     const firstCountryIndex = Math.floor(Math.random() * countryCodes.length);
    //     return [countryCodes[firstCountryIndex]]
    // });

    useInterval(() => {
        // setInfectiousIncrement(infectiousIncrement + 1000000);

        if (gameFlow === true) {

            setDays(prevDays => prevDays + 1);

            let countries = {};

            let SusceptiblesCountInterval = 0;
            let InfectiousCountInterval = 0;
            let RecoveredCountInterval = 0;
            let DeceasedCountInterval = 0;

            Object.keys(allCountries).forEach(currentCountry => {

                SusceptiblesCountInterval += allCountries[currentCountry].Susceptible;
                InfectiousCountInterval += allCountries[currentCountry].Infectious;
                RecoveredCountInterval += allCountries[currentCountry].Recovered;
                DeceasedCountInterval += allCountries[currentCountry].Deceased;


                if (allCountries[currentCountry].infectivity === 1) {
                    if (allCountries[currentCountry].Infectious > 50000) {

                    }
                    // setFirstInfectedCountry(...firstInfectedCountry, currentCountry);
                    // console.log(allCountries[currentCountry].Infectious, currentCountry);


                    //INFIKOVANIE CEZ HRANICE
                    allCountries[currentCountry].border.forEach(element => {
                        if (allCountries[element].infectivity === 0) {
                            if (Math.random() < 0.005) {
                                countries[element] = infectingByBorders(element);
                            }
                        }
                    });

                    //INFIKOVANIE CEZ REGION A SUBREGION
                    for (const property in allCountries) {

                        //REGION
                        if (allCountries[property].region === allCountries[currentCountry].region) {
                            if (allCountries[property].infectivity === 0) {
                                if (Math.random() < 0.005) {
                                    countries[property] = infectingByRegions(property);
                                }
                            }
                        }
                        //SUBREGION
                        if (allCountries[property].subregion === allCountries[currentCountry].subregion) {
                            if (allCountries[property].infectivity === 0) {
                                if (Math.random() < 0.005) {
                                    countries[property] = infectingBySubRegions(property);
                                }
                            }
                        }
                    }

                    countries[currentCountry] = compartmentsRecalculateValues(currentCountry);
                } else {
                    if (Math.random() < 0.005) {
                        const dataInfectivity = allCountries[currentCountry];
                        setAllCountries((prevAllCountriesState) => ({
                            ...prevAllCountriesState, ...{
                                [currentCountry]: {
                                    ...dataInfectivity,
                                    infectivity: 1,
                                    Susceptible: dataInfectivity.Susceptible - 4,
                                    Infectious: 4,
                                    beta: 0.940961,
                                    gamma: 0.0622677,
                                    delta: 0.01559
                                }
                            }
                        }));
                        console.log("SKOCIL SOM A INFIKOVAL SOM NOVU KRAJINU");
                        console.log(currentCountry);
                    }
                }
            })

            setAllStats(
                (prevStats) => ({
                    ...{
                        SusceptiblesCount: SusceptiblesCountInterval,
                        InfectiousCount: InfectiousCountInterval,
                        RecoveredCount: RecoveredCountInterval,
                        DeceasedCount: DeceasedCountInterval
                    }
                }));

            setAllCountries((prevAllCountriesState) => {
                // console.log(prevAllCountriesState);
                return {
                    ...prevAllCountriesState, ...countries
                }
            });
        }
        // setAllCountries((prevAllCountriesState) => ({
        //     ...prevAllCountriesState, ...{
        //         [countryName]: {
        //             ...data,
        //             Susceptible: susceptibleValue,
        //             Infectious: infectiousValue,
        //             Recovered: recoveredValue,
        //             Deceased: deceasedValue
        //         }
        //     }
        // }));

        // valueChange(firstInfectedCountry);

    }, intervalSpeed);


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
                            <BottomInfoBar name="Susceptibles" type="Susceptibles" compartmentValue={allStats}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Infectious" type="Infectious" compartmentValue={allStats}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Recovered" type="Recovered" compartmentValue={allStats}/>
                        </Grid>
                        <Grid item xs={3}>
                            <BottomInfoBar name="Deceased" type="Deceased" compartmentValue={allStats}/>
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
                            <DateRightBar days={days}/>
                        </ListItemText>
                    </ListItem>
                    <ListItem button>
                        <Button onClick={gamePause} color={pauseColor} variant={pauseOutline} className={classes.gameSpeedButtons}>
                            <Pause/>
                        </Button>
                        <Button onClick={gameUnpause} color={unpauseColor} variant={unpauseOutline} className={classes.gameSpeedButtons}>
                            <PlayArrow/>
                        </Button>
                        <Button onClick={gameForward} color={forwardColor} variant={forwardOutline} className={classes.gameSpeedButtons}>
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
                    <ListItem button >
                        <Public/>
                        <ListItemText primary="Hromadné oblastné opatrenia" onClick={handleClickOpenOblastneOpatrenia}/>
                    </ListItem>
                    <ListItem button >
                        <Contacts/>
                        <ListItemText primary="Trasovanie kontaktov a testovanie" onClick={handleClickOpen}/>
                    </ListItem>
                    <ListItem button >
                        <Apps/>
                        <ListItemText primary="Prevencia" onClick={handleClickOpen}/>
                    </ListItem>
                    <ListItem button >
                        <Apps/>
                        <ListItemText primary="Liečba" onClick={handleClickOpen}/>
                    </ListItem>
                    <ListItem button >
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

            <Dialog onClose={handleClickCloseZoznamOpatreni} aria-labelledby="customized-dialog-title" open={openZoznamOpatreni}>
                <DialogTitle id="customized-dialog-title" onClose={handleClickCloseZoznamOpatreni}>
                    Zoznam opatrení
                </DialogTitle>
                <ZoznamOpatreni/>
            </Dialog>

            <Dialog onClose={handleCloseOblastneOpatrenia} aria-labelledby="customized-dialog-title" open={openOblastneOpatrenia}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseOblastneOpatrenia}>
                    Hromadné oblastné opatrenia
                </DialogTitle>
                <HromadneOblastneOpatrenia/>
            </Dialog>

        </div>


    );
}

export default MainPage;