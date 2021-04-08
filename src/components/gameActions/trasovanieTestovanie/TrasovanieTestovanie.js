import React, {useState} from 'react';
import {
    Button, Card,
    DialogContent, Modal, Snackbar,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {useRecoilState} from "recoil";
import {TrasovanieTestovanieState} from "./TrasovanieTestovanieState";
import {GameCurrencyState} from "../../../data/GameCurrencyState";
import Divider from "@material-ui/core/Divider";
import MuiAlert from "@material-ui/lab/Alert";

function TrasovanieTestovanie(props) {
    const useStyles = makeStyles((theme) => ({
        activationButtons: {
            textAlign: "center",
            marginTop: "6px",
        },
        actionButtons: {
            textAlign: "center",
            marginTop: "10px",
        }
    }));
    const classes = useStyles();

    //sprava pre jednotlive opatrenie
    const [text, setText] = useState("");
    const [price, setPrice] = useState();

    //data s opatreniami
    const [measuresActualState, setMeasuresActualState] = useRecoilState(TrasovanieTestovanieState);

    //herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //modal po aktivacii/deaktivacii--------------------
    //po uspesnom pokuse o aktivaciu
    const [openTracingTestingSuccess, setOpenTracingTestingSuccess] = React.useState(false);
    const handleOpenSuccess = () => {
        setOpenTracingTestingSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTracingTestingSuccess(false);
    };
    //po neuspensom pokuse o aktivaciu
    const [openTracingTestingFailure, setOpenTracingTestingFailure] = React.useState(false);
    const handleOpenFailure = () => {
        setOpenTracingTestingFailure(true);
    };
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTracingTestingFailure(false);
    };

    const [modalMessage, setModalMessage] = useState();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }
    //----------------------------------------------

    //stylovanie buttonov po klinuti
    const [buttonBasicTracingColor, setButtonBasicTracingColor] = useState("default");
    const [buttonAdvancedTracingColor, setButtonAdvancedTracingColor] = useState("default");
    const [showBasicTracing, setShowBasicTracing] = React.useState(false);
    const [showAdvancedTracing, setShowAdvancedTracing] = React.useState(false);
    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        setText(textMessage);
        setPrice(buttonPrice);
        if (buttonNumber === 1) {
            setButtonBasicTracingColor("primary");
            setShowBasicTracing(true);
        } else if (buttonNumber === 2) {
            setButtonAdvancedTracingColor("primary");
            setShowAdvancedTracing(true);
        }
    }

    //aktivacne/deaktivacne tlacidla po kliknuti na dane opatrenie
    const Results = (c) => (
        <Grid className={classes.activationButtons}>
            {c.cislo === 1 ? <div><Button onClick={handleActivationBasicTracing}>Aktivovať</Button><Button
                onClick={handleDeactivationBasicTracing}>Dektivovať</Button></div> : c.cislo === 2 ?
                <div><Button onClick={handleActivationAdvancedTracing}>Aktivovať</Button><Button
                    onClick={handleDeactivationAdvancedTracing}>Dektivovať</Button></div> : ""}

        </Grid>
    )

    //action-handlers pre aktivacie/deaktivacie----------
    const handleActivationBasicTracing = () => {
        if (measuresActualState.BasicTracingPrice <= gameCurrency) {
            if (measuresActualState.BasicTracing !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, BasicTracing: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.BasicTracingPrice));

                setModalMessage("Aktivoval si dohľadávanie kontaktov.")
                handleOpenSuccess();
            }
        }else{
            handleOpenFailure();
        }
    }
    const handleDeactivationBasicTracing = () => {
        if (measuresActualState.BasicTracing === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, BasicTracing: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.BasicTracingPrice));

            setModalMessage("Deaktivoval si dohľadávanie kontaktov.")
            handleOpenSuccess();
        }
    }
    const handleActivationAdvancedTracing = () => {
        if (measuresActualState.AdvancedTracingPrice <= gameCurrency) {
            if (measuresActualState.AdvancedTracing !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, AdvancedTracing: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.AdvancedTracingPrice));

                setModalMessage("Aktivoval si vylepšené dohľadávanie kontaktov.")
                handleOpenSuccess();
            }
        }else{
            handleOpenFailure();
        }
    }
    const handleDeactivationAdvancedTracing = () => {
        if (measuresActualState.AdvancedTracing === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, AdvancedTracing: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.AdvancedTracingPrice));

            setModalMessage("Deaktivoval si vylepšené dohľadávanie kontaktov.")
            handleOpenSuccess();
        }

    }
    //-----------------------------------------


    return (
        <DialogContent dividers>
            <Snackbar open={openTracingTestingSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                   {modalMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openTracingTestingFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    Nemáš dostatok hernej meny na aktiváciu.
                </Alert>
            </Snackbar>
            <Typography gutterBottom>
                Aktiváciou týchto opatrení sa znižuje riziko šírenia nákazy.
            </Typography>
            <Divider/>
            <Grid container>
                <Grid item xs={12}>
                    <Typography className={classes.title} color="textPrimary" gutterBottom>
                        Popis: {text}
                        <br/>
                        Cena: {price}
                    </Typography>
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button color={buttonBasicTracingColor}
                            variant={measuresActualState.BasicTracing === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Dohľadávanie kontaktov nakazených zníži prenos vírusu medzi ľuďmi.", 1, measuresActualState.BasicTracingPrice);
                            }}>
                        Dohľadávanie kontaktov
                    </Button>
                    {showBasicTracing ? <Results cislo={1}/> : null}
                </Grid>

                {measuresActualState.BasicTracing === 1 ?
                    <Grid item xs={12} className={classes.actionButtons}>
                        <Button color={buttonAdvancedTracingColor}
                                variant={measuresActualState.AdvancedTracing === 1 ? "contained" : "outlined"}
                                onClick={() => {
                                    handleButtonClick("Vylepšené dohľadávanie kontaktov nakazených zefektívni zníženie prenosu vírusu medzi ľuďmi.", 2, measuresActualState.AdvancedTracingPrice);
                                }}>
                            Vylepšené dohľadávanie kontaktov
                        </Button>
                        {showAdvancedTracing ? <Results cislo={2}/> : null}
                    </Grid>
                    : null}

            </Grid>

            <br/>
            <Divider/>

            {/*<Grid container>*/}
            {/*    <Grid item xs={12} className={classes.actionButtons}>*/}
            {/*        <Button color={buttonBasicTracingColor}*/}
            {/*                variant={measuresActualState.BasicTracing === 1 ? "contained" : "outlined"}*/}
            {/*                onClick={() => {*/}
            {/*                    handleButtonClick("Dohľadávanie kontaktov nakazených zníži prenos vírusu medzi ľuďmi.", 1, 2);*/}
            {/*                }}>*/}
            {/*            Dohľadávanie kontaktov*/}
            {/*        </Button>*/}
            {/*        {showBasicTracing ? <Results cislo={1}/> : null}*/}
            {/*    </Grid>*/}

            {/*    {measuresActualState.BasicTracing === 1 ?*/}
            {/*        <Grid item xs={12} className={classes.actionButtons}>*/}
            {/*            <Button color={buttonAdvancedTracingColor}*/}
            {/*                    variant={measuresActualState.AdvancedTracing === 1 ? "contained" : "outlined"}*/}
            {/*                    onClick={() => {*/}
            {/*                        handleButtonClick("Vylepšené dohľadávanie kontaktov nakazených zefektívni zníženie prenosu vírusu medzi ľuďmi.", 2, 3);*/}
            {/*                    }}>*/}
            {/*                Vylepšené dohľadávanie kontaktov*/}
            {/*            </Button>*/}
            {/*            {showAdvancedTracing ? <Results cislo={2}/> : null}*/}
            {/*        </Grid>*/}
            {/*        : null}*/}

            {/*</Grid>*/}
        </DialogContent>

    );
}

export default TrasovanieTestovanie;