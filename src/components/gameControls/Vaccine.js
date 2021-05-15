import React, {useState} from 'react';
import {Box, Button, DialogContent, Grid, LinearProgress, Snackbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../data/currencies/GameCurrencyState";
import MuiAlert from "@material-ui/lab/Alert";
import {VaccineState} from "../../data/gameControls/VaccineState";
import {MessageModalState} from "../../data/messages/MessageModalState";
import {GameTimeState} from "../../data/gameTime/GameTimeState";
import {MedicalUnitsCurrencyState} from "../../data/currencies/MedicalUnitsCurrencyState";
import PriceInfoSingleMeasurement from "./PriceInfoSingleMeasurement";
import {getRandomNumberInRange} from "../../utils/GameUtils";

function Vaccine() {
    const useStyles = makeStyles(() => ({
        actionButtons: {
            textAlign: "center",
            marginTop: "10px",
        },
        activationButtons: {
            textAlign: "center",
            marginTop: "6px",
        }, buttonSize: {
            width: "260px",
        }
    }));
    const classes = useStyles();


    const [linkText, setLinkText] = useState("pre zobrazenie popisu klikni na opatrenie");

    const [linkPrice, setLinkPrice] = useState("pre zobrazenie ceny klikni na opatrenie");


    //herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //vedlajsia herna mena
    const [medicalUnitsCurrency, setMedicalUnitsCurrency] = useRecoilState(MedicalUnitsCurrencyState);

    //spravy z hry
    const [, setMessages] = useRecoilState(MessageModalState);

    //herny cas v jednotke-den
    const [days,] = useRecoilState(GameTimeState);

    //data s opatreniami
    const [measuresActualState, setMeasuresActualState] = useRecoilState(VaccineState);

    if (measuresActualState.recalculateTimeForPlayer === 0) {
        if (measuresActualState.step1Time !== 0) {
            setMeasuresActualState((prevStats) => {
                return {
                    ...prevStats,
                    recalculateTimeForPlayer: 1,
                    recalculatedTime: getRandomNumberInRange((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time) * 0.95, (measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time) * 1.05),
                };
            });
        }
    }

    //alert pri aktivaciach/deaktiv.
    const [modalMessage, setModalMessage] = useState();

    //handler pre alert------------------------
    const [openVaccineSuccess, setOpenVaccineSuccess] = React.useState(false);
    const handleOpenSuccess = () => {
        setOpenVaccineSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenVaccineSuccess(false);
    };
    //po neuspensom pokuse o aktivaciu
    const [openVaccineFailure, setOpenVaccineFailure] = React.useState(false);
    const handleOpenFailure = () => {
        setOpenVaccineFailure(true);
    };
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenVaccineFailure(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    //------------------------------

    //buttony
    const [buttonVaccineDevelopmentColor, setButtonVaccineDevelopmentColor] = useState("default");
    const [buttonFinanceVaccineDevelopmentColor, setButtonFinanceVaccineDevelopmentColor] = useState("default");
    const [buttonInternationalCooperationColor, setButtonInternationalCooperationColor] = useState("default");
    const [buttonStep1Color, setButtonStep1Color] = useState("default");
    const [buttonStep2Color, setButtonStep2Color] = useState("default");
    const [buttonStep3Color, setButtonStep3Color] = useState("default");
    const [buttonSuperDevelopmentColor, setButtonSuperDevelopmentColor] = useState("default");

    const [showVaccineDevelopment, setShowVaccineDevelopment] = React.useState(false);
    const [showFinanceVaccineDevelopment, setShowFinanceVaccineDevelopment] = React.useState(false);
    const [showInternationalCooperation, setShowInternationalCooperation] = React.useState(false);
    const [showStep1, setShowStep1] = React.useState(false);
    const [showStep2, setShowStep2] = React.useState(false);
    const [showStep3, setShowStep3] = React.useState(false);
    const [showSuperDevelopment, setShowSuperDevelopment] = React.useState(false);

    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        setLinkText(textMessage);
        setLinkPrice(buttonPrice);
        switch (buttonNumber) {
            case 1:
                setButtonVaccineDevelopmentColor("primary");
                setButtonFinanceVaccineDevelopmentColor("default");
                setButtonInternationalCooperationColor("default");
                setButtonStep1Color("default");
                setButtonStep2Color("default");
                setButtonStep3Color("default");
                setButtonSuperDevelopmentColor("default");

                setShowVaccineDevelopment(true);
                setShowFinanceVaccineDevelopment(false);
                setShowInternationalCooperation(false);
                setShowStep1(false);
                setShowStep2(false);
                setShowStep3(false);
                setShowSuperDevelopment(false);
                break;
            case 2:
                setButtonVaccineDevelopmentColor("default");
                setButtonFinanceVaccineDevelopmentColor("primary");
                setButtonInternationalCooperationColor("default");
                setButtonStep1Color("default");
                setButtonStep2Color("default");
                setButtonStep3Color("default");
                setButtonSuperDevelopmentColor("default");

                setShowVaccineDevelopment(false);
                setShowFinanceVaccineDevelopment(true);
                setShowInternationalCooperation(false);
                setShowStep1(false);
                setShowStep2(false);
                setShowStep3(false);
                setShowSuperDevelopment(false);
                break;
            case 3:
                setButtonVaccineDevelopmentColor("default");
                setButtonFinanceVaccineDevelopmentColor("default");
                setButtonInternationalCooperationColor("primary");
                setButtonStep1Color("default");
                setButtonStep2Color("default");
                setButtonStep3Color("default");
                setButtonSuperDevelopmentColor("default");

                setShowVaccineDevelopment(false);
                setShowFinanceVaccineDevelopment(false);
                setShowInternationalCooperation(true);
                setShowStep1(false);
                setShowStep2(false);
                setShowStep3(false);
                setShowSuperDevelopment(false);
                break;
            case 4:
                setButtonVaccineDevelopmentColor("default");
                setButtonFinanceVaccineDevelopmentColor("default");
                setButtonInternationalCooperationColor("default");
                setButtonStep1Color("primary");
                setButtonStep2Color("default");
                setButtonStep3Color("default");
                setButtonSuperDevelopmentColor("default");

                setShowVaccineDevelopment(false);
                setShowFinanceVaccineDevelopment(false);
                setShowInternationalCooperation(false);
                setShowStep1(true);
                setShowStep2(false);
                setShowStep3(false);
                setShowSuperDevelopment(false);
                break;
            case 5:
                setButtonVaccineDevelopmentColor("default");
                setButtonFinanceVaccineDevelopmentColor("default");
                setButtonInternationalCooperationColor("default");
                setButtonStep1Color("default");
                setButtonStep2Color("primary");
                setButtonStep3Color("default");
                setButtonSuperDevelopmentColor("default");

                setShowVaccineDevelopment(false);
                setShowFinanceVaccineDevelopment(false);
                setShowInternationalCooperation(false);
                setShowStep1(false);
                setShowStep2(true);
                setShowStep3(false);
                setShowSuperDevelopment(false);
                break;
            case 6:
                setButtonVaccineDevelopmentColor("default");
                setButtonFinanceVaccineDevelopmentColor("default");
                setButtonInternationalCooperationColor("default");
                setButtonStep1Color("default");
                setButtonStep2Color("default");
                setButtonStep3Color("primary");
                setButtonSuperDevelopmentColor("default");

                setShowVaccineDevelopment(false);
                setShowFinanceVaccineDevelopment(false);
                setShowInternationalCooperation(false);
                setShowStep1(false);
                setShowStep2(false);
                setShowStep3(true);
                setShowSuperDevelopment(false);
                break;
            case 7:
                setButtonVaccineDevelopmentColor("default");
                setButtonFinanceVaccineDevelopmentColor("default");
                setButtonInternationalCooperationColor("default");
                setButtonStep1Color("default");
                setButtonStep2Color("default");
                setButtonStep3Color("default");
                setButtonSuperDevelopmentColor("primary");

                setShowVaccineDevelopment(false);
                setShowFinanceVaccineDevelopment(false);
                setShowInternationalCooperation(false);
                setShowStep1(false);
                setShowStep2(false);
                setShowStep3(false);
                setShowSuperDevelopment(true);
                break;
            default:
                return null;
        }
    }

    //funckia pre navrat hodnot do resultu
    const renderSwitch = (param) => {
        switch (param) {
            case 1:
                return <div><Button onClick={handleActivationDevelopVaccine}>Aktivovať</Button></div>
            case 2:
                return <div><Button onClick={handleActivationFinanceVaccineDevelopment}>Aktivovať</Button></div>
            case 3:
                return <div><Button onClick={handleActivationInternationalCooperation}>Aktivovať</Button></div>
            case 4:
                return <div><Button onClick={handleActivationStep1}>Aktivovať</Button></div>
            case 5:
                return <div><Button onClick={handleActivationStep2}>Aktivovať</Button></div>
            case 6:
                return <div><Button onClick={handleActivationStep3}>Aktivovať</Button></div>
            case 7:
                return <div><Button onClick={handleActivationSuperDevelopment}>Aktivovať</Button></div>
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
    const handleActivationDevelopVaccine = () => {
        if (measuresActualState.VaccineDevelopmentPrice <= gameCurrency && measuresActualState.VaccineDevelopmentPriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.ActivationVaccineDevelopment !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, ActivationVaccineDevelopment: 1, DevelopmentProcessTree: false};
                });
                setGameCurrency(prev => (prev - measuresActualState.VaccineDevelopmentPrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.VaccineDevelopmentPriceMedUnits));
                setMessages((prevStats) => ([...prevStats, {
                    name: "Vakcína", primaryMessage: " ● Začiatok vývoja vakcíny.", day: days, reason: 'vaccine'
                }]));
                setModalMessage("Aktivoval si opatrenie - Vývoj vakcíny.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }

    const handleActivationFinanceVaccineDevelopment = () => {
        if (measuresActualState.FinanceVaccineDevelopmentPrice <= gameCurrency && measuresActualState.FinanceVaccineDevelopmentPriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.FinanceVaccineDevelopment !== 1) {
                let newStep1Time = measuresActualState.step1Time - 30;
                let newStep2Time = measuresActualState.step2Time - 30;
                setMeasuresActualState((prevStats) => {
                    return {
                        ...prevStats,
                        FinanceVaccineDevelopment: 1,
                        step1Time: newStep1Time,
                        step2Time: newStep2Time,
                        FinanceVaccineDevelopmentTree: false
                    };
                });
                setGameCurrency(prev => (prev - measuresActualState.FinanceVaccineDevelopmentPrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.FinanceVaccineDevelopmentPriceMedUnits));
                setModalMessage("Aktivoval si opatrenie - Finančná pomoc vedcom.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }

    const handleActivationInternationalCooperation = () => {
        if (measuresActualState.InternationalCooperationPrice <= gameCurrency && measuresActualState.InternationalCooperationPriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.InternationalCooperation !== 1) {
                let newStep2Time = measuresActualState.step2Time - 30;
                let newStep3Time = measuresActualState.step3Time - 30;
                setMeasuresActualState((prevStats) => {
                    return {
                        ...prevStats,
                        InternationalCooperation: 1,
                        step2Time: newStep2Time,
                        step3Time: newStep3Time,
                        InternationalCooperationTree: false
                    };
                });
                setGameCurrency(prev => (prev - measuresActualState.InternationalCooperationPrice));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.InternationalCooperationPriceMedUnits));
                setModalMessage("Aktivoval si opatrenie - Medzinárodná kooperácia pri vývoji.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }

    const handleActivationStep1 = () => {
        if (measuresActualState.step1Price <= gameCurrency && measuresActualState.step1PriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.step1 !== 1) {
                //80dni az 90dni - cca 3 mesiace
                let step1 = getRandomNumberInRange(80, 90);
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, step1: 1, step1Time: step1, Step1Tree: false, recalculateTimeForPlayer: 0};
                });
                setGameCurrency(prev => (prev - measuresActualState.step1Price));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.step1PriceMedUnits));
                setModalMessage("Aktivoval si opatrenie - Urýchlenie prvej fázy vývoja.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }

    const handleActivationStep2 = () => {
        if (measuresActualState.step2Price <= gameCurrency && measuresActualState.step2PriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.step2 !== 1) {
                //330dni az 365dni - cca 11-12 mesiacov
                let step2 = getRandomNumberInRange(330, 365);
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, step2: 1, step2Time: step2, Step2Tree: false, recalculateTimeForPlayer: 0};
                });
                setGameCurrency(prev => (prev - measuresActualState.step2Price));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.step2PriceMedUnits));
                setModalMessage("Aktivoval si opatrenie - Urýchlenie druhej fázy vývoja.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }

    const handleActivationStep3 = () => {
        if (measuresActualState.step3Price <= gameCurrency && measuresActualState.step3PriceMedUnits <= medicalUnitsCurrency) {
            if (measuresActualState.step3 !== 1) {
                //240dni az 270dni - cca 8-9 mesiacov
                let step3 = getRandomNumberInRange(240, 270);
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, step3: 1, step3Time: step3, Step3Tree: false, recalculateTimeForPlayer: 0};
                });
                setGameCurrency(prev => (prev - measuresActualState.step3Price));
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.step3PriceMedUnits));
                setModalMessage("Aktivoval si opatrenie - Urýchlenie tretej fázy vývoja.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }

    const handleActivationSuperDevelopment = () => {
        if (measuresActualState.actualDevelopmentTime > 200) {
            if (measuresActualState.SuperDevelopmentPriceMedUnits <= medicalUnitsCurrency) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, step3Time: prevStats.step3Time - 25};
                });
                setMedicalUnitsCurrency(prev => (prev - measuresActualState.SuperDevelopmentPriceMedUnits));

                setModalMessage("Aktivoval si opatrenie - Urýchlenie vývoja.");
                handleOpenSuccess();

            } else {
                setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
                handleOpenFailure();
            }
        } else {
            setModalMessage("O aktiváciu sa pokúšaš príliš skoro, skús to o " + (200 - measuresActualState.actualDevelopmentTime) + " dní.");
            handleOpenFailure();
        }

    }

    return (

        <DialogContent dividers>
            <Snackbar open={openVaccineSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openVaccineFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    {modalMessage}
                </Alert>
            </Snackbar>

            <Typography gutterBottom>
                Tieto opatrenia sa týkajú vývoju vakcíny potrebnej na vyhratie hry. A následného urýchlenie klinického
                vývoja, chemickej výroby a ďalších.
                <Divider/>
                <PriceInfoSingleMeasurement price={linkPrice} text={linkText}/>
            </Typography>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonVaccineDevelopmentColor}
                            variant={measuresActualState.ActivationVaccineDevelopment === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Spustením tejto akcie sa začne nenávratný vývoj vakcíny (nevyhnutný liek pre výhru hry) proti nákaze.", 1, measuresActualState.VaccineDevelopmentPrice + " (herná mena) | " + measuresActualState.VaccineDevelopmentPriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Vývoj vakcíny
                    </Button>
                    {showVaccineDevelopment ? <Results cislo={1}/> : null}
                </Grid>
            </Grid>

            <br/>
            <Divider/>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.DevelopmentProcessTree}
                            className={classes.buttonSize}
                            color={buttonStep1Color}
                            variant={measuresActualState.step1 === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Spustením tejto nenávratnej akcie sa značne urýchli prvá fáza vývoja vakcíny, do ktorej spadá objav a validácia patogénu a antigénu, predklinické štúdie a vývoj klinických testov." +
                                    "Zároveň sa naštartuje aj masívny rozvoj výroby. Na záver sa začne aj s prvou fázou testovania vakcíny - overovanie bezpečnosti.", 4, measuresActualState.step1Price + " (herná mena) | " + measuresActualState.step1PriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Urýchlenie prvej fázy vývoja
                    </Button>
                    {showStep1 ? <Results cislo={4}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={(measuresActualState.DevelopmentProcessTree || measuresActualState.Step1Tree)}
                            className={classes.buttonSize}
                            color={buttonStep2Color}
                            variant={measuresActualState.step2 === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Spustením tejto nenávratnej akcie sa značne urýchli druhá fáza vývoja vakcíny, do ktorej spadá okrem masívnej výroby aj druhá fáza testovania vakcíny - overovanie bezpečnosti a imunogenicity.", 5, measuresActualState.step2Price + " (herná mena) | " + measuresActualState.step2PriceMedUnits + " (zdrav. jednotky)");
                            }}>
                        Urýchlenie druhej fázy vývoja
                    </Button>
                    {showStep2 ? <Results cislo={5}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button
                        disabled={(measuresActualState.DevelopmentProcessTree || measuresActualState.Step1Tree || measuresActualState.Step2Tree)}
                        className={classes.buttonSize}
                        color={buttonStep3Color}
                        variant={measuresActualState.step3 === 1 ? "contained" : "outlined"}
                        onClick={() => {
                            handleButtonClick("Spustením tejto nenávratnej akcie sa značne urýchli tretia fáza vývoja vakcíny, do ktorej spadá okrem masívnej výroby aj tretia fáza testovania vakcíny - overovanie bezpečnosti a efektívnosti. Na záver sa urýchli aj registrácia vakcíny.", 6, measuresActualState.step3Price + " (herná mena) | " + measuresActualState.step3PriceMedUnits + " (zdrav. jednotky)");
                        }}>
                        Urýchlenie tretej fázy vývoja
                    </Button>
                    {showStep3 ? <Results cislo={6}/> : null}
                </Grid>

            </Grid>

            <br/>
            <Divider/>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button
                        disabled={(measuresActualState.DevelopmentProcessTree || measuresActualState.Step1Tree || measuresActualState.Step2Tree || measuresActualState.Step3Tree)}
                        className={classes.buttonSize}
                        color={buttonFinanceVaccineDevelopmentColor}
                        variant={measuresActualState.FinanceVaccineDevelopment === 1 ? "contained" : "outlined"}
                        onClick={() => {
                            handleButtonClick("Pomocou finančnej pomoci vedcom vakcíny (laboratóriá, ...) sa urýchli vývoj vakcíny.", 2, measuresActualState.FinanceVaccineDevelopmentPrice + " (herná mena) | " + measuresActualState.FinanceVaccineDevelopmentPriceMedUnits + " (zdrav. jednotky)");
                        }}>
                        Finančná pomoc vedcom
                    </Button>
                    {showFinanceVaccineDevelopment ? <Results cislo={2}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button
                        disabled={(measuresActualState.DevelopmentProcessTree || measuresActualState.Step1Tree || measuresActualState.Step2Tree || measuresActualState.Step3Tree)}
                        className={classes.buttonSize}
                        color={buttonInternationalCooperationColor}
                        variant={measuresActualState.InternationalCooperation === 1 ? "contained" : "outlined"}
                        onClick={() => {
                            handleButtonClick("Pomocou medzinárodnej kooperácii sa urýchli vývoj vakcíny.", 3, measuresActualState.InternationalCooperationPrice + " (herná mena) | " + measuresActualState.InternationalCooperationPriceMedUnits + " (zdrav. jednotky)");
                        }}>
                        Medzinárodná kooperácia pri vývoji
                    </Button>
                    {showInternationalCooperation ? <Results cislo={3}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button
                        disabled={(measuresActualState.DevelopmentProcessTree || measuresActualState.Step1Tree || measuresActualState.Step2Tree || measuresActualState.Step3Tree || measuresActualState.FinanceVaccineDevelopmentTree || measuresActualState.InternationalCooperationTree)}
                        className={classes.buttonSize}
                        color={buttonSuperDevelopmentColor}
                        variant={"outlined"}
                        onClick={() => {
                            handleButtonClick("Super vývoj je možné aktivovať viackrát. Toto opatrenie sa dá aktivovať za zdratovnícke jednotky. Pomocou tejto aktivácie sa urýchli čas vývoja vakcíny o 25 dní.", 7, measuresActualState.SuperDevelopmentPriceMedUnits + " (zdrav. jednotky)");
                        }}>
                        Super vývoj
                    </Button>
                    {showSuperDevelopment ? <Results cislo={7}/> : null}
                </Grid>

            </Grid>
            <br/>
            <Grid>
                <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                        <LinearProgress variant="determinate"
                                        value={(measuresActualState.actualDevelopmentTime / (measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time) * 100)}/>
                    </Box>
                    <Box minWidth={35}>
                        {measuresActualState.ActivationVaccineDevelopment === 1 ?
                            <Typography variant="body2" color="textSecondary">{`${Math.round(
                                (measuresActualState.actualDevelopmentTime / (measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time) * 100),
                            )}%`}</Typography> : ''
                        }

                    </Box>
                </Box>
            </Grid>
            <Grid>
                {measuresActualState.ActivationVaccineDevelopment === 1 ?
                    "Vývoj potrvá približne: "
                    : ''}

                {measuresActualState.ActivationVaccineDevelopment === 1 ?
                    (measuresActualState.vaccineDevelopmentFinished === true) ? "Vakcína bola vynájdená" :
                        (
                            (((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime >= 366) ?
                                (Math.round((((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime) / 365) < 2 ? "1 rok" :
                                        Math.round((((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime) / 365) > 4 ? Math.round((((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime) / 365) + " rokov" :
                                            Math.round((((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime) / 365) + " roky"
                                )
                                : (((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime <= 10) ? "menej ako 10 dní" :
                                (((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime <= 20) ? "menej ako 20 dní" :
                                    (((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime <= 50) ? "menej ako 50 dní" :
                                        (((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime <= 100) ? "menej ako 100 dní" :
                                            (((measuresActualState.step1Time + measuresActualState.step2Time + measuresActualState.step3Time)) - measuresActualState.actualDevelopmentTime <= 200) ? "menej ako 200 dní" : "menej ako 1 rok"
                        )
                    : ''}


            </Grid>

            <br/>

        </DialogContent>
    );
}

export default Vaccine;
