import React, {useState} from 'react';
import {Button, Card, CardContent, Snackbar, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import {useRecoilState} from "recoil";
import {MedicalUnitsCurrencyState} from "../../data/currencies/MedicalUnitsCurrencyState";
import {GameCurrencyState} from "../../data/currencies/GameCurrencyState";
import {ActivableInhibitorsState} from "../../data/ActivableInhibitorsState";
import {BetaState} from "../../data/parameters/BetaState";
import {DeltaState} from "../../data/parameters/DeltaState";
import MuiAlert from "@material-ui/lab/Alert";

/**
 * Renders a <GameCurrencyModal /> component
 * component is used to display game currency modal, which contains game currency, medical units, etc.
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function GameCurrencyModal() {
    const useStyles = makeStyles(() => ({
        itemAlign: {
            textAlign: "center",
        }, buttonsAlign: {
            marginTop: "6px",
            textAlign: "center",
        }, headerButton: {
            fontWeight: "bold"
        }, textColor: {
            color: "red"
        }
    }));
    const classes = useStyles();

    //hlavna herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //vedlajsia herna mena
    const [medicalUnitsCurrency, setMedicalUnitsCurrency] = useRecoilState(MedicalUnitsCurrencyState);

    //inhibitory
    const [inhibitors, setInhibitors] = useRecoilState(ActivableInhibitorsState);

    //beta parameter
    const [, setBetaParameter] = useRecoilState(BetaState);
    //delta parameter
    const [, setDeltaParameter] = useRecoilState(DeltaState);


    const [text, setText] = useState("");
    const [cena, setCena] = useState();

    const [button1, setButton1] = useState("default");
    const [button2, setButton2] = useState("default");
    const [button3, setButton3] = useState("default");
    const [button4, setButton4] = useState("default");
    const handleButtonClick = (textMessage, buttonNumber, buttonCena) => {
        setText(textMessage);
        setCena(buttonCena);
        switch (buttonNumber) {
            case 1:
                setButton1("primary");
                setButton2("default");
                setButton3("default");
                setButton4("default");
                break;
            case 2:
                setButton1("default");
                setButton2("primary");
                setButton3("default");
                setButton4("default");
                break;
            case 3:
                setButton1("default");
                setButton2("default");
                setButton3("primary");
                setButton4("default");
                break;
            case 4:
                setButton1("default");
                setButton2("default");
                setButton3("default");
                setButton4("primary");
                break;
            default:
                return null;
        }
    }


    //cena za zdravotnicke jednotky
    let medicalUnitsPrice = 5;

    //cena za Permanentné zníženie šírenia
    let infectivityInhibitorPrice = 15;
    //sila infektivity inhibitora
    let infectivityInhibitorStrength = 0.001;

    //cena za Permanentné zníženie smrtnosti
    let mortalityInhibitorPrice = 15;
    //sila mortality inhibitora
    let mortalityInhibitorStrength = 0.0001;

    //pocet zdrav. jednotiek za nakup
    let medicalUnitsCount = 10;

    const purchaseMedicalUnits = (buyPrice, buttonNumber) => {
        if (buyPrice <= gameCurrency) {
            switch (buttonNumber) {
                case 1:
                    setMedicalUnitsCurrency(prev => (prev + medicalUnitsCount));
                    break;
                default:
                    return null;
            }
            setGameCurrency(prev => (prev - buyPrice));
            setModalMessage("Zakúpil si zdravotnícke jednotky.");
            handleOpenSuccess();
        } else {
            setModalMessage("Nemáš dostatok hlavnej hernej meny na zakúpenie zdravotníckych jednotiek.");
            handleOpenFailure();
        }
    }

    const purchaseInhibitors = (buyPrice, buttonNumber) => {
        if (buyPrice <= medicalUnitsCurrency) {
            switch (buttonNumber) {
                case 2:
                    setBetaParameter(prev => (prev - infectivityInhibitorStrength));
                    setModalMessage("Aktivoval si permanentné zníženie šírenia.");
                    handleOpenSuccess();
                    setInhibitors((prevStats) => {
                        return {...prevStats, infectivityInhibitor: prevStats.infectivityInhibitor + 1};
                    });
                    break;
                case 3:
                    setDeltaParameter(prev => (prev - mortalityInhibitorStrength));
                    setModalMessage("Aktivoval si permanentné zníženie smrtnosti.");
                    handleOpenSuccess();
                    setInhibitors((prevStats) => {
                        return {...prevStats, mortalityInhibitor: prevStats.mortalityInhibitor + 1};
                    });
                    break;
                default:
                    return null;
            }
            setMedicalUnitsCurrency(prev => (prev - buyPrice));
        } else {
            setModalMessage("Nemáš dostatok zdravotníckych jednotiek na zakúpenie daného vylepšenia.");
            handleOpenFailure();
        }
    }

    const [openCurrencySuccess, setOpenCurrencySuccess] = React.useState(false);
    const handleOpenSuccess = () => {
        setOpenCurrencySuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCurrencySuccess(false);
    };

    const [openCurrencyFailure, setOpenCurrencyFailure] = React.useState(false);
    const handleOpenFailure = () => {
        setOpenCurrencyFailure(true);
    };
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCurrencyFailure(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const [modalMessage, setModalMessage] = useState();

    return (
        <div>
            <Snackbar open={openCurrencySuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openCurrencyFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Card>
                <CardContent>
                    <Grid container xs={12} className={classes.itemAlign}>
                        <Grid item xs={12} className={classes.itemAlign}>
                            {text === "" ? "" :
                                <div>
                                    <Typography className={classes.textColor}>Popis</Typography>
                                    <Typography>{text}</Typography>
                                    <Typography color={"secondary"}>
                                        {cena > 0 ? cena === 5 ? "Cena: " + cena + " hernej meny / 10 jednotiek" : "Cena: " + cena + " zdrav. jednotiek / jedna aktivácia" : ""}
                                    </Typography>
                                </div>}
                        </Grid>
                    </Grid>

                    <br/>
                    <Divider/>

                    <Grid container spacing={3}>


                        <Grid item xs={3} className={classes.itemAlign}>
                            <Typography variant={"h6"}>
                                <Button color={button4} className={classes.headerButton} onClick={() => {
                                    handleButtonClick("Hernú menu získavaš viacerými spôsobmi - napr. šanca na získanie za novo-nakazenú krajinu, plynutím času...", 4, 0)
                                }}>Aktuálna herná mena</Button></Typography>
                        </Grid>

                        <Grid item xs={3} className={classes.itemAlign}>
                            <Typography variant={"h6"}>
                                <Button color={button1} className={classes.headerButton} onClick={() => {
                                    handleButtonClick("Zdravotnícke jednotky sa dajú zakúpiť za hernú menu. Pomocou zdravotníckych jednotiek sa dajú robiť rôzne akcie," +
                                        " ako napríklad začať vývoj vakcíny, permanentne " +
                                        "znížiť šírenie nákazy a pod.", 1, medicalUnitsPrice)
                                }}>Zdravotnícke jednotky</Button>
                            </Typography>
                        </Grid>

                        <Grid item xs={3} className={classes.itemAlign}>
                            <Typography variant={"h6"}>
                                <Button color={button2} className={classes.headerButton} onClick={() => {
                                    handleButtonClick("Zakúpením permanentného zníženia šírenia sa počas celej zníži hry infekčnosť nákazy. Táto akcia sa dá viacnásobne zakúpiť za zdravotnícke jednotky a je nevratná.", 2, infectivityInhibitorPrice)
                                }}>Permanentné zníženie šírenia</Button>
                            </Typography>
                        </Grid>

                        <Grid item xs={3} className={classes.itemAlign}>
                            <Typography variant={"h6"}>
                                <Button color={button3} className={classes.headerButton} onClick={() => {
                                    handleButtonClick("Zakúpením permanentného zníženia smrtnosti sa počas celej zníži hry smrtnosť nákazy. Táto akcia sa dá viacnásobne zakúpiť za zdravotnícke jednotky a je nevratná.", 3, mortalityInhibitorPrice)
                                }}>Permanentné zníženie smrtnosti</Button>
                            </Typography>
                        </Grid>
                    </Grid>

                    <br/>
                    <Divider/>

                    <Grid container xs={12} className={classes.itemAlign}>
                        <Grid item xs={12} className={classes.itemAlign}>
                            <Typography>Aktuálny stav</Typography>
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container>
                        <Grid item xs={3} className={classes.itemAlign}>
                            <Typography variant={"h5"}>{gameCurrency}</Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.itemAlign}>
                            <Typography variant={"h5"}>{medicalUnitsCurrency}</Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.itemAlign}>
                            <Typography variant={"h5"}>{inhibitors.infectivityInhibitor}</Typography>
                        </Grid>
                        <Grid item xs={3} className={classes.itemAlign}>
                            <Typography variant={"h5"}>{inhibitors.mortalityInhibitor}</Typography>
                        </Grid>
                    </Grid>

                    <br/>
                    <Divider/>

                    <Grid container>
                        <Grid item xs={3} className={classes.buttonsAlign}>

                        </Grid>
                        <Grid item xs={3} className={classes.buttonsAlign}>
                            <Button onClick={() => {
                                purchaseMedicalUnits(medicalUnitsPrice, 1)
                            }}>Zakúpiť</Button>
                        </Grid>
                        <Grid item xs={3} className={classes.buttonsAlign}>
                            <Button onClick={() => {
                                purchaseInhibitors(infectivityInhibitorPrice, 2)
                            }}>Zakúpiť</Button>
                        </Grid>
                        <Grid item xs={3} className={classes.buttonsAlign}>
                            <Button onClick={() => {
                                purchaseInhibitors(mortalityInhibitorPrice, 3)
                            }}>Zakúpiť</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
        </div>
    );
}

export default GameCurrencyModal;
