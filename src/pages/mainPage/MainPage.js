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
    Button,
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


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    downInfoBar: {
        marginLeft: '-15%'
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
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: 'lightgrey',
        position: 'absolute',
        width: '100% !important',
        height: '100% !important',
        padding: theme.spacing(3),
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

    //react-tooltip
    const [content, setContent] = useState("");


    //
    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);


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
        console.log('round do R: ', Math.round(gamma * I));
        console.log('bez do R: ', (gamma * I));

        // console.log('ceil do R: ', Math.ceil(gamma * I));
        console.log('ROZDIEL MEDZI I A INF', I - infekcny);

        let infekcnyVacsiNezPopulaciaCheck = 0;
        let povodnyInfekcny = 0;
        if (infekcny > N) {
            console.log('INFEKCNY JE VASCI', N - Math.round(gamma * I) - Math.round(delta * I));
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

            if(gamma===delta){
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

    const deceasedCalculate = (I, D, delta, gamma, I2, infekcnyPush, infekcnyVacsiNezPopulaciaCheckValue, N,beta ,S) => {
        //rovnake osetrenie ako vo funkcii vyssie
        if (I2 < 0) {
            let splittedI2 = I2 / (gamma + delta);
            let deceasedReduction = Math.round(delta * splittedI2);
            let zosnulyZmena = D  - deceasedReduction;

            if(gamma===delta){
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
        console.log('data:', data);
        console.log('sus: ', new Intl.NumberFormat('de-DE').format(data.Susceptible));
        console.log('inf: ', new Intl.NumberFormat('de-DE').format(data.Infectious));
        console.log('rec: ', new Intl.NumberFormat('de-DE').format(data.Recovered));
        console.log('dec: ', new Intl.NumberFormat('de-DE').format(data.Deceased));
        console.log('NovaPopulacia: ', new Intl.NumberFormat('de-DE').format(data.Susceptible + data.Infectious + data.Recovered + data.Deceased),
            '\n rozdiel populacie: ', new Intl.NumberFormat('de-DE').format(data.Population - (data.Susceptible + data.Infectious + data.Recovered + data.Deceased)));
        // const beta = data.beta;
        // const gamma = data.gamma;
        // const delta = data.delta;
        // const S = data.Susceptible;
        // const I = data.Infectious;
        // const R = data.Recovered;
        // const D = data.Deceased;
        // const N = data.;
        // let povodnyNachylny = 0;

        const [susceptibleValue] = susceptibleCalculate(S, I, N, beta);
        const [actualInfectiousNumber, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking] = infectiousCalculate(S, I, N, beta, gamma, delta);
        console.log(actualInfectiousNumber, negativeNumberInfectious);
        const infectiousValue = actualInfectiousNumber;
        const recoveredValue = recoveredCalculate(I, R, gamma, delta, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, N,beta,S);
        const deceasedValue = deceasedCalculate(I, D, delta, gamma, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, N,beta,S);
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

        let countries = {};

        Object.keys(allCountries).forEach(currentCountry => {

            if (allCountries[currentCountry].infectivity === 1) {
                if (allCountries[currentCountry].Infectious > 50000) {

                }
                // setFirstInfectedCountry(...firstInfectedCountry, currentCountry);
                // console.log(allCountries[currentCountry].Infectious, currentCountry);
                countries[currentCountry] = compartmentsRecalculateValues(currentCountry);
            } else {
                if(Math.random()<0.005){
                    const dataInfectivity = allCountries[currentCountry];
                    setAllCountries((prevAllCountriesState) => ({
                        ...prevAllCountriesState, ...{
                            [currentCountry]: {
                                ...dataInfectivity,
                                infectivity:1,
                                Susceptible: dataInfectivity.Susceptible-4,
                                Infectious: 4,
                                beta:0.940961,
                                gamma:0.0622677,
                                delta:0.01559
                            }
                        }
                    }));
                    console.log("SKOCIL SOM A INFIKOVAL SOM NOVU KRAJINU");
                    console.log(currentCountry);
                }
            }
        })

        setAllCountries((prevAllCountriesState) => {
            // console.log(prevAllCountriesState);
            return {
                ...prevAllCountriesState, ...countries
            }
        });

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

    }, 500);


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                {/*<Toolbar>*/}
                {/*    <Typography variant="h6" noWrap>*/}
                {/*        Main Page*/}
                {/*    </Typography>*/}
                {/*</Toolbar>*/}
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    {/*<MapContainer/>*/}
                    <MapContainer setTooltipContent={setContent}/>
                    <ReactTooltip>{content}</ReactTooltip>

                    <DataContainer/>

                    <Grid className={classes.downInfoBar} item xs={12}>
                        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                            <BottomNavigationAction label="Susceptible" value="susceptible" icon={<FolderIcon/>}/>
                            <BottomNavigationAction label="Infected" value="infected" icon={<FolderIcon/>}/>
                            <BottomNavigationAction label="Recovered" value="recovered" icon={<FolderIcon/>}/>
                            <BottomNavigationAction label="Deceased" value="deceased" icon={<FolderIcon/>}/>
                        </BottomNavigation>
                    </Grid>
                </Grid>
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
                    {['Date', 'Game Speed', 'Trust Level', 'Game Money'].map((text, index) => (
                        <ListItem button key={text}>
                            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {[1, 2, 3, 4, 5, 6].map((text, index) => (
                        <ListItem button key={text}>
                            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                            <ListItemText primary={text} onClick={handleClickOpen}/>
                        </ListItem>
                    ))}
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

        </div>


    );
}

export default MainPage;