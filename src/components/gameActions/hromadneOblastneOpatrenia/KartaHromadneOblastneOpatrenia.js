import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, Modal, Snackbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../../data/GameCurrencyState.js";
import {HromadneOblastneOpatreniaState} from "./HromadneOblastneOpatreniaState";
import MuiAlert from '@material-ui/lab/Alert';


function KartaHromadneOblastneOpatrenia(props) {
    const useStyles = makeStyles((theme) => ({
        actionButtons: {
            textAlign: "center",
        },
        activationButtons: {
            textAlign: "center",
            marginTop: "6px"
        },
        cards: {
            margin: "4px",
            backgroundColor: "ghostwhite"
        }

    }));
    const classes = useStyles();

    //---
    //modal po aktivacii opatrenia
    //po uspesnom aktivovani
    const [openTravelRestrictionsSuccess, setOpenTravelRestrictionsSuccess] = React.useState(false);
    const handleOpenSuccess = () => {
        setOpenTravelRestrictionsSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTravelRestrictionsSuccess(false);
    };
    //po neuspesnom pokuse o aktivaciu
    const [openTravelRestrictionsFailure, setOpenTravelRestrictionsFailure] = React.useState(false);
    const handleOpenFailure = () => {
        setOpenTravelRestrictionsFailure(true);
    };
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTravelRestrictionsFailure(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [modalRegion, setModalRegion] = useState();
    const [modalMessage, setModalMessage] = useState();
    //---

    //herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //data s opatreniami
    const [measuresActualState, setMeasuresActualState] = useRecoilState(HromadneOblastneOpatreniaState);

    const [showResults1, setShowResults1] = React.useState(false);
    const [showResults2, setShowResults2] = React.useState(false);
    const [showResults3, setShowResults3] = React.useState(false);

    const [button1Color, setButton1Color] = useState("default");
    const [button2Color, setButton2Color] = useState("default");
    const [button3Color, setButton3Color] = useState("default");

    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        props.changeLinkPrice(buttonPrice);
        props.changeLinkText(textMessage);

        switch (buttonNumber) {
            case 1:
                setButton1Color("primary");
                setButton2Color("default");
                setButton3Color("default");

                setShowResults1(true);
                setShowResults2(false);
                setShowResults3(false);
                break;
            case 2:
                setButton1Color("default");
                setButton2Color("primary");
                setButton3Color("default");

                setShowResults1(false);
                setShowResults2(true);
                setShowResults3(false);
                break;
            case 3:
                setButton1Color("default");
                setButton2Color("default");
                setButton3Color("primary");

                setShowResults1(false);
                setShowResults2(false);
                setShowResults3(true);
                break;
            default:
                return null;
        }

    }

    //funckia pre navrat hodnot do resultu
    const renderSwitch = (param) =>{
        switch(param) {
            case 1:
                return  <div><Button onClick={handleActivationClickBorders}>Aktivovať</Button><Button
                    onClick={handleDeactivationClickBorders}>Deaktivovať</Button></div>
            case 2:
                return   <div><Button onClick={handleActivationClickAirports}>Aktivovať</Button><Button
                    onClick={handleDeactivationClickAirports}>Deaktivovať</Button></div>
            case 3:
                return   <div><Button onClick={handleActivationClickSeaports}>Aktivovať</Button><Button
                    onClick={handleDeactivationClickSeaports}>Deaktivovať</Button></div>
            default:
                return null;
        }
    }

    const Results = (c) => (
        <Grid className={classes.activationButtons}>
            {renderSwitch(c.cislo)}
        </Grid>
    )

    const handleActivationClickBorders = () => {

        if (measuresActualState[props.regionEN].bordersPrice <= gameCurrency) {
            if (measuresActualState[props.regionEN].borders !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], borders: 1}};
                });
                setGameCurrency(prev => (prev - measuresActualState[props.regionEN].bordersPrice));

                //alert o vykonani
                setModalRegion(props.regionName);
                setModalMessage("Aktivoval si uzavretie hraníc pre daný región.");
                handleOpenSuccess();
            }
        }else{
            handleOpenFailure();
        }
    }

    const handleDeactivationClickBorders = () => {
        if (measuresActualState[props.regionEN].borders === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], borders: 0}};
            });
            setGameCurrency(prev => (prev + measuresActualState[props.regionEN].bordersPrice));

            //alert o vykonani
            setModalRegion(props.regionName);
            setModalMessage("Deaktivoval si uzavretie hraníc pre daný región.")
            handleOpenSuccess();
        }
    }

    const handleActivationClickAirports = () => {
        if (measuresActualState[props.regionEN].airportsPrice <= gameCurrency) {
            if (measuresActualState[props.regionEN].airports !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], airports: 1}};
                });
                setGameCurrency(prev => (prev - measuresActualState[props.regionEN].airportsPrice));

                //alert o vykonani
                setModalRegion(props.regionName);
                setModalMessage("Aktivoval si uzavretie letísk pre daný región.")
                handleOpenSuccess();
            }
        }else{
            handleOpenFailure();
        }
    }

    const handleDeactivationClickAirports = () => {
        if (measuresActualState[props.regionEN].airports === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], airports: 0}};
            });
            setGameCurrency(prev => (prev + measuresActualState[props.regionEN].airportsPrice));

            //alert o vykonani
            setModalRegion(props.regionName);
            setModalMessage("Deaktivoval si uzavretie letísk pre daný región.")
            handleOpenSuccess();
        }
    }

    const handleActivationClickSeaports = () => {
        if (measuresActualState[props.regionEN].seaportsPrice <= gameCurrency) {
            if (measuresActualState[props.regionEN].seaports !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], seaports: 1}};
                });
                setGameCurrency(prev => (prev - measuresActualState[props.regionEN].seaportsPrice));

                //alert o vykonani
                setModalRegion(props.regionName);
                setModalMessage("Aktivoval si uzavretie ľodných prístavov pre daný región.")
                handleOpenSuccess();
            }
        }else{
            handleOpenFailure();
        }
    }

    const handleDeactivationClickSeaports = () => {
        if (measuresActualState[props.regionEN].seaports === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], seaports: 0}};
            });
            setGameCurrency(prev => (prev + measuresActualState[props.regionEN].seaportsPrice));

            //alert o vykonani
            setModalRegion(props.regionName);
            setModalMessage("Deaktivoval si uzavretie ľodných prístavov pre daný región.")
            handleOpenSuccess();
        }
    }

    return (


        <Card className={classes.cards}>
            <Snackbar open={openTravelRestrictionsSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {modalRegion} - {modalMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openTravelRestrictionsFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    Nemáš dostatok hernej meny na aktiváciu.
                </Alert>
            </Snackbar>
            <CardContent>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container className={classes.actionButtons}>
                            <Grid item xs={3}>
                                <Typography className={classes.title} color="textPrimary" gutterBottom>
                                    {props.regionName}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Button id={props.regionEN} color={button1Color}
                                        variant={measuresActualState[props.regionEN].borders === 1 ? "contained" : "outlined"}
                                        onClick={() => {
                                            handleButtonClick(props.measurestext1, 1, measuresActualState[props.regionEN].bordersPrice);
                                        }}>
                                    Hranice
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button color={button2Color}
                                        variant={measuresActualState[props.regionEN].airports === 1 ? "contained" : "outlined"}
                                        onClick={() => {
                                            handleButtonClick(props.measurestext2, 2, measuresActualState[props.regionEN].airportsPrice);
                                        }}>
                                    Letiská
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button color={button3Color}
                                        variant={measuresActualState[props.regionEN].seaports === 1 ? "contained" : "outlined"}
                                        onClick={() => {
                                            handleButtonClick(props.measurestext3, 3, measuresActualState[props.regionEN].seaportsPrice);
                                        }}>
                                    Prístavy
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {showResults1 ? <Results cislo={1}/> : null}
                        {showResults2 ? <Results cislo={2}/> : null}
                        {showResults3 ? <Results cislo={3}/> : null}
                    </Grid>
                </Grid>
            </CardContent>

        </Card>

    );
}

export default KartaHromadneOblastneOpatrenia;