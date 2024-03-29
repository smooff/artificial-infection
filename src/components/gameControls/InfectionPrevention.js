import React, {useState} from 'react';
import {Button, DialogContent, Snackbar,} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../data/currencies/GameCurrencyState";
import Divider from "@material-ui/core/Divider";
import MuiAlert from "@material-ui/lab/Alert";
import {InfectionPreventionState} from "../../data/gameControls/InfectionPreventionState";
import {BetaState} from "../../data/parameters/BetaState";
import {DeltaState} from "../../data/parameters/DeltaState";
import PriceInfoSingleMeasurement from "./PriceInfoSingleMeasurement";

function InfectionPrevention() {
    const useStyles = makeStyles(() => ({
        activationButtons: {
            textAlign: "center",
            marginTop: "6px",
        },
        actionButtons: {
            textAlign: "center",
            marginTop: "10px",
        }, buttonSize: {
            width: "260px",
        }
    }));
    const classes = useStyles();

    //sprava pre jednotlive opatrenie
    const [text, setText] = useState("pre zobrazenie popisu klikni na opatrenie");
    const [price, setPrice] = useState("pre zobrazenie ceny klikni na opatrenie");

    //data s opatreniami
    const [measuresActualState, setMeasuresActualState] = useRecoilState(InfectionPreventionState);

    //herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //beta parameter
    const [, setBetaParameter] = useRecoilState(BetaState);
    //delta parameter
    const [, setDeltaParameter] = useRecoilState(DeltaState);

    //alert po aktivacii/deaktivacii--------------------
    //po uspesnom pokuse o aktivaciu
    const [openInfectionPreventionSuccess, setOpenInfectionPreventionSuccess] = React.useState(false);
    const handleOpenSuccess = () => {
        setOpenInfectionPreventionSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenInfectionPreventionSuccess(false);
    };
    //po neuspensom pokuse o aktivaciu
    const [openInfectionPreventionFailure, setOpenInfectionPreventionFailure] = React.useState(false);
    const handleOpenFailure = () => {
        setOpenInfectionPreventionFailure(true);
    };
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenInfectionPreventionFailure(false);
    };

    const [modalMessage, setModalMessage] = useState();

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    //----------------------------------------------

    //stylovanie buttonov po klinuti
    const [buttonEnvironmentDisinfectionColor, setButtonEnvironmentDisinfectionColor] = useState("default");
    const [buttonPPEColor, setButtonPPEColor] = useState("default");
    const [buttonInfectiousIsolationColor, setButtonInfectiousIsolationColor] = useState("default");
    const [buttonQuarantineColor, setButtonQuarantineColor] = useState("default");
    const [buttonQuarantineFacilitiesColor, setButtonQuarantineFacilitiesColor] = useState("default");
    const [buttonArmyHelpColor, setButtonArmyHelpColor] = useState("default");
    const [buttonSpecialEstablishmentsColor, setButtonSpecialEstablishmentsColor] = useState("default");
    const [buttonSpecialPopulationColor, setButtonSpecialPopulationColor] = useState("default");
    const [buttonSocialDistancingColor, setButtonSocialDistancingColor] = useState("default");
    const [buttonMassGatheringColor, setButtonMassGatheringColor] = useState("default");
    const [buttonSmallGatheringColor, setButtonSmallGatheringColor] = useState("default");
    const [buttonEducationalInstitutionsColor, setButtonEducationalInstitutionsColor] = useState("default");
    const [buttonSafetyProtocolsColor, setButtonSafetyProtocolsColor] = useState("default");
    const [buttonSurveillanceColor, setButtonSurveillanceColor] = useState("default");

    const [showEnvironmentDisinfection, setShowEnvironmentDisinfection] = React.useState(false);
    const [showPPE, setShowPPE] = React.useState(false);
    const [showInfectiousIsolation, setShowInfectiousIsolation] = React.useState(false);
    const [showQuarantine, setShowQuarantine] = React.useState(false);
    const [showQuarantineFacilities, setShowQuarantineFacilities] = React.useState(false);
    const [showArmyHelp, setShowArmyHelp] = React.useState(false);
    const [showSpecialEstablishments, setShowSpecialEstablishments] = React.useState(false);
    const [showSpecialPopulation, setShowSpecialPopulation] = React.useState(false);
    const [showSocialDistancing, setShowSocialDistancing] = React.useState(false);
    const [showMassGathering, setShowMassGathering] = React.useState(false);
    const [showSmallGathering, setShowSmallGathering] = React.useState(false);
    const [showEducationalInstitutions, setShowEducationalInstitutions] = React.useState(false);
    const [showSafetyProtocols, setShowSafetyProtocols] = React.useState(false);
    const [showSurveillance, setShowSurveillance] = React.useState(false);


    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        setText(textMessage);
        setPrice(buttonPrice);
        switch (buttonNumber) {
            case 1:
                setButtonEnvironmentDisinfectionColor("primary");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(true);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 2:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("primary");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(true);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 3:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("primary");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(true);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 4:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("primary");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(true);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 5:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("primary");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(true);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 6:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("primary");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(true);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 7:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("primary");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(true);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 8:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("primary");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(true);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 9:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("primary");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(true);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 10:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("primary");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(true);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 11:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("primary");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(true);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 12:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("primary");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(true);
                setShowSafetyProtocols(false);
                setShowSurveillance(false);
                break;
            case 13:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("primary");
                setButtonSurveillanceColor("default");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(true);
                setShowSurveillance(false);
                break;
            case 14:
                setButtonEnvironmentDisinfectionColor("default");
                setButtonPPEColor("default");
                setButtonInfectiousIsolationColor("default");
                setButtonQuarantineColor("default");
                setButtonQuarantineFacilitiesColor("default");
                setButtonArmyHelpColor("default");
                setButtonSpecialEstablishmentsColor("default");
                setButtonSpecialPopulationColor("default");
                setButtonSocialDistancingColor("default");
                setButtonMassGatheringColor("default");
                setButtonSmallGatheringColor("default");
                setButtonEducationalInstitutionsColor("default");
                setButtonSafetyProtocolsColor("default");
                setButtonSurveillanceColor("primary");

                setShowEnvironmentDisinfection(false);
                setShowPPE(false);
                setShowInfectiousIsolation(false);
                setShowQuarantine(false);
                setShowQuarantineFacilities(false);
                setShowArmyHelp(false);
                setShowSpecialEstablishments(false);
                setShowSpecialPopulation(false);
                setShowSocialDistancing(false);
                setShowMassGathering(false);
                setShowSmallGathering(false);
                setShowEducationalInstitutions(false);
                setShowSafetyProtocols(false);
                setShowSurveillance(true);
                break;
            default:
                return null;
        }
    }
    //funckia pre navrat hodnot do resultu
    const renderSwitch = (param) => {
        switch (param) {
            case 1:
                return <div><Button onClick={handleActivationEnvironmentDisinfection}>Aktivovať</Button><Button
                    onClick={handleDeactivationEnvironmentDisinfection}>Deaktivovať</Button></div>
            case 2:
                return <div><Button onClick={handleActivationPPE}>Aktivovať</Button><Button
                    onClick={handleDeactivationPPE}>Deaktivovať</Button></div>
            case 3:
                return <div><Button onClick={handleActivationIsolation}>Aktivovať</Button><Button
                    onClick={handleDeactivationIsolation}>Deaktivovať</Button></div>
            case 4:
                return <div><Button onClick={handleActivationQuarantine}>Aktivovať</Button><Button
                    onClick={handleDeactivationQuarantine}>Deaktivovať</Button></div>
            case 5:
                return <div><Button onClick={handleActivationQuarantineFacilities}>Aktivovať</Button><Button
                    onClick={handleDeactivationQuarantineFacilities}>Deaktivovať</Button></div>
            case 6:
                return <div><Button onClick={handleActivationArmyHelp}>Aktivovať</Button><Button
                    onClick={handleDeactivationArmyHelp}>Deaktivovať</Button></div>
            case 7:
                return <div><Button onClick={handleActivationSpecialEstablishments}>Aktivovať</Button><Button
                    onClick={handleDeactivationSpecialEstablishments}>Deaktivovať</Button></div>
            case 8:
                return <div><Button onClick={handleActivationSpecialPopulation}>Aktivovať</Button><Button
                    onClick={handleDeactivationSpecialPopulation}>Deaktivovať</Button></div>
            case 9:
                return <div><Button onClick={handleActivationSocialDistancing}>Aktivovať</Button><Button
                    onClick={handleDeactivationSocialDistancing}>Deaktivovať</Button></div>
            case 10:
                return <div><Button onClick={handleActivationMassGathering}>Aktivovať</Button><Button
                    onClick={handleDeactivationMassGathering}>Deaktivovať</Button></div>
            case 11:
                return <div><Button onClick={handleActivationSmallGathering}>Aktivovať</Button><Button
                    onClick={handleDeactivationSmallGathering}>Deaktivovať</Button></div>
            case 12:
                return <div><Button onClick={handleActivationEducationalInstitutions}>Aktivovať</Button><Button
                    onClick={handleDeactivationEducationalInstitutions}>Deaktivovať</Button></div>
            case 13:
                return <div><Button onClick={handleActivationSafetyProtocols}>Aktivovať</Button><Button
                    onClick={handleDeactivationSafetyProtocols}>Deaktivovať</Button></div>
            case 14:
                return <div><Button onClick={handleActivationSurveillance}>Aktivovať</Button><Button
                    onClick={handleDeactivationSurveillance}>Deaktivovať</Button></div>
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
    const handleActivationEnvironmentDisinfection = () => {
        if (measuresActualState.EnvironmentDisinfectionPrice <= gameCurrency) {
            if (measuresActualState.EnvironmentDisinfection === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, EnvironmentDisinfection: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.EnvironmentDisinfectionPrice));
                setBetaParameter(prev => (prev - measuresActualState.EnvironmentDisinfectionBeta));
                setModalMessage("Aktivoval si opatrenie - Čistenie a dezinfekcia prostredia.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationEnvironmentDisinfection = () => {
        if (measuresActualState.EnvironmentDisinfection === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, EnvironmentDisinfection: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.EnvironmentDisinfectionPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.EnvironmentDisinfectionBeta));
            setModalMessage("Deaktivoval si opatrenie - Čistenie a dezinfekcia prostredia.")
            handleOpenSuccess();
        }
    }

    const handleActivationPPE = () => {
        if (measuresActualState.PPEPrice <= gameCurrency) {
            if (measuresActualState.PPE === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, PPE: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.PPEPrice));
                setBetaParameter(prev => (prev - measuresActualState.PPEBeta));
                setModalMessage("Aktivoval si opatrenie - Osobné ochranné prostriedky.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationPPE = () => {
        if (measuresActualState.PPE === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, PPE: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.PPEPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.PPEBeta));
            setModalMessage("Deaktivoval si opatrenie - Osobné ochranné prostriedky.")
            handleOpenSuccess();
        }
    }

    const handleActivationIsolation = () => {
        if (measuresActualState.InfectiousIsolationPrice <= gameCurrency) {
            if (measuresActualState.InfectiousIsolation === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, InfectiousIsolation: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.InfectiousIsolationPrice));
                setBetaParameter(prev => (prev - measuresActualState.InfectiousIsolationBeta));
                setModalMessage("Aktivoval si opatrenie - Izolácia nakazených.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationIsolation = () => {
        if (measuresActualState.InfectiousIsolation === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, InfectiousIsolation: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.InfectiousIsolationPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.InfectiousIsolationBeta));
            setModalMessage("Deaktivoval si opatrenie - Izolácia nakazených.")
            handleOpenSuccess();
        }
    }

    const handleActivationQuarantine = () => {
        if (measuresActualState.QuarantinePrice <= gameCurrency) {
            if (measuresActualState.Quarantine === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, Quarantine: 1, quarantineState: false};
                });
                setGameCurrency(prev => (prev - measuresActualState.QuarantinePrice));
                setBetaParameter(prev => (prev - measuresActualState.QuarantineBeta));
                setModalMessage("Aktivoval si opatrenie - Karanténa.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationQuarantine = () => {
        if (measuresActualState.Quarantine === 1) {
            if (measuresActualState.QuarantineFacilities === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, Quarantine: 0, quarantineState: true};
                });
                setGameCurrency(prev => (prev + Math.round(measuresActualState.QuarantinePrice / 2)));
                setBetaParameter(prev => (prev + measuresActualState.QuarantineBeta));
                setModalMessage("Deaktivoval si opatrenie - Karanténa.")
                handleOpenSuccess();
            } else {
                setModalMessage("Nemôžeš deaktivovať toto opatrenie. Najprv deaktivuj nadväzujúce opatrenia.");
                handleOpenFailure();
            }
        }
    }

    const handleActivationQuarantineFacilities = () => {
        if (measuresActualState.QuarantineFacilitiesPrice <= gameCurrency) {
            if (measuresActualState.QuarantineFacilities === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, QuarantineFacilities: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.QuarantineFacilitiesPrice));
                setBetaParameter(prev => (prev - measuresActualState.QuarantineFacilitiesBeta));
                setModalMessage("Aktivoval si opatrenie - Karanténne zariadenia.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationQuarantineFacilities = () => {
        if (measuresActualState.QuarantineFacilities === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, QuarantineFacilities: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.QuarantineFacilitiesPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.QuarantineFacilitiesBeta));
            setModalMessage("Deaktivoval si opatrenie - Karanténne zariadenia.")
            handleOpenSuccess();
        }
    }

    const handleActivationArmyHelp = () => {
        if (measuresActualState.ArmyHelpPrice <= gameCurrency) {
            if (measuresActualState.ArmyHelp === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, ArmyHelp: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.ArmyHelpPrice));
                setBetaParameter(prev => (prev - measuresActualState.ArmyHelpBeta));
                setDeltaParameter(prev => (prev - measuresActualState.ArmyHelpDelta));
                setModalMessage("Aktivoval si opatrenie - Zapojenie polície a armády.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationArmyHelp = () => {
        if (measuresActualState.ArmyHelp === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, ArmyHelp: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.ArmyHelpPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.ArmyHelpBeta));
            setDeltaParameter(prev => (prev + measuresActualState.ArmyHelpDelta));
            setModalMessage("Deaktivoval si opatrenie - Zapojenie polície a armády.")
            handleOpenSuccess();
        }
    }

    const handleActivationSpecialEstablishments = () => {
        if (measuresActualState.SpecialEstablishmentsPrice <= gameCurrency) {
            if (measuresActualState.SpecialEstablishments === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, SpecialEstablishments: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.SpecialEstablishmentsPrice));
                setBetaParameter(prev => (prev - measuresActualState.SpecialEstablishmentsBeta));
                setDeltaParameter(prev => (prev - measuresActualState.SpecialEstablishmentsDelta));
                setModalMessage("Aktivoval si opatrenie - Opatrenia pre špeciálne zariadenia.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationSpecialEstablishments = () => {
        if (measuresActualState.SpecialEstablishments === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, SpecialEstablishments: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.SpecialEstablishmentsPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.SpecialEstablishmentsBeta));
            setDeltaParameter(prev => (prev + measuresActualState.SpecialEstablishmentsDelta));
            setModalMessage("Deaktivoval si opatrenie - Opatrenia pre špeciálne zariadenia.")
            handleOpenSuccess();
        }
    }

    const handleActivationSpecialPopulation = () => {
        if (measuresActualState.SpecialPopulationPrice <= gameCurrency) {
            if (measuresActualState.SpecialPopulation === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, SpecialPopulation: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.SpecialPopulationPrice));
                setBetaParameter(prev => (prev - measuresActualState.SpecialPopulationBeta));
                setDeltaParameter(prev => (prev - measuresActualState.SpecialPopulationDelta));
                setModalMessage("Aktivoval si opatrenie - Opatrenia pre osobinté skupiny.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationSpecialPopulation = () => {
        if (measuresActualState.SpecialPopulation === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, SpecialPopulation: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.SpecialPopulationPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.SpecialPopulationBeta));
            setDeltaParameter(prev => (prev + measuresActualState.SpecialPopulationDelta));
            setModalMessage("Deaktivoval si opatrenie - Opatrenia pre osobinté skupiny.")
            handleOpenSuccess();
        }
    }

    const handleActivationSocialDistancing = () => {
        if (measuresActualState.SocialDistancingPrice <= gameCurrency) {
            if (measuresActualState.SocialDistancing === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, SocialDistancing: 1, socialDistancingState: false};
                });
                setGameCurrency(prev => (prev - measuresActualState.SocialDistancingPrice));

                setModalMessage("Aktivoval si opatrenie - Sociálny odstup.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationSocialDistancing = () => {
        if (measuresActualState.SocialDistancing === 1) {
            if (measuresActualState.MassGathering === 0 && measuresActualState.SmallGathering === 0 && measuresActualState.EducationalInstitutions === 0) {

                setMeasuresActualState((prevStats) => {
                    return {...prevStats, SocialDistancing: 0, socialDistancingState: true};
                });
                setGameCurrency(prev => (prev + Math.round(measuresActualState.SocialDistancingPrice / 2)));

                setModalMessage("Deaktivoval si opatrenie - Sociálny odstup.")
                handleOpenSuccess();
            } else {
                setModalMessage("Nemôžeš deaktivovať toto opatrenie. Najprv deaktivuj nadväzujúce opatrenia.");
                handleOpenFailure();
            }
        }
    }

    const handleActivationMassGathering = () => {
        if (measuresActualState.MassGatheringPrice <= gameCurrency) {
            if (measuresActualState.MassGathering === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, MassGathering: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.MassGatheringPrice));
                setBetaParameter(prev => (prev - measuresActualState.MassGatheringBeta));
                setModalMessage("Aktivoval si opatrenie - Zrušenie hromadných podujatí.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationMassGathering = () => {
        if (measuresActualState.MassGathering === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, MassGathering: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.MassGatheringPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.MassGatheringBeta));
            setModalMessage("Deaktivoval si opatrenie - Zrušenie hromadných podujatí.")
            handleOpenSuccess();
        }
    }

    const handleActivationSmallGathering = () => {
        if (measuresActualState.SmallGatheringPrice <= gameCurrency) {
            if (measuresActualState.SmallGathering === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, SmallGathering: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.SmallGatheringPrice));
                setBetaParameter(prev => (prev - measuresActualState.SmallGatheringBeta));
                setModalMessage("Aktivoval si opatrenie - Zrušenie malých podujatí.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationSmallGathering = () => {
        if (measuresActualState.SmallGathering === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, SmallGathering: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.SmallGatheringPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.SmallGatheringBeta));
            setModalMessage("Deaktivoval si opatrenie - Zrušenie malých podujatí.")
            handleOpenSuccess();
        }
    }

    const handleActivationEducationalInstitutions = () => {
        if (measuresActualState.EducationalInstitutionsPrice <= gameCurrency) {
            if (measuresActualState.EducationalInstitutions === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, EducationalInstitutions: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.EducationalInstitutionsPrice));
                setBetaParameter(prev => (prev - measuresActualState.EducationalInstitutionsBeta));
                setModalMessage("Aktivoval si opatrenie - Zatvorenie vzdelávacích inštitúcií.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationEducationalInstitutions = () => {
        if (measuresActualState.EducationalInstitutions === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, EducationalInstitutions: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.EducationalInstitutionsPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.EducationalInstitutionsBeta));
            setModalMessage("Deaktivoval si opatrenie - Zatvorenie vzdelávacích inštitúcií.")
            handleOpenSuccess();
        }
    }

    const handleActivationSafetyProtocols = () => {
        if (measuresActualState.SafetyProtocolsPrice <= gameCurrency) {
            if (measuresActualState.SafetyProtocols === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, SafetyProtocols: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.SafetyProtocolsPrice));
                setBetaParameter(prev => (prev - measuresActualState.SafetyProtocolsBeta));
                setModalMessage("Aktivoval si opatrenie - Protokoly o bezpečnosti pri práci.")
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationSafetyProtocols = () => {
        if (measuresActualState.SafetyProtocols === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, SafetyProtocols: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.SafetyProtocolsPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.SafetyProtocolsBeta));
            setModalMessage("Deaktivoval si opatrenie - Protokoly o bezpečnosti pri práci.")
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
                setBetaParameter(prev => (prev - measuresActualState.SurveillanceBeta));
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
            setGameCurrency(prev => (prev + Math.round(measuresActualState.SurveillancePrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.SurveillanceBeta));
            setModalMessage("Deaktivoval si opatrenie - Dohľad nad opatreniami.")
            handleOpenSuccess();
        }
    }
    //-----------------------------------------


    return (
        <DialogContent dividers>
            <Snackbar open={openInfectionPreventionSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openInfectionPreventionFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Typography gutterBottom>
                Aktiváciou týchto opatrení sa znižuje riziko šírenia nákazy.
            </Typography>
            <Divider/>
            <Grid container>
                <PriceInfoSingleMeasurement price={price} text={text}/>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonEnvironmentDisinfectionColor}
                            variant={measuresActualState.EnvironmentDisinfection === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Pomocou dezinfekcie a čistenia okolitého prostredia (obchody, ...) sa potenciálne zníži prenos nákazy.", 1, measuresActualState.EnvironmentDisinfectionPrice + " (herná mena)");
                            }}>
                        Čistenie a dezinfekcia prostredia
                    </Button>
                    {showEnvironmentDisinfection ? <Results cislo={1}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonPPEColor}
                            variant={measuresActualState.PPE === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zvýšením zásob osobných ochranných prostriedkov (rúška, rukavice, ...) sa potenciálne zníži šírenie nákazy.", 2, measuresActualState.PPEPrice + " (herná mena)");
                            }}>
                        Osobné ochranné prostriedky
                    </Button>
                    {showPPE ? <Results cislo={2}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonInfectiousIsolationColor}
                            variant={measuresActualState.InfectiousIsolation === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Izoláciou jednotlivých nakazených sa potenciálne zníži šírenie nákazy.", 3, measuresActualState.InfectiousIsolationPrice + " (herná mena)");
                            }}>
                        Izolácia nakazených
                    </Button>
                    {showInfectiousIsolation ? <Results cislo={3}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonArmyHelpColor}
                            variant={measuresActualState.ArmyHelp === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Armáda a polícia poskytne pomoc so zásobovaním a dohliadaním na opatrenia. Armáda taktiež poskytne medickú pomoc. Toto opatrenie potenciálne zníži šírenie nákazy a smrtnosť.", 6, measuresActualState.ArmyHelpPrice + " (herná mena)");
                            }}>
                        Zapojenie polície a armády
                    </Button>
                    {showArmyHelp ? <Results cislo={6}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonSpecialEstablishmentsColor}
                            variant={measuresActualState.SpecialEstablishments === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Osobitnými opatreniami pre špeciálne zariadenia (domovy dôchodcov, ...) sa potenciálne zníži šírenie nákazy a smrtnosť.", 7, measuresActualState.SpecialEstablishmentsPrice + " (herná mena)");
                            }}>
                        Opatrenia pre špeciálne zariadenia
                    </Button>
                    {showSpecialEstablishments ? <Results cislo={7}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonSpecialPopulationColor}
                            variant={measuresActualState.SpecialPopulation === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Opatreniami pre osobitné skupiny (dôchodcovia, zdravotne ťažko postihnutí, ...) sa potenciálne zníži šírenie nákazy a smrtnosť.", 8, measuresActualState.SpecialPopulationPrice + " (herná mena)");
                            }}>
                        Opatrenia pre osobitné skupiny
                    </Button>
                    {showSpecialPopulation ? <Results cislo={8}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonSafetyProtocolsColor}
                            variant={measuresActualState.SafetyProtocols === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vytvorením bezpečnostných pracovných protokolov sa potenciálne zniži šírenie nákazy.", 13, measuresActualState.SafetyProtocolsPrice + " (herná mena)");
                            }}>
                        Protokoly o bezpečnosti pri práci
                    </Button>
                    {showSafetyProtocols ? <Results cislo={13}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonSurveillanceColor}
                            variant={measuresActualState.Surveillance === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Dohľadom na dodržiavanie opatrení sa môže potenciálne znížiť prenos nákazy.", 14, measuresActualState.SurveillancePrice + " (herná mena)");
                            }}>
                        Dohľad nad opatreniami
                    </Button>
                    {showSurveillance ? <Results cislo={14}/> : null}
                </Grid>

            </Grid>

            <br/>
            <Divider/>

            <Grid container>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonQuarantineColor}
                            variant={measuresActualState.Quarantine === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zavedením povinnej karantény sa potenciálne zníži šírenie nákazy.", 4, measuresActualState.QuarantinePrice + " (herná mena)");
                            }}>
                        Karanténa
                    </Button>
                    {showQuarantine ? <Results cislo={4}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.quarantineState} className={classes.buttonSize}
                            color={buttonQuarantineFacilitiesColor}
                            variant={measuresActualState.QuarantineFacilities === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zriadením karanténnych/izolačných zariadení sa potenciálne zníži šírenie nákazy.", 5, measuresActualState.QuarantineFacilitiesPrice + " (herná mena)");
                            }}>
                        Karanténne zariadenia
                    </Button>
                    {showQuarantineFacilities ? <Results cislo={5}/> : null}
                </Grid>
            </Grid>

            <br/>
            <Divider/>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonSocialDistancingColor}
                            variant={measuresActualState.SocialDistancing === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zavedením sociálneho odstupu sa potenciálne zniži šírenie nákazy.", 9, measuresActualState.SocialDistancingPrice + " (herná mena)");
                            }}>
                        Sociálny odstup
                    </Button>
                    {showSocialDistancing ? <Results cislo={9}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.socialDistancingState} className={classes.buttonSize}
                            color={buttonMassGatheringColor}
                            variant={measuresActualState.MassGathering === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zrušením hromadných podujatí sa potenciálne zníži šírenie nákazy.", 10, measuresActualState.MassGatheringPrice + " (herná mena)");
                            }}>
                        Zrušenie hromadných podujatí
                    </Button>
                    {showMassGathering ? <Results cislo={10}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.socialDistancingState} className={classes.buttonSize}
                            color={buttonSmallGatheringColor}
                            variant={measuresActualState.SmallGathering === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zrušením malých podujatí a stretnutí sa potenciálne zníži šírenie nákazy.", 11, measuresActualState.SmallGatheringPrice + " (herná mena)");
                            }}>
                        Zrušenie malých podujatí
                    </Button>
                    {showSmallGathering ? <Results cislo={11}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.socialDistancingState} className={classes.buttonSize}
                            color={buttonEducationalInstitutionsColor}
                            variant={measuresActualState.EducationalInstitutions === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zatvorením vzdelávacích inštitúcií sa potenciálne zníži šírenie nákazy.", 12, measuresActualState.EducationalInstitutionsPrice + " (herná mena)");
                            }}>
                        Zatvorenie vzdelávacích inštitúcií
                    </Button>
                    {showEducationalInstitutions ? <Results cislo={12}/> : null}
                </Grid>
            </Grid>

            <br/>

        </DialogContent>
    );
}

export default InfectionPrevention;
