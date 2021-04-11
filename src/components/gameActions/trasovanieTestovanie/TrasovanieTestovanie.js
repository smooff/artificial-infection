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
        }, buttonSize: {
            width: "260px",
            // height:"50px"
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
    const [buttonTestingColor, setButtonTestingColor] = useState("default");
    const [buttonAdvancedDetectionSystemColor, setButtonAdvancedDetectionSystemColor] = useState("default");
    const [buttonTestingCapacityEnhancementColor, setButtonTestingCapacityEnhancementColor] = useState("default");
    const [buttonTestingInformationColor, setButtonTestingInformationColor] = useState("default");
    const [buttonInfrastructureTestingColor, setButtonInfrastructureTestingColor] = useState("default");
    const [buttonBorderHealthCheckColor, setButtonBorderHealthCheckColor] = useState("default");
    const [buttonAirportHealthCheckColor, setButtonAirportHealthCheckColor] = useState("default");
    const [buttonSurveillanceColor, setButtonSurveillanceColor] = useState("default");
    const [buttonContactTracingColor, setButtonContactTracingColor] = useState("default");
    const [buttonAdvancedContactTracingColor, setButtonAdvancedContactTracingColor] = useState("default");

    const [showTesting, setShowTesting] = React.useState(false);
    const [showAdvancedDetectionSystem, setShowAdvancedDetectionSystem] = React.useState(false);
    const [showTestingCapacityEnhancement, setShowTestingCapacityEnhancement] = React.useState(false);
    const [showTestingInformation, setShowTestingInformation] = React.useState(false);
    const [showInfrastructureTesting, setShowInfrastructureTesting] = React.useState(false);
    const [showBorderHealthCheck, setShowBorderHealthCheck] = React.useState(false);
    const [showAirportHealthCheck, setShowAirportHealthCheck] = React.useState(false);
    const [showSurveillance, setShowSurveillance] = React.useState(false);
    const [showContactTracing, setShowContactTracing] = React.useState(false);
    const [showAdvancedContactTracing, setShowAdvancedContactTracing] = React.useState(false);

    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        setText(textMessage);
        setPrice(buttonPrice);
        switch (buttonNumber) {
            case 1:
                setButtonTestingColor("primary");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(true);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(false);
                setShowSurveillance(false);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(false);
                break;
            case 2:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("primary");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(true);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(false);
                setShowSurveillance(false);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(false);
                break;
            case 3:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("primary");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(true);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(false);
                setShowSurveillance(false);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(false);
                break;
            case 4:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("primary");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(true);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(false);
                setShowSurveillance(false);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(false);
                break;
            case 5:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("primary");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(true);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(false);
                setShowSurveillance(false);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(false);
                break;
            case 6:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("primary");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(true);
                setShowAirportHealthCheck(false);
                setShowSurveillance(false);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(false);
                break;
            case 7:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("primary");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(true);
                setShowSurveillance(false);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(false);
                break;
            case 8:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("primary");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(false);
                setShowSurveillance(true);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(false);
                break;
            case 9:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("primary");
                setButtonAdvancedContactTracingColor("default");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(false);
                setShowSurveillance(false);
                setShowContactTracing(true);
                setShowAdvancedContactTracing(false);
                break;
            case 10:
                setButtonTestingColor("default");
                setButtonAdvancedDetectionSystemColor("default");
                setButtonTestingCapacityEnhancementColor("default");
                setButtonTestingInformationColor("default");
                setButtonInfrastructureTestingColor("default");
                setButtonBorderHealthCheckColor("default");
                setButtonAirportHealthCheckColor("default");
                setButtonSurveillanceColor("default");
                setButtonContactTracingColor("default");
                setButtonAdvancedContactTracingColor("primary");

                setShowTesting(false);
                setShowAdvancedDetectionSystem(false);
                setShowTestingCapacityEnhancement(false);
                setShowTestingInformation(false);
                setShowInfrastructureTesting(false);
                setShowBorderHealthCheck(false);
                setShowAirportHealthCheck(false);
                setShowSurveillance(false);
                setShowContactTracing(false);
                setShowAdvancedContactTracing(true);
                break;
            default:
                return null;
        }
    }
    //funckia pre navrat hodnot do resultu
    const renderSwitch = (param) => {
        switch (param) {
            case 1:
                return <div><Button onClick={handleActivationTesting}>Aktivovať</Button><Button
                    onClick={handleDeactivationTesting}>Deaktivovať</Button></div>;
            case 2:
                return <div><Button onClick={handleActivationAdvancedDetectionSystem}>Aktivovať</Button><Button
                    onClick={handleDeactivationAdvancedDetectionSystem}>Deaktivovať</Button></div>
            case 3:
                return <div><Button onClick={handleActivationTestingCapacityEnhancement}>Aktivovať</Button><Button
                    onClick={handleDeactivationTestingCapacityEnhancement}>Deaktivovať</Button></div>
            case 4:
                return <div><Button onClick={handleActivationTestingInformation}>Aktivovať</Button><Button
                    onClick={handleDeactivationTestingInformation}>Deaktivovať</Button></div>
            case 5:
                return <div><Button onClick={handleActivationInfrastructureTesting}>Aktivovať</Button><Button
                    onClick={handleDeactivationInfrastructureTesting}>Deaktivovať</Button></div>
            case 6:
                return <div><Button onClick={handleActivationBorderHealthCheck}>Aktivovať</Button><Button
                    onClick={handleDeactivationBorderHealthCheckg}>Deaktivovať</Button></div>
            case 7:
                return <div><Button onClick={handleActivationAirportHealthCheck}>Aktivovať</Button><Button
                    onClick={handleDeactivationAirportHealthCheck}>Deaktivovať</Button></div>
            case 8:
                return <div><Button onClick={handleActivationSurveillance}>Aktivovať</Button><Button
                    onClick={handleDeactivationSurveillance}>Deaktivovať</Button></div>
            case 9:
                return <div><Button onClick={handleActivationContactTracing}>Aktivovať</Button><Button
                    onClick={handleDeactivationContactTracing}>Deaktivovať</Button></div>
            case 10:
                return <div><Button onClick={handleActivationAdvancedContactTracing}>Aktivovať</Button><Button
                    onClick={handleDeactivationAdvancedContactTracing}>Deaktivovať</Button></div>
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
    const handleActivationTesting = () => {
        if (measuresActualState.TestingPrice <= gameCurrency) {
            if (measuresActualState.Testing !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, Testing: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.TestingPrice));

                setModalMessage("Aktivoval si opatrenie - Testovanie.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationTesting = () => {
        if (measuresActualState.Testing === 1) {
            if (measuresActualState.AdvancedDetectionSystem === 0 && measuresActualState.TestingCapacityEnhancement === 0 && measuresActualState.InfrastructureTesting === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, Testing: 0};
                });
                setGameCurrency(prev => (prev + measuresActualState.TestingPrice));

                setModalMessage("Deaktivoval si opatrenie - Testovanie.")
                handleOpenSuccess();
            } else {
                setModalMessage("Nemôžeš deaktivovať toto opatrenie. Najprv deaktivuj nadväzujúce opatrenia.");
                handleOpenFailure();
            }

        }
    }
    const handleActivationAdvancedDetectionSystem = () => {
        if (measuresActualState.AdvancedDetectionSystemPrice <= gameCurrency) {
            if (measuresActualState.AdvancedDetectionSystem !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, AdvancedDetectionSystem: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.AdvancedDetectionSystemPrice));

                setModalMessage("Aktivoval si opatrenie - Vylepšenie systému detekcie.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationAdvancedDetectionSystem = () => {
        if (measuresActualState.AdvancedDetectionSystem === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, AdvancedDetectionSystem: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.AdvancedDetectionSystemPrice));

            setModalMessage("Deaktivoval si opatrenie - Vylepšenie systému detekcie.")
            handleOpenSuccess();
        }

    }

    const handleActivationTestingCapacityEnhancement = () => {
        if (measuresActualState.TestingCapacityEnhancementPrice <= gameCurrency) {
            if (measuresActualState.TestingCapacityEnhancement !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, TestingCapacityEnhancement: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.TestingCapacityEnhancementPrice));

                setModalMessage("Aktivoval si opatrenie - Vylepšenie testovacej kapacity laboratórií.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationTestingCapacityEnhancement = () => {
        if (measuresActualState.TestingCapacityEnhancement === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, TestingCapacityEnhancement: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.TestingCapacityEnhancementPrice));

            setModalMessage("Deaktivoval si opatrenie - Vylepšenie testovacej kapacity laboratórií.")
            handleOpenSuccess();
        }

    }

    const handleActivationTestingInformation = () => {
        if (measuresActualState.TestingInformationPrice <= gameCurrency) {
            if (measuresActualState.TestingInformation !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, TestingInformation: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.TestingInformationPrice));

                setModalMessage("Aktivoval si opatrenie - Informácie o stave v krajine.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationTestingInformation = () => {
        if (measuresActualState.TestingInformation === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, TestingInformation: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.TestingInformationPrice));

            setModalMessage("Deaktivoval si opatrenie - Informácie o stave v krajine.")
            handleOpenSuccess();
        }

    }

    const handleActivationInfrastructureTesting = () => {
        if (measuresActualState.InfrastructureTestingPrice <= gameCurrency) {
            if (measuresActualState.InfrastructureTesting !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, InfrastructureTesting: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.InfrastructureTestingPrice));

                setModalMessage("Aktivoval si opatrenie - Testovanie kľúčovej infraštruktúry.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationInfrastructureTesting = () => {
        if (measuresActualState.InfrastructureTesting === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, InfrastructureTesting: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.InfrastructureTestingPrice));

            setModalMessage("Deaktivoval si opatrenie - Testovanie kľúčovej infraštruktúry.")
            handleOpenSuccess();
        }

    }

    const handleActivationBorderHealthCheck = () => {
        if (measuresActualState.BorderHealthCheckPrice <= gameCurrency) {
            if (measuresActualState.BorderHealthCheck !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, BorderHealthCheck: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.BorderHealthCheckPrice));

                setModalMessage("Aktivoval si opatrenie - Zdravotná kontrola na hraniciach.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationBorderHealthCheckg = () => {
        if (measuresActualState.BorderHealthCheck === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, BorderHealthCheck: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.BorderHealthCheckPrice));

            setModalMessage("Deaktivoval si opatrenie - Zdravotná kontrola na hraniciach.")
            handleOpenSuccess();
        }

    }

    const handleActivationAirportHealthCheck = () => {
        if (measuresActualState.AirportHealthCheckPrice <= gameCurrency) {
            if (measuresActualState.AirportHealthCheck !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, AirportHealthCheck: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.AirportHealthCheckPrice));

                setModalMessage("Aktivoval si opatrenie - Zdravotná kontrola na letiskách.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationAirportHealthCheck = () => {
        if (measuresActualState.AirportHealthCheck === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, AirportHealthCheck: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.AirportHealthCheckPrice));

            setModalMessage("Deaktivoval si opatrenie - Zdravotná kontrola na letiskách.")
            handleOpenSuccess();
        }

    }

    const handleActivationSurveillance = () => {
        if (measuresActualState.SurveillancePrice <= gameCurrency) {
            if (measuresActualState.Surveillance !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, Surveillance: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.SurveillancePrice));

                setModalMessage("Aktivoval si opatrenie - Dohľad nad opatreniami.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationSurveillance = () => {
        if (measuresActualState.Surveillance === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, Surveillance: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.SurveillancePrice));

            setModalMessage("Deaktivoval si opatrenie - Dohľad nad opatreniami.")
            handleOpenSuccess();
        }
    }

    const handleActivationContactTracing = () => {
        if (measuresActualState.ContactTracingPrice <= gameCurrency) {
            if (measuresActualState.ContactTracing !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, ContactTracing: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.ContactTracingPrice));

                setModalMessage("Aktivoval si opatrenie - Dohľadávanie kontaktov.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationContactTracing = () => {
        if (measuresActualState.ContactTracing === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, ContactTracing: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.ContactTracingPrice));

            setModalMessage("Deaktivoval si opatrenie - Dohľadávanie kontaktov.")
            handleOpenSuccess();
        }

    }
    const handleActivationAdvancedContactTracing = () => {
        if (measuresActualState.AdvancedContactTracingPrice <= gameCurrency) {
            if (measuresActualState.AdvancedContactTracing !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, AdvancedContactTracing: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.AdvancedContactTracingPrice));

                setModalMessage("Aktivoval si opatrenie - Vylepšené dohľadávanie kontaktov.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationAdvancedContactTracing = () => {
        if (measuresActualState.AdvancedContactTracing === 1) {
            setMeasuresActualState((prevStats) => {
                return {...prevStats, AdvancedContactTracing: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.AdvancedContactTracingPrice));

            setModalMessage("Deaktivoval si opatrenie - Vylepšené dohľadávanie kontaktov.")
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
                    {modalMessage}
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
                    <Button className={classes.buttonSize} color={buttonTestingColor}
                            variant={measuresActualState.Testing === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Pomocou testovania sa odhalia infekční jedinci, čo má za následok potenciálne zníženie presnosu.", 1, measuresActualState.TestingPrice);
                            }}>
                        Testovanie
                    </Button>
                    {showTesting ? <Results cislo={1}/> : null}
                </Grid>

                {measuresActualState.Testing === 1 ?
                    <Grid item xs={12} className={classes.actionButtons}>
                        <Button className={classes.buttonSize} color={buttonAdvancedDetectionSystemColor}
                                variant={measuresActualState.AdvancedDetectionSystem === 1 ? "contained" : "outlined"}
                                onClick={() => {
                                    handleButtonClick("Vylepšením systému detekcie (testovania) sa zdokonalí odhalovanie infekčných jedincov, čo má za následok potenciálne zníženie presnosu.", 2, measuresActualState.AdvancedDetectionSystemPrice);
                                }}>
                            Vylepšenie systému detekcie
                        </Button>
                        {showAdvancedDetectionSystem ? <Results cislo={2}/> : null}
                    </Grid>
                    : null}

                {measuresActualState.Testing === 1 ?
                    <Grid item xs={12} className={classes.actionButtons}>
                        <Button className={classes.buttonSize} color={buttonTestingCapacityEnhancementColor}
                                variant={measuresActualState.TestingCapacityEnhancement === 1 ? "contained" : "outlined"}
                                onClick={() => {
                                    handleButtonClick("Vylepšením kapacity laboratórií sa zvýši počet testovanej jedincov, čo má za následok potenciálne zníženie presnosu.", 3, measuresActualState.TestingCapacityEnhancementPrice);
                                }}>
                            Vylepšenie testovacej kapacity laboratórií
                        </Button>
                        {showTestingCapacityEnhancement ? <Results cislo={3}/> : null}
                    </Grid>
                    : null}

                {measuresActualState.Testing === 1 ?
                    <Grid item xs={12} className={classes.actionButtons}>
                        <Button className={classes.buttonSize} color={buttonInfrastructureTestingColor}
                                variant={measuresActualState.InfrastructureTesting === 1 ? "contained" : "outlined"}
                                onClick={() => {
                                    handleButtonClick("Testovanie kľúčovej infraštruktúry napomôže zvýšeniu stability v silne postihnuutej krajine.", 5, measuresActualState.InfrastructureTestingPrice);
                                }}>
                            Testovanie kľúčovej infraštruktúry
                        </Button>
                        {showInfrastructureTesting ? <Results cislo={5}/> : null}
                    </Grid>
                    : null}

            </Grid>

            <br/>
            <Divider/>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonTestingInformationColor}
                            variant={measuresActualState.TestingInformation === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Informovaním verejnosti o aktuálnej situácii (počet aktívnych prípadov a úmrtí) môže upovedomiť o vážnosti situácie v krajine, čo má za následok potenciálne zníženie presnosu.", 4, measuresActualState.TestingInformationPrice);
                            }}>
                        Informácie o stave v krajine
                    </Button>
                    {showTestingInformation ? <Results cislo={4}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonBorderHealthCheckColor}
                            variant={measuresActualState.BorderHealthCheck === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zavedenie zdravotnej kontroly na hraniciach môže potenciálne znížiť presnos nákazy.", 6, measuresActualState.BorderHealthCheckPrice);
                            }}>
                        Zdravotná kontrola na hraniciach
                    </Button>
                    {showBorderHealthCheck ? <Results cislo={6}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonAirportHealthCheckColor}
                            variant={measuresActualState.AirportHealthCheck === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zavedenie zdravotnej kontroly na letiskách môže potenciálne znížiť presnos nákazy.", 7, measuresActualState.AirportHealthCheckPrice);
                            }}>
                        Zdravotná kontrola na letiskách
                    </Button>
                    {showAirportHealthCheck ? <Results cislo={7}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonSurveillanceColor}
                            variant={measuresActualState.Surveillance === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Dohľadom na dodržiavanie opatrení sa môže potenciálne znížiť presnos nákazy.", 8, measuresActualState.SurveillancePrice);
                            }}>
                        Dohľad nad opatreniami
                    </Button>
                    {showSurveillance ? <Results cislo={8}/> : null}
                </Grid>
            </Grid>

            <br/>
            <Divider/>
            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonContactTracingColor}
                            variant={measuresActualState.ContactTracing === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Dohľadávaním kontaktov sa môže potenciálne znížiť presnos nákazy.", 9, measuresActualState.ContactTracingPrice);
                            }}>
                        Dohľadávanie kontaktov
                    </Button>
                    {showContactTracing ? <Results cislo={9}/> : null}
                </Grid>

                {measuresActualState.ContactTracing === 1 ?
                    <Grid item xs={12} className={classes.actionButtons}>
                        <Button className={classes.buttonSize} color={buttonAdvancedContactTracingColor}
                                variant={measuresActualState.AdvancedContactTracing === 1 ? "contained" : "outlined"}
                                onClick={() => {
                                    handleButtonClick("Dohľadávaním kontaktov sa vylepší a môže potenciálne ešte znížiť presnos nákazy.", 10, measuresActualState.AdvancedContactTracingPrice);
                                }}>
                            Vylepšené dohľadávanie kontaktov
                        </Button>
                        {showAdvancedContactTracing ? <Results cislo={10}/> : null}
                    </Grid>
                    : null}

            </Grid>

        </DialogContent>

    );
}

export default TrasovanieTestovanie;