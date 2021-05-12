import React, {useState} from 'react';
import {
    Button,
    DialogContent, Snackbar,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../../data/currencies/GameCurrencyState";
import Divider from "@material-ui/core/Divider";
import MuiAlert from "@material-ui/lab/Alert";
import {CureState} from "./CureState";
import {BetaState} from "../../../data/parameters/BetaState";
import {DeltaState} from "../../../data/parameters/DeltaState";
import {MedicalUnitsCurrencyState} from "../../../data/currencies/MedicalUnitsCurrencyState";
import PriceInfoSingleMeasurment from "../PriceInfoSingleMeasurment";

function Cure(props) {
    const useStyles = makeStyles((theme) => ({
        activationButtons: {
            textAlign: "center",
            marginTop: "6px",
        },
        actionButtons: {
            textAlign: "center",
            marginTop: "10px",
        }, buttonSize: {
            width: "260px",
            // height:"50px"
        }
    }));
    const classes = useStyles();

    //sprava pre jednotlive opatrenie
    const [text, setText] = useState("pre zobrazenie popisu klikni na opatrenie");
    const [price, setPrice] = useState("pre zobrazenie ceny klikni na opatrenie");

    //data s opatreniami
    const [measuresActualState, setMeasuresActualState] = useRecoilState(CureState);

    //herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //vedlajsia herna mena
    const [medicalUnitsCurrency, setMedicalUnitsCurrency] = useRecoilState(MedicalUnitsCurrencyState);

    //beta parameter
    const [, setBetaParameter] = useRecoilState(BetaState);
    //delta parameter
    const [, setDeltaParameter] = useRecoilState(DeltaState);

    //alert po aktivacii/deaktivacii--------------------
    //po uspesnom pokuse o aktivaciu
    const [openCureSuccess, setOpenCureSuccess] = React.useState(false);
    const handleOpenSuccess = () => {
        setOpenCureSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCureSuccess(false);
    };
    //po neuspensom pokuse o aktivaciu
    const [openCureFailure, setOpenCureFailure] = React.useState(false);
    const handleOpenFailure = () => {
        setOpenCureFailure(true);
    };
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCureFailure(false);
    };

    const [modalMessage, setModalMessage] = useState();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    //----------------------------------------------

    //stylovanie buttonov po klinuti
    const [buttonWorkForceColor, setButtonWorkForceColor] = useState("default");
    const [buttonPatientsCapacityColor, setButtonPatientsCapacityColor] = useState("default");
    const [buttonFieldHospitalColor, setButtonFieldHospitalColor] = useState("default");
    const [buttonMedicalTechnologyColor, setButtonMedicalTechnologyColor] = useState("default");
    const [buttonHospitalMeasuresColor, setButtonHospitalMeasuresColor] = useState("default");
    const [buttonMedicalSurgeryColor, setButtonMedicalSurgeryColor] = useState("default");

    const [showWorkForce, setShowWorkForce] = React.useState(false);
    const [showPatientsCapacity, setShowPatientsCapacity] = React.useState(false);
    const [showFieldHospital, setShowFieldHospital] = React.useState(false);
    const [showMedicalTechnology, setShowMedicalTechnology] = React.useState(false);
    const [showHospitalMeasures, setShowHospitalMeasures] = React.useState(false);
    const [showMedicalSurgery, setShowMedicalSurgery] = React.useState(false);


    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        setText(textMessage);
        setPrice(buttonPrice);
        switch (buttonNumber) {
            case 1:
                setButtonWorkForceColor("primary");
                setButtonPatientsCapacityColor("default");
                setButtonFieldHospitalColor("default");
                setButtonMedicalTechnologyColor("default");
                setButtonHospitalMeasuresColor("default");
                setButtonMedicalSurgeryColor("default");

                setShowWorkForce(true);
                setShowPatientsCapacity(false);
                setShowFieldHospital(false);
                setShowMedicalTechnology(false);
                setShowHospitalMeasures(false);
                setShowMedicalSurgery(false);
                break;
            case 2:
                setButtonWorkForceColor("default");
                setButtonPatientsCapacityColor("primary");
                setButtonFieldHospitalColor("default");
                setButtonMedicalTechnologyColor("default");
                setButtonHospitalMeasuresColor("default");
                setButtonMedicalSurgeryColor("default");

                setShowWorkForce(false);
                setShowPatientsCapacity(true);
                setShowFieldHospital(false);
                setShowMedicalTechnology(false);
                setShowHospitalMeasures(false);
                setShowMedicalSurgery(false);
                break;
            case 3:
                setButtonWorkForceColor("default");
                setButtonPatientsCapacityColor("default");
                setButtonFieldHospitalColor("primary");
                setButtonMedicalTechnologyColor("default");
                setButtonHospitalMeasuresColor("default");
                setButtonMedicalSurgeryColor("default");

                setShowWorkForce(false);
                setShowPatientsCapacity(false);
                setShowFieldHospital(true);
                setShowMedicalTechnology(false);
                setShowHospitalMeasures(false);
                setShowMedicalSurgery(false);
                break;
            case 4:
                setButtonWorkForceColor("default");
                setButtonPatientsCapacityColor("default");
                setButtonFieldHospitalColor("default");
                setButtonMedicalTechnologyColor("primary");
                setButtonHospitalMeasuresColor("default");
                setButtonMedicalSurgeryColor("default");

                setShowWorkForce(false);
                setShowPatientsCapacity(false);
                setShowFieldHospital(false);
                setShowMedicalTechnology(true);
                setShowHospitalMeasures(false);
                setShowMedicalSurgery(false);
                break;
            case 5:
                setButtonWorkForceColor("default");
                setButtonPatientsCapacityColor("default");
                setButtonFieldHospitalColor("default");
                setButtonMedicalTechnologyColor("default");
                setButtonHospitalMeasuresColor("primary");
                setButtonMedicalSurgeryColor("default");

                setShowWorkForce(false);
                setShowPatientsCapacity(false);
                setShowFieldHospital(false);
                setShowMedicalTechnology(false);
                setShowHospitalMeasures(true);
                setShowMedicalSurgery(false);
                break;
            case 6:
                setButtonWorkForceColor("default");
                setButtonPatientsCapacityColor("default");
                setButtonFieldHospitalColor("default");
                setButtonMedicalTechnologyColor("default");
                setButtonHospitalMeasuresColor("default");
                setButtonMedicalSurgeryColor("primary");

                setShowWorkForce(false);
                setShowPatientsCapacity(false);
                setShowFieldHospital(false);
                setShowMedicalTechnology(false);
                setShowHospitalMeasures(false);
                setShowMedicalSurgery(true);
                break;
            default:
                return null;
        }
    }
    //funckia pre navrat hodnot do resultu
    const renderSwitch = (param) => {
        switch (param) {
            case 1:
                return <div><Button onClick={handleActivationWorkForce}>Aktivovať</Button><Button
                    onClick={handleDeactivationWorkForce}>Deaktivovať</Button></div>
            case 2:
                return <div><Button onClick={handleActivationPatientsCapacity}>Aktivovať</Button><Button
                    onClick={handleDeactivationPatientsCapacity}>Deaktivovať</Button></div>
            case 3:
                return <div><Button onClick={handleActivationFieldHospital}>Aktivovať</Button><Button
                    onClick={handleDeactivationFieldHospital}>Deaktivovať</Button></div>
            case 4:
                return <div><Button onClick={handleActivationMedicalTechnology}>Aktivovať</Button><Button
                    onClick={handleDeactivationMedicalTechnology}>Deaktivovať</Button></div>
            case 5:
                return <div><Button onClick={handleActivationHospitalMeasures}>Aktivovať</Button><Button
                    onClick={handleDeactivationHospitalMeasures}>Deaktivovať</Button></div>
            case 6:
                return <div><Button onClick={handleActivationMedicalSurgery}>Aktivovať</Button><Button
                    onClick={handleDeactivationMedicalSurgery}>Deaktivovať</Button></div>
            default:
                return null;
        }
    }

    //aktivacne/deaktivacne tlacidla po kliknuti na dane opatrenie
    const Results = (c) => (
        <Grid className={classes.activationButtons}>
            {renderSwitch(c.cislo)}
        </Grid>
    )

    //action-handlers pre aktivacie/deaktivacie----------
    const handleActivationWorkForce = () => {
        if (measuresActualState.WorkForcePrice <= gameCurrency && measuresActualState.WorkForcePriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.WorkForce === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, WorkForce: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.WorkForcePrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.WorkForcePriceMedUnits));
                setDeltaParameter(prev => (prev - measuresActualState.WorkForceDelta));
                setModalMessage("Aktivoval si opatrenie - Zvýšenie kapacít zdravotníckeho personálu.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationWorkForce = () => {
        if (measuresActualState.WorkForce === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, WorkForce: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.WorkForcePrice / 2)));
            setDeltaParameter(prev => (prev + measuresActualState.WorkForceDelta));
            setModalMessage("Deaktivoval si opatrenie - Zvýšenie kapacít zdravotníckeho personálu.")
            handleOpenSuccess();
        }
    }

    const handleActivationPatientsCapacity = () => {
        if (measuresActualState.PatientsCapacityPrice <= gameCurrency && measuresActualState.PatientsCapacityPriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.PatientsCapacity === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, PatientsCapacity: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.PatientsCapacityPrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.PatientsCapacityPriceMedUnits));
                setDeltaParameter(prev => (prev - measuresActualState.PatientsCapacityDelta));
                setModalMessage("Aktivoval si opatrenie - Zvýšenie kapacít pre pacientov.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationPatientsCapacity = () => {
        if (measuresActualState.PatientsCapacity === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, PatientsCapacity: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.PatientsCapacityPrice / 2)));
            setDeltaParameter(prev => (prev + measuresActualState.PatientsCapacityDelta));
            setModalMessage("Deaktivoval si opatrenie - Zvýšenie kapacít pre pacientov.")
            handleOpenSuccess();
        }
    }

    const handleActivationFieldHospital = () => {
        if (measuresActualState.FieldHospitalPrice <= gameCurrency && measuresActualState.FieldHospitalPriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.FieldHospital === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, FieldHospital: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.FieldHospitalPrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.FieldHospitalPriceMedUnits));
                setBetaParameter(prev => (prev - measuresActualState.FieldHospitalBeta));
                setDeltaParameter(prev => (prev - measuresActualState.FieldHospitalDelta));
                setModalMessage("Aktivoval si opatrenie - Poľné nemocnice.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationFieldHospital = () => {
        if (measuresActualState.FieldHospital === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, FieldHospital: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.FieldHospitalPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.FieldHospitalBeta));
            setDeltaParameter(prev => (prev + measuresActualState.FieldHospitalDelta));
            setModalMessage("Deaktivoval si opatrenie - Poľné nemocnice.")
            handleOpenSuccess();
        }
    }

    const handleActivationMedicalTechnology = () => {
        if (measuresActualState.MedicalTechnologyPrice <= gameCurrency && measuresActualState.MedicalTechnologyPriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.MedicalTechnology === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, MedicalTechnology: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.MedicalTechnologyPrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.MedicalTechnologyPriceMedUnits));
                setDeltaParameter(prev => (prev - measuresActualState.MedicalTechnologyDelta));
                setModalMessage("Aktivoval si opatrenie - Medické vybavenie a technológie.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationMedicalTechnology = () => {
        if (measuresActualState.MedicalTechnology === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, MedicalTechnology: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.MedicalTechnologyPrice / 2)));
            setDeltaParameter(prev => (prev + measuresActualState.MedicalTechnologyDelta));
            setModalMessage("Deaktivoval si opatrenie - Medické vybavenie a technológie.")
            handleOpenSuccess();
        }
    }

    const handleActivationHospitalMeasures = () => {
        if (measuresActualState.HospitalMeasuresPrice <= gameCurrency && measuresActualState.HospitalMeasuresPriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.HospitalMeasures === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, HospitalMeasures: 1, HospitalMeasuresState: false};
                });
                setGameCurrency(prev => (prev - measuresActualState.HospitalMeasuresPrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.HospitalMeasuresPriceMedUnits));
                setBetaParameter(prev => (prev - measuresActualState.HospitalMeasuresBeta));
                setDeltaParameter(prev => (prev - measuresActualState.HospitalMeasuresDelta));
                setModalMessage("Aktivoval si opatrenie - Opatrenia v nemocniciach.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationHospitalMeasures = () => {
        if (measuresActualState.HospitalMeasures === 1) {
            if (measuresActualState.MedicalSurgery === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, HospitalMeasures: 0, HospitalMeasuresState: true};
                });
                setGameCurrency(prev => (prev + Math.round(measuresActualState.HospitalMeasuresPrice / 2)));
                setBetaParameter(prev => (prev + measuresActualState.HospitalMeasuresBeta));
                setDeltaParameter(prev => (prev + measuresActualState.HospitalMeasuresDelta));
                setModalMessage("Deaktivoval si opatrenie - Opatrenia v nemocniciach.")
                handleOpenSuccess();
            } else {
                setModalMessage("Nemôžeš deaktivovať toto opatrenie. Najprv deaktivuj nadväzujúce opatrenia.");
                handleOpenFailure();
            }
        }
    }

    const handleActivationMedicalSurgery = () => {
        if (measuresActualState.MedicalSurgeryPrice <= gameCurrency && measuresActualState.MedicalSurgeryPriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.MedicalSurgery === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, MedicalSurgery: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.MedicalSurgeryPrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.MedicalSurgeryPriceMedUnits));
                setBetaParameter(prev => (prev - measuresActualState.MedicalSurgeryBeta));
                setDeltaParameter(prev => (prev - measuresActualState.MedicalSurgeryDelta));
                setModalMessage("Aktivoval si opatrenie - Zrušenie lekárskych zákrokov.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationMedicalSurgery = () => {
        if (measuresActualState.MedicalSurgery === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, MedicalSurgery: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.MedicalSurgeryPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.MedicalSurgeryBeta));
            setDeltaParameter(prev => (prev + measuresActualState.MedicalSurgeryDelta));
            setModalMessage("Deaktivoval si opatrenie - Zrušenie lekárskych zákrokov.")
            handleOpenSuccess();
        }
    }
    //-----------------------------------------


    return (
        <DialogContent dividers>
            <Snackbar open={openCureSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openCureFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Typography gutterBottom>
                Aktiváciou týchto opatrení sa znižuje smrtnosť na nákazu.
            </Typography>
            <Divider/>
            <Grid container>
                <PriceInfoSingleMeasurment price={price} text={text}/>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonWorkForceColor}
                            variant={measuresActualState.WorkForce === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zvýšením kapacít zdravotníckeho personálu sa potenciálne zníži smrtnosť.", 1, measuresActualState.WorkForcePrice + " (herná mena) | " + measuresActualState.WorkForcePriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Zvýšenie kapacít zdravotníckeho personálu
                    </Button>
                    {showWorkForce ? <Results cislo={1}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonPatientsCapacityColor}
                            variant={measuresActualState.PatientsCapacity === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zvýšením kapacít pre pacientov v nemocniciach a zdravotníckych centrách sa potenciálne zníži smrtnosť.", 2, measuresActualState.PatientsCapacityPrice + " (herná mena) | " + measuresActualState.PatientsCapacityPriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Zvýšenie kapacít pre pacientov
                    </Button>
                    {showPatientsCapacity ? <Results cislo={2}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonFieldHospitalColor}
                            variant={measuresActualState.FieldHospital === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zriadením poľných nemocníc sa vytvoria kapacity pre nakazených pacientov a ich liečba bude izolovaná, čo má za následok potenciálne zníženie smrtnosti a šírenia nákazy.", 3, measuresActualState.FieldHospitalPrice + " (herná mena) | " + measuresActualState.FieldHospitalPriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Poľné nemocnice
                    </Button>
                    {showFieldHospital ? <Results cislo={3}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonMedicalTechnologyColor}
                            variant={measuresActualState.MedicalTechnology === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zaobstaraním potrebnej medickej technológie a vybavenia sa potenciálne zníži smrtnosť.", 4, measuresActualState.MedicalTechnologyPrice + " (herná mena) | " + measuresActualState.MedicalTechnologyPriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Medické vybavenie a technológie
                    </Button>
                    {showMedicalTechnology ? <Results cislo={4}/> : null}
                </Grid>
            </Grid>

            <br/>
            <Divider/>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonHospitalMeasuresColor}
                            variant={measuresActualState.HospitalMeasures === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zavedením prísnejších opatrení v nemocniciach a zdravotníckych centrách sa môže potenciálne znížiť smrtnosť a šírenie nákazy.", 5, measuresActualState.HospitalMeasuresPrice + " (herná mena) | " + measuresActualState.HospitalMeasuresPriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Opatrenia v nemocniciach
                    </Button>
                    {showHospitalMeasures ? <Results cislo={5}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.HospitalMeasuresState} className={classes.buttonSize}
                            color={buttonMedicalSurgeryColor}
                            variant={measuresActualState.MedicalSurgery === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zrušením zákrokov, ktoré nie sú životne nevyhnutné, sa potenciálne zníži šírenie nákazy a smrtnosť.", 6, measuresActualState.MedicalSurgeryPrice + " (herná mena) | " + measuresActualState.MedicalSurgeryPriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Zrušenie lekárskych zákrokov
                    </Button>
                    {showMedicalSurgery ? <Results cislo={6}/> : null}
                </Grid>
            </Grid>

            <br/>

        </DialogContent>

    );
}

export default Cure;
