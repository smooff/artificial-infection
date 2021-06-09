import React, {useState} from 'react';
import {Button, DialogContent, Snackbar,} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../data/currencies/GameCurrencyState";
import Divider from "@material-ui/core/Divider";
import MuiAlert from "@material-ui/lab/Alert";
import {CommunicationState} from "../../data/gameControls/CommunicationState";
import {BetaState} from "../../data/parameters/BetaState";
import {DeltaState} from "../../data/parameters/DeltaState";
import {GameTrustState} from "../../data/gameTrust/GameTrustState";
import PriceInfoSingleMeasurement from "./PriceInfoSingleMeasurement";

/**
 * Renders a Communication component.
 * Component is used to display measurements (type Communication) inside a modal.
 * All other measurements modal has similar structure (Cure.js,InfectionPrevention.js,RegionTravelRestriction.js,TracingTesting.js,TravelRestriction.js,Vaccine.js)
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function Communication() {
    /**
     * used for styling specific components
     * this kind of styling is used nearly in every component in the app
     */
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

    /**
     * value (and setter), which stores text for specific measurement
     */
    const [text, setText] = useState("pre zobrazenie popisu klikni na opatrenie");
    /**
     * value (and setter), which stores price for specific measurement
     */
    const [price, setPrice] = useState("pre zobrazenie ceny klikni na opatrenie");

    /**
     * value (and setter), which stores global measures of specific type
     */
    const [measuresActualState, setMeasuresActualState] = useRecoilState(CommunicationState);

    /**
     * setter, which sets game trust state - after activating specific measurement
     */
    const [, setTrustValue] = useRecoilState(GameTrustState);

    /**
     * value (and setter), which stores main game currency
     */
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    /**
     * setter, which sets beta parameter after activating specific measurement
     */
    const [, setBetaParameter] = useRecoilState(BetaState);
    /**
     * setter, which sets delta parameter after activating specific measurement
     */
    const [, setDeltaParameter] = useRecoilState(DeltaState);

    /**
     * value, which determines if measurement activating was successful
     */
    const [openCommunicationSuccess, setOpenCommunicationSuccess] = React.useState(false);
    /**
     * arrow function, which provide successful activation of measurement - opening modal
     */
    const handleOpenSuccess = () => {
        setOpenCommunicationSuccess(true);
    };
    /**
     * arrow function, which provide successful activation of measurement - closing modal
     */
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCommunicationSuccess(false);
    };
    /**
     * value, which determines if measurement activating was not successful
     */
    const [openCommunicationFailure, setOpenCommunicationFailure] = React.useState(false);
    /**
     * arrow function, which provide non-successful activation of measurement - opening modal
     */
    const handleOpenFailure = () => {
        setOpenCommunicationFailure(true);
    };
    /**
     * arrow function, which provide non-successful activation of measurement - closing modal
     */
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCommunicationFailure(false);
    };

    /**
     * value (and setter), which stores modal message - activation process
     */
    const [modalMessage, setModalMessage] = useState();

    /**
     * Renders a MuiAlert component.
     * Component is used to display message if the measurement was activated or not
     * @returns {JSX.Element}
     * @constructor
     */
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    /**
     * value (and setter), which specifies color of the button for specific meaurement
     */
    const [buttonEducateCommunicateColor, setButtonEducateCommunicateColor] = useState("default");
    const [buttonGovernmentHelpsVulnerableColor, setButtonGovernmentHelpsVulnerableColor] = useState("default");
    const [buttonEmergencyStateColor, setButtonEmergencyStateColor] = useState("default");
    const [buttonCurfewColor, setButtonCurfewColor] = useState("default");
    const [buttonTravelWarningColor, setButtonTravelWarningColor] = useState("default");
    const [buttonExpertCommunicationColor, setButtonExpertCommunicationColor] = useState("default");
    const [buttonCrisisManagementColor, setButtonCrisisManagementColor] = useState("default");
    const [buttonSupplySecurityColor, setButtonSupplySecurityColor] = useState("default");
    const [buttonInternationalHelpColor, setButtonInternationalHelpColor] = useState("default");
    const [buttonInformationCampaignColor, setButtonInformationCampaignColor] = useState("default");

    /**
     * value (and setter), which specifies if button with specific measurement was clicked
     */
    const [showEducateCommunicate, setShowEducateCommunicate] = React.useState(false);
    const [showGovernmentHelpsVulnerable, setShowGovernmentHelpsVulnerable] = React.useState(false);
    const [showEmergencyState, setShowEmergencyState] = React.useState(false);
    const [showCurfew, setShowCurfew] = React.useState(false);
    const [showTravelWarning, setShowTravelWarning] = React.useState(false);
    const [showExpertCommunication, setShowExpertCommunication] = React.useState(false);
    const [showCrisisManagement, setShowCrisisManagement] = React.useState(false);
    const [showSupplySecurity, setShowSupplySecurity] = React.useState(false);
    const [showInternationalHelp, setShowInternationalHelp] = React.useState(false);
    const [showInformationCampaign, setShowInformationCampaign] = React.useState(false);

    /**
     * Arrow function that handles click on specific measurement button.
     * @param textMessage - text of specific measurement
     * @param buttonNumber - all buttons have own numbers - for coloring
     * @param buttonPrice - price of specific measurement
     * @returns {null}
     */
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(true);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                setShowInformationCampaign(false);
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(true);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                setShowInformationCampaign(false);
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(true);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                setShowInformationCampaign(false);
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(true);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                setShowInformationCampaign(false);
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(true);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                setShowInformationCampaign(false);
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(true);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                setShowInformationCampaign(false);
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(true);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                setShowInformationCampaign(false);
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(true);
                setShowInternationalHelp(false);
                setShowInformationCampaign(false);
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
                setButtonInformationCampaignColor("default");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(true);
                setShowInformationCampaign(false);
                break;
            case 10:
                setButtonEducateCommunicateColor("default");
                setButtonGovernmentHelpsVulnerableColor("default");
                setButtonEmergencyStateColor("default");
                setButtonCurfewColor("default");
                setButtonTravelWarningColor("default");
                setButtonExpertCommunicationColor("default");
                setButtonCrisisManagementColor("default");
                setButtonSupplySecurityColor("default");
                setButtonInternationalHelpColor("default");
                setButtonInformationCampaignColor("primary");

                setShowEducateCommunicate(false);
                setShowGovernmentHelpsVulnerable(false);
                setShowEmergencyState(false);
                setShowCurfew(false);
                setShowTravelWarning(false);
                setShowExpertCommunication(false);
                setShowCrisisManagement(false);
                setShowSupplySecurity(false);
                setShowInternationalHelp(false);
                setShowInformationCampaign(true);
                break;
            default:
                return null;
        }
    }
    /**
     * Arrow function that determines which button is activated, and based on that it renders sub-buttons for activation/deactivation
     * @param param - button number (id), which determines which button was clicked
     * @returns {JSX.Element|null}
     */
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
            case 10:
                return <div><Button onClick={handleActivationInformationCampaign}>Aktivovať</Button><Button
                    onClick={handleDeactivationInformationCampaign}>Deaktivovať</Button></div>
            default:
                return null;
        }
    }

    //arrow function for wrapping buttons
    const Results = (c) => (
        <Grid className={classes.activationButtons}>
            {renderSwitch(c.cislo)}
        </Grid>
    )

    /**
     * arrow function, which is used for activating specific measurement - EducateCommunicate
     */
    const handleActivationEducateCommunicate = () => {
        //check if there is enough main game currency for activation
        if (measuresActualState.EducateCommunicatePrice <= gameCurrency) {
            //check if the measurement is not already activated
            if (measuresActualState.EducateCommunicate === 0) {
                //activation of measurement - set measurement state to 1, and deactivate measurement tree lock
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, EducateCommunicate: 1, EducateCommunicateActive: false};
                });
                //decrease game currency
                setGameCurrency(prev => (prev - measuresActualState.EducateCommunicatePrice));
                //change global beta parameter
                setBetaParameter(prev => (prev - measuresActualState.EducateCommunicateBeta));
                //change global delta parameter
                setDeltaParameter(prev => (prev - measuresActualState.EducateCommunicateDelta));
                //set message - successful activation
                setModalMessage("Aktivoval si opatrenie - Vzdelávanie a komunikácia s verejnosťou.");
                //increase game trust
                setTrustValue(prev => (prev + 4));
                //call function, which tells that activation was successful
                handleOpenSuccess();
            }
            //if there is not enough currency
        } else {
            //set message - non-successful activation
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            //call function, which tells that activation was non-successful
            handleOpenFailure();
        }
    }
    const handleDeactivationEducateCommunicate = () => {
        if (measuresActualState.EducateCommunicate === 1) {
            if (measuresActualState.InformationCampaign === 0 && measuresActualState.TravelWarning === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, EducateCommunicate: 0, EducateCommunicateActive: true};
                });
                setGameCurrency(prev => (prev + Math.round(measuresActualState.EducateCommunicatePrice / 2)));
                setBetaParameter(prev => (prev + measuresActualState.EducateCommunicateBeta));
                setDeltaParameter(prev => (prev + measuresActualState.EducateCommunicateDelta));
                setModalMessage("Deaktivoval si opatrenie - Vzdelávanie a komunikácia s verejnosťou.");
                setTrustValue(prev => (prev - 5));
                handleOpenSuccess();
            } else {
                setModalMessage("Nemôžeš deaktivovať toto opatrenie. Najprv deaktivuj nadväzujúce opatrenia.");
                handleOpenFailure();
            }
        }
    }

    const handleActivationGovernmentHelpsVulnerable = () => {
        if (measuresActualState.GovernmentHelpsVulnerablePrice <= gameCurrency) {
            if (measuresActualState.GovernmentHelpsVulnerable === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, GovernmentHelpsVulnerable: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.GovernmentHelpsVulnerablePrice));
                setBetaParameter(prev => (prev - measuresActualState.GovernmentHelpsVulnerableBeta));
                setDeltaParameter(prev => (prev - measuresActualState.GovernmentHelpsVulnerableDelta));
                setModalMessage("Aktivoval si opatrenie - Vládna pomoc zranitelným.");
                setTrustValue(prev => (prev + 3));
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
            setGameCurrency(prev => (prev + Math.round(measuresActualState.GovernmentHelpsVulnerablePrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.GovernmentHelpsVulnerableBeta));
            setDeltaParameter(prev => (prev + measuresActualState.GovernmentHelpsVulnerableDelta));
            setModalMessage("Deaktivoval si opatrenie - Vládna pomoc zranitelným.");
            setTrustValue(prev => (prev - 4));
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
                setBetaParameter(prev => (prev - measuresActualState.EmergencyStateBeta));
                setModalMessage("Aktivoval si opatrenie - Vyhlásenie núdzového stavu.");
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
                setGameCurrency(prev => (prev + Math.round(measuresActualState.EmergencyStatePrice / 2)));
                setBetaParameter(prev => (prev + measuresActualState.EmergencyStateBeta));
                setModalMessage("Deaktivoval si opatrenie - Vyhlásenie núdzového stavu.");
                handleOpenSuccess();
            } else {
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
                setBetaParameter(prev => (prev - measuresActualState.CurfewBeta));
                setModalMessage("Aktivoval si opatrenie - Zákaz vychádzania.");
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
            setGameCurrency(prev => (prev + Math.round(measuresActualState.CurfewPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.CurfewBeta));
            setModalMessage("Deaktivoval si opatrenie - Zákaz vychádzania.");
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
                setBetaParameter(prev => (prev - measuresActualState.TravelWarningBeta));
                setModalMessage("Aktivoval si opatrenie - Cestovné výstrahy.");
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
            setGameCurrency(prev => (prev + Math.round(measuresActualState.TravelWarningPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.TravelWarningBeta));
            setModalMessage("Deaktivoval si opatrenie - Cestovné výstrahy.");
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
                setBetaParameter(prev => (prev - measuresActualState.ExpertCommunicationBeta));
                setDeltaParameter(prev => (prev - measuresActualState.ExpertCommunicationDelta));
                setModalMessage("Aktivoval si opatrenie - Komunikácia so zdravoníckymi expertmi.");
                setTrustValue(prev => (prev + 2));
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
            setGameCurrency(prev => (prev + Math.round(measuresActualState.ExpertCommunicationPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.ExpertCommunicationBeta));
            setDeltaParameter(prev => (prev + measuresActualState.ExpertCommunicationDelta));
            setModalMessage("Deaktivoval si opatrenie - Komunikácia so zdravoníckymi expertmi.");
            setTrustValue(prev => (prev - 3));
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
                setBetaParameter(prev => (prev - measuresActualState.CrisisManagementBeta));
                setDeltaParameter(prev => (prev - measuresActualState.CrisisManagementDelta));
                setModalMessage("Aktivoval si opatrenie - Plán krízového riadenia.");
                setTrustValue(prev => (prev + 3));
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
            setGameCurrency(prev => (prev + Math.round(measuresActualState.CrisisManagementPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.CrisisManagementBeta));
            setDeltaParameter(prev => (prev + measuresActualState.CrisisManagementDelta));
            setModalMessage("Deaktivoval si opatrenie - Plán krízového riadenia.");
            setTrustValue(prev => (prev - 4));
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
                setBetaParameter(prev => (prev - measuresActualState.SupplySecurityBeta));
                setDeltaParameter(prev => (prev - measuresActualState.SupplySecurityDelta));
                setModalMessage("Aktivoval si opatrenie - Zaistenie bezpečnosti zásobovania.");
                setTrustValue(prev => (prev + 2));
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
            setGameCurrency(prev => (prev + Math.round(measuresActualState.SupplySecurityPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.SupplySecurityBeta));
            setDeltaParameter(prev => (prev + measuresActualState.SupplySecurityDelta));
            setModalMessage("Deaktivoval si opatrenie - Zaistenie bezpečnosti zásobovania.");
            setTrustValue(prev => (prev - 3));
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
                setBetaParameter(prev => (prev - measuresActualState.InternationalHelpBeta));
                setDeltaParameter(prev => (prev - measuresActualState.InternationalHelpDelta));
                setModalMessage("Aktivoval si opatrenie - Medzinárodná pomoc.");
                setTrustValue(prev => (prev + 4));
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
            setGameCurrency(prev => (prev + Math.round(measuresActualState.InternationalHelpPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.InternationalHelpBeta));
            setDeltaParameter(prev => (prev + measuresActualState.InternationalHelpDelta));
            setModalMessage("Deaktivoval si opatrenie - Medzinárodná pomoc.");
            setTrustValue(prev => (prev - 5));
            handleOpenSuccess();
        }
    }

    const handleActivationInformationCampaign = () => {
        if (measuresActualState.InformationCampaignPrice <= gameCurrency) {
            if (measuresActualState.InformationCampaign === 0) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, InformationCampaign: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.InformationCampaignPrice));
                setBetaParameter(prev => (prev - measuresActualState.InformationCampaignBeta));
                setModalMessage("Aktivoval si opatrenie - Informačná kampaň.");
                setTrustValue(prev => (prev + 2));
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia.");
            handleOpenFailure();
        }
    }
    const handleDeactivationInformationCampaign = () => {
        if (measuresActualState.InformationCampaign === 1) {

            setMeasuresActualState((prevStats) => {
                return {...prevStats, InformationCampaign: 0};
            });
            setGameCurrency(prev => (prev + Math.round(measuresActualState.InformationCampaignPrice / 2)));
            setBetaParameter(prev => (prev + measuresActualState.InformationCampaignBeta));
            setModalMessage("Deaktivoval si opatrenie - Informačná kampaň.");
            setTrustValue(prev => (prev - 3));
            handleOpenSuccess();
        }
    }

    return (
        <DialogContent dividers>
            {/*renders successful message*/}
            <Snackbar open={openCommunicationSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {modalMessage}
                </Alert>
            </Snackbar>
            {/*renders non-successful message*/}
            <Snackbar open={openCommunicationFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    {modalMessage}
                </Alert>
            </Snackbar>
            {/*general information about measurement type*/}
            <Typography gutterBottom>
                Aktiváciou týchto opatrení sa znižuje smrtnosť a šírenie nákazy.
            </Typography>
            <Divider/>
            {/*grid wrapping measurements*/}
            <Grid container>
                {/*renders price and text of measurement*/}
                <PriceInfoSingleMeasurement price={price} text={text}/>

                {/*grid wrapping button of one specific measurement*/}
                <Grid item xs={12} className={classes.actionButtons}>
                    {/*renders button with styled color, size...*/}
                    <Button className={classes.buttonSize} color={buttonEducateCommunicateColor}
                            variant={measuresActualState.EducateCommunicate === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Aktívnou komunikáciou a vzdelávaním verejnosti o nákaze sa potenciálne znižuje šírenie nákazy a smrtnosť. Týmto opatrením sa taktiež získava dôvera obyvateľov.", 1, measuresActualState.EducateCommunicatePrice + "  (herná mena)");
                            }}>
                        Vzdelávanie a komunikácia s verejnosťou
                    </Button>
                    {/*renders activation/deactivation buttons after clicking measurement button*/}
                    {showEducateCommunicate ? <Results cislo={1}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.EducateCommunicateActive} className={classes.buttonSize}
                            color={buttonTravelWarningColor}
                            variant={measuresActualState.TravelWarning === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vlády zasiahnutých krajín dôkladne sledujú situáciu vo svete a vydávajú cestovné výstrahy a varovania, čím sa potenciálne znižuje šírenie nákazy.", 5, measuresActualState.TravelWarningPrice + " (herná mena)");
                            }}>
                        Cestovné výstrahy
                    </Button>
                    {showTravelWarning ? <Results cislo={5}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.EducateCommunicateActive} className={classes.buttonSize}
                            color={buttonInformationCampaignColor}
                            variant={measuresActualState.InformationCampaign === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Spustením informačnej kampane (weby s dôležitými informáciami, ...) sa potenciálne znižuje šírenie nákazy. Týmto opatrením sa taktiež získava dôvera obyvateľov.", 10, measuresActualState.InformationCampaignPrice + " (herná mena)");
                            }}>
                        Informačná kampaň
                    </Button>
                    {showInformationCampaign ? <Results cislo={10}/> : null}
                </Grid>

            </Grid>

            <br/>
            <Divider/>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonGovernmentHelpsVulnerableColor}
                            variant={measuresActualState.GovernmentHelpsVulnerable === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vlády zasiahnutých krajín poskytnú pomoc (informovanosť, ...) zraniteľným občanom (dôchodcovia, zdravotne ťažko postihnutí, ...) čím sa potenciálne znižuje šírenie nákazy a smrtnosť." +
                                    " Týmto opatrením sa taktiež získava dôvera obyvateľov.", 2, measuresActualState.GovernmentHelpsVulnerablePrice + " (herná mena)");
                            }}>
                        Vládna pomoc zranitelným
                    </Button>
                    {showGovernmentHelpsVulnerable ? <Results cislo={2}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonExpertCommunicationColor}
                            variant={measuresActualState.ExpertCommunication === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Aktívnou komunikáciou a poradami so zdravotníckymi expertmi a vedcami sa potenciálne znižuje šírenie nákazy a smrtnosť." +
                                    " Týmto opatrením sa taktiež získava dôvera obyvateľov.", 6, measuresActualState.ExpertCommunicationPrice + " (herná mena)");
                            }}>
                        Komunikácia so zdravoníckymi expertmi
                    </Button>
                    {showExpertCommunication ? <Results cislo={6}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonCrisisManagementColor}
                            variant={measuresActualState.CrisisManagement === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Vytovrením plánu krízového riadenia (riešenie krízovej situácie v časových dimenziách, ...) sa potenciálne znižuje šírenie nákazy a smrtnosť. Týmto opatrením sa taktiež získava dôvera obyvateľov.", 7, measuresActualState.CrisisManagementPrice + " (herná mena)");
                            }}>
                        Plán krízového riadenia
                    </Button>
                    {showCrisisManagement ? <Results cislo={7}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonSupplySecurityColor}
                            variant={measuresActualState.SupplySecurity === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zaistením bezpečnosti zásobovania (medické vybavenie, potraviny, ...) sa potenciálne znižuje šírenie nákazy a smrtnosť. Týmto opatrením sa taktiež získava dôvera obyvateľov.", 8, measuresActualState.SupplySecurityPrice + " (herná mena)");
                            }}>
                        Zaistenie bezpečnosti zásobovania
                    </Button>
                    {showSupplySecurity ? <Results cislo={8}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonInternationalHelpColor}
                            variant={measuresActualState.InternationalHelp === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zaistením medzinárodnej pomoci a kooperácie sa potenciálne znižuje šírenie nákazy a smrtnosť. Týmto opatrením sa taktiež získava dôvera obyvateľov.", 9, measuresActualState.InternationalHelpPrice + " (herná mena)");
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
                                handleButtonClick("Vlády zasiahnutých krajín dôsledkom pandémie vyhlásia núdzový stav (kvôli zásobovaniu, obmedzeniu pohybu, ...) čím sa potenciálne znižuje šírenie nákazy a smrtnosť.", 3, measuresActualState.EmergencyStatePrice + " (herná mena)");
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
                                handleButtonClick("Vlády zasiahnutých krajín dôsledkom pandémie vyhlásia zákaz vychádzania, čím sa potenciálne znižuje šírenie nákazy.", 4, measuresActualState.CurfewPrice + " (herná mena)");
                            }}>
                        Zákaz vychádzania
                    </Button>
                    {showCurfew ? <Results cislo={4}/> : null}
                </Grid>
            </Grid>

            <br/>

        </DialogContent>
    );
}

export default Communication;
