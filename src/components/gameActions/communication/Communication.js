import React, {useState} from 'react';
import {
    Button, Card,
    DialogContent, Modal, Snackbar,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../../data/GameCurrencyState";
import Divider from "@material-ui/core/Divider";
import MuiAlert from "@material-ui/lab/Alert";
import {CommunicationState} from "./CommunicationState";

function Communication(props) {
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
    const [measuresActualState, setMeasuresActualState] = useRecoilState(CommunicationState);

    //herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //alert po aktivacii/deaktivacii--------------------
    //po uspesnom pokuse o aktivaciu
    const [openCommunicationSuccess, setOpenCommunicationSuccess] = React.useState(false);
    const handleOpenSuccess = () => {
        setOpenCommunicationSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCommunicationSuccess(false);
    };
    //po neuspensom pokuse o aktivaciu
    const [openCommunicationFailure, setOpenCommunicationFailure] = React.useState(false);
    const handleOpenFailure = () => {
        setOpenCommunicationFailure(true);
    };
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCommunicationFailure(false);
    };

    const [modalMessage, setModalMessage] = useState();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    //----------------------------------------------

    //stylovanie buttonov po klinuti
    const [buttonEducateCommunicateColor, setButtonEducateCommunicateColor] = useState("default");
    const [buttonGovernmentHelpsVulnerableColor, setButtonGovernmentHelpsVulnerableColor] = useState("default");
    const [buttonEmergencyStateColor, setButtonEmergencyStateColor] = useState("default");
    const [buttonCurfewColor, setButtonCurfewColor] = useState("default");
    const [buttonTravelWarningColor, setButtonTravelWarningColor] = useState("default");
    const [buttonExpertCommunicationColor, setButtonExpertCommunicationColor] = useState("default");
    const [buttonCrisisManagementColor, setButtonCrisisManagementColor] = useState("default");
    const [buttonSupplySecurityColor, setButtonSupplySecurityColor] = useState("default");
    const [buttonInternationalHelpColor, setButtonInternationalHelpColor] = useState("default");


    const [showEducateCommunicate, setShowEducateCommunicate] = React.useState(false);
    const [showGovernmentHelpsVulnerable, setShowGovernmentHelpsVulnerable] = React.useState(false);
    const [showEmergencyState, setShowEmergencyState] = React.useState(false);
    const [showCurfew, setShowCurfew] = React.useState(false);
    const [showTravelWarning, setShowTravelWarning] = React.useState(false);
    const [showExpertCommunication, setShowExpertCommunication] = React.useState(false);
    const [showCrisisManagement, setShowCrisisManagement] = React.useState(false);
    const [showSupplySecurity, setShowSupplySecurity] = React.useState(false);
    const [showInternationalHelp, setShowInternationalHelp] = React.useState(false);

    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        setText(textMessage);
        setPrice(buttonPrice);
        switch (buttonNumber) {
            case 1:
                setButtonEducateCommunicateColor("primary");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("default");

                setShowEducateCommunicate(true);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                break;
            case 2:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("primary");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(true);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                break;
            case 3:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("primary");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(true);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                break;
            case 4:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("primary");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(true);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                break;
            case 5:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("primary");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(true);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                break;
            case 6:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("primary");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(true);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                break;
            case 7:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("primary");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(true);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                break;
            case 8:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("primary");
                setButtonInternationalHelpColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(true);
                setShowInternationalHelp(false);
                break;
            case 9:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("primary");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(true);
                break;
            default:
                return null;
        }
    }
    //funckia pre navrat hodnot do resultu
    const renderSwitch = (param) => {
        switch (param) {
            case 1:
                return <div><Button onClick={handleActivationEducateCommunicate}>Aktivovať</Button><Button
                    onClick={handleDeactivationEducateCommunicate}>Deaktivovať</Button></div>
            case 2:
                return <div><Button onClick={handleActivationGovernmentHelpsVulnerable}>Aktivovať</Button><Button
                    onClick={handleDeactivationGovernmentHelpsVulnerable}>Deaktivovať</Button></div>
            case 3:
                return <div><Button onClick={handleActivationEmergencyState}>Aktivovať</Button><Button
                    onClick={handleDeactivationEmergencyState}>Deaktivovať</Button></div>
            case 4:
                return <div><Button onClick={handleActivationCurfew}>Aktivovať</Button><Button
                    onClick={handleDeactivationCurfew}>Deaktivovať</Button></div>
            case 5:
                return <div><Button onClick={handleActivationTravelWarning}>Aktivovať</Button><Button
                    onClick={handleDeactivationTravelWarning}>Deaktivovať</Button></div>
            case 6:
                return <div><Button onClick={handleActivationExpertCommunication}>Aktivovať</Button><Button
                    onClick={handleDeactivationExpertCommunication}>Deaktivovať</Button></div>
            case 7:
                return <div><Button onClick={handleActivationCrisisManagement}>Aktivovať</Button><Button
                    onClick={handleDeactivationCrisisManagement}>Deaktivovať</Button></div>
            case 8:
                return <div><Button onClick={handleActivationSupplySecurity}>Aktivovať</Button><Button
                    onClick={handleDeactivationSupplySecurity}>Deaktivovať</Button></div>
            case 9:
                return <div><Button onClick={handleActivationInternationalHelp}>Aktivovať</Button><Button
                    onClick={handleDeactivationInternationalHelp}>Deaktivovať</Button></div>
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
    const handleActivationEducateCommunicate = () => {
        if (measuresActualState.EducateCommunicatePrice <= gameCurrency) {
            if (measuresActualState.EducateCommunicate === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, EducateCommunicate: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.EducateCommunicatePrice));

                setModalMessage("Aktivoval si opatrenie - Vzdelávanie a komunikácia s verejnosťou.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationEducateCommunicate = () => {
        if (measuresActualState.EducateCommunicate === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, EducateCommunicate: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.EducateCommunicatePrice));

            setModalMessage("Deaktivoval si opatrenie - Vzdelávanie a komunikácia s verejnosťou.")
            handleOpenSuccess();
        }
    }

    const handleActivationGovernmentHelpsVulnerable = () => {
        if (measuresActualState.GovernmentHelpsVulnerablePrice <= gameCurrency) {
            if (measuresActualState.GovernmentHelpsVulnerable === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, GovernmentHelpsVulnerable: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.GovernmentHelpsVulnerablePrice));

                setModalMessage("Aktivoval si opatrenie - Vládna pomoc zranitelným.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationGovernmentHelpsVulnerable = () => {
        if (measuresActualState.GovernmentHelpsVulnerable === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, GovernmentHelpsVulnerable: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.GovernmentHelpsVulnerablePrice));

            setModalMessage("Deaktivoval si opatrenie - Vládna pomoc zranitelným.")
            handleOpenSuccess();
        }
    }

    const handleActivationEmergencyState = () => {
        if (measuresActualState.EmergencyStatePrice <= gameCurrency) {
            if (measuresActualState.EmergencyState === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, EmergencyState: 1, EmergencyStateActive: false};
                });
                setGameCurrency(prev => (prev - measuresActualState.EmergencyStatePrice));

                setModalMessage("Aktivoval si opatrenie - Vyhlásenie núdzového stavu.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationEmergencyState = () => {
        if (measuresActualState.EmergencyState === 1) {
            if (measuresActualState.Curfew === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, EmergencyState: 0, EmergencyStateActive: true};
                });
                setGameCurrency(prev => (prev + measuresActualState.EmergencyStatePrice));

                setModalMessage("Deaktivoval si opatrenie - Vyhlásenie núdzového stavu.")
                handleOpenSuccess();
            }else {
                setModalMessage("Nemôžeš deaktivovať toto opatrenie. Najprv deaktivuj nadväzujúce opatrenia.");
                handleOpenFailure();
            }
        }
    }

    const handleActivationCurfew = () => {
        if (measuresActualState.CurfewPrice <= gameCurrency) {
            if (measuresActualState.Curfew === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, Curfew: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.CurfewPrice));

                setModalMessage("Aktivoval si opatrenie - Zákaz vychádzania.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationCurfew = () => {
        if (measuresActualState.Curfew === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, Curfew: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.CurfewPrice));

            setModalMessage("Deaktivoval si opatrenie - Zákaz vychádzania.")
            handleOpenSuccess();
        }
    }

    const handleActivationTravelWarning = () => {
        if (measuresActualState.TravelWarningPrice <= gameCurrency) {
            if (measuresActualState.TravelWarning === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, TravelWarning: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.TravelWarningPrice));

                setModalMessage("Aktivoval si opatrenie - Cestovné výstrahy.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationTravelWarning = () => {
        if (measuresActualState.TravelWarning === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, TravelWarning: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.TravelWarningPrice));

            setModalMessage("Deaktivoval si opatrenie - Cestovné výstrahy.")
            handleOpenSuccess();
        }
    }

    const handleActivationExpertCommunication = () => {
        if (measuresActualState.ExpertCommunicationPrice <= gameCurrency) {
            if (measuresActualState.ExpertCommunication === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, ExpertCommunication: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.ExpertCommunicationPrice));

                setModalMessage("Aktivoval si opatrenie - Komunikácia so zdravoníckymi expertmi.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationExpertCommunication = () => {
        if (measuresActualState.ExpertCommunication === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, ExpertCommunication: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.ExpertCommunicationPrice));

            setModalMessage("Deaktivoval si opatrenie - Komunikácia so zdravoníckymi expertmi.")
            handleOpenSuccess();
        }
    }

    const handleActivationCrisisManagement = () => {
        if (measuresActualState.CrisisManagementPrice <= gameCurrency) {
            if (measuresActualState.CrisisManagement === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, CrisisManagement: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.CrisisManagementPrice));

                setModalMessage("Aktivoval si opatrenie - Plán krízového riadenia.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationCrisisManagement = () => {
        if (measuresActualState.CrisisManagement === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, CrisisManagement: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.CrisisManagementPrice));

            setModalMessage("Deaktivoval si opatrenie - Plán krízového riadenia.")
            handleOpenSuccess();
        }
    }

    const handleActivationSupplySecurity = () => {
        if (measuresActualState.SupplySecurityPrice <= gameCurrency) {
            if (measuresActualState.SupplySecurity === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, SupplySecurity: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.SupplySecurityPrice));

                setModalMessage("Aktivoval si opatrenie - Zaistenie bezpečnosti zásobovania.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationSupplySecurity = () => {
        if (measuresActualState.SupplySecurity === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, SupplySecurity: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.SupplySecurityPrice));

            setModalMessage("Deaktivoval si opatrenie - Zaistenie bezpečnosti zásobovania.")
            handleOpenSuccess();
        }
    }

    const handleActivationInternationalHelp = () => {
        if (measuresActualState.InternationalHelpPrice <= gameCurrency) {
            if (measuresActualState.InternationalHelp === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, InternationalHelp: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.InternationalHelpPrice));

                setModalMessage("Aktivoval si opatrenie - Medzinárodná pomoc.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationInternationalHelp = () => {
        if (measuresActualState.InternationalHelp === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, InternationalHelp: 0};
            });
            setGameCurrency(prev => (prev + measuresActualState.InternationalHelpPrice));

            setModalMessage("Deaktivoval si opatrenie - Medzinárodná pomoc.")
            handleOpenSuccess();
        }
    }
    //-----------------------------------------


    return (
        <DialogContent dividers>
            <Snackbar open={openCommunicationSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openCommunicationFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Typography gutterBottom>
                Aktiváciou týchto opatrení sa znižuje smrtnosť a šírenie nákazy.
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
                    <Button className={classes.buttonSize} color={buttonEducateCommunicateColor}
                            variant={measuresActualState.EducateCommunicate === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Aktívnou komunikáciou a vzdelávaním verejnosti o nákaze sa potenciálne znižuje šírenie nákazy a smrtnosť.", 1, measuresActualState.EducateCommunicatePrice);
                            }}>
                        Vzdelávanie a komunikácia s verejnosťou
                    </Button>
                    {showEducateCommunicate ? <Results cislo={1}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonGovernmentHelpsVulnerableColor}
                            variant={measuresActualState.GovernmentHelpsVulnerable === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vlády zasiahnutých krajín poskytnú pomoc (informovanosť, ...) zraniteľným občanom (dôchodcovia, zdravotne ťažko postihnutí, ...) čím sa potenciálne znižuje šírenie nákazy a smrtnosť.", 2, measuresActualState.GovernmentHelpsVulnerablePrice);
                            }}>
                        Vládna pomoc zranitelným
                    </Button>
                    {showGovernmentHelpsVulnerable ? <Results cislo={2}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonTravelWarningColor}
                            variant={measuresActualState.TravelWarning === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vlády zasiahnutých krajín dôkladne sledujú situáciu vo svete a vydávajú cestovné výstrahy a varovania, čím sa potenciálne znižuje šírenie nákazy.", 5, measuresActualState.TravelWarningPrice);
                            }}>
                        Cestovné výstrahy
                    </Button>
                    {showTravelWarning ? <Results cislo={5}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonExpertCommunicationColor}
                            variant={measuresActualState.ExpertCommunication === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Aktívnou komunikáciou a poradami so zdravotníckymi expertmi a vedcami sa potenciálne znižuje šírenie nákazy a smrtnosť.", 6, measuresActualState.ExpertCommunicationPrice);
                            }}>
                        Komunikácia so zdravoníckymi expertmi
                    </Button>
                    {showExpertCommunication ? <Results cislo={6}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonCrisisManagementColor}
                            variant={measuresActualState.CrisisManagement === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vytovrením plánu krízového riadenia (riešenie krízovej situácie v časových dimenziách, ...) sa potenciálne znižuje šírenie nákazy a smrtnosť.", 7, measuresActualState.CrisisManagementPrice);
                            }}>
                        Plán krízového riadenia
                    </Button>
                    {showCrisisManagement ? <Results cislo={7}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonSupplySecurityColor}
                            variant={measuresActualState.SupplySecurity === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zaistením bezpečnosti zásobovania (medické vybavenie, potraviny, ...) sa potenciálne znižuje šírenie nákazy a smrtnosť. Týmto opatrením sa taktiež získava dôvera obyvateľov.", 8, measuresActualState.SupplySecurityPrice);
                            }}>
                        Zaistenie bezpečnosti zásobovania
                    </Button>
                    {showSupplySecurity ? <Results cislo={8}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonInternationalHelpColor}
                            variant={measuresActualState.InternationalHelp === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zaistením medzinárodnej pomoci a kooperácie sa potenciálne znižuje šírenie nákazy a smrtnosť. Týmto opatrením sa taktiež získava dôvera obyvateľov.", 9, measuresActualState.InternationalHelpPrice);
                            }}>
                        Medzinárodná pomoc
                    </Button>
                    {showInternationalHelp ? <Results cislo={9}/> : null}
                </Grid>

            </Grid>

            <br/>
            <Divider/>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonEmergencyStateColor}
                            variant={measuresActualState.EmergencyState === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vlády zasiahnutých krajín dôsledkom pandémie vyhlásia núdzový stav (kvôli zásobovaniu, obmedzeniu pohybu, ...) čím sa potenciálne znižuje šírenie nákazy a smrtnosť.", 3, measuresActualState.EmergencyStatePrice);
                            }}>
                        Vyhlásenie núdzového stavu
                    </Button>
                    {showEmergencyState ? <Results cislo={3}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.EmergencyStateActive} className={classes.buttonSize}
                            color={buttonCurfewColor}
                            variant={measuresActualState.Curfew === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vlády zasiahnutých krajín dôsledkom pandémie vyhlásia zákaz vychádzania, čím sa potenciálne znižuje šírenie nákazy.", 4, measuresActualState.CurfewPrice);
                            }}>
                        Zákaz vychádzania
                    </Button>
                    {showCurfew ? <Results cislo={4}/> : null}
                </Grid>
            </Grid>

        </DialogContent>

    );
}

export default Communication;