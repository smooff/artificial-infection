import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    DialogContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select, Snackbar
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import RegionTravelRestriction from "./RegionTravelRestriction";
import Divider from "@material-ui/core/Divider";
import {useRecoilState} from "recoil";
import {TravelRestrictionState} from "./TravelRestrictionState";
import {GameCurrencyState} from "../../../data/currencies/GameCurrencyState";
import MuiAlert from "@material-ui/lab/Alert";
import {BetaState} from "../../../data/parameters/BetaState";
import {DeltaState} from "../../../data/parameters/DeltaState";


function TravelRestriction(props) {
    const useStyles = makeStyles((theme) => ({
        actionButtons: {
            textAlign: "center",
            marginTop: "10px",
        },
        activationButtons: {
            textAlign: "center",
            marginTop: "6px",
        }, buttonSize: {
            width: "260px",
            // height:"50px"
        }
    }));
    const classes = useStyles();


    const [linkText, setLinkText] = useState();
    const changeLinkText = (text) => {
        setLinkText(text);
    };
    const [linkPrice, setLinkPrice] = useState();
    const changeLinkPrice = (price) => {
        setLinkPrice(price);
    };

    //herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //data s opatreniami
    const [travelRestrictionsState, setTravelRestrictionsState] = useRecoilState(TravelRestrictionState);

    //beta parameter
    const [, setBetaParameter] = useRecoilState(BetaState);
    //delta parameter
    const [, setDeltaParameter] = useRecoilState(DeltaState);

    //alert pri aktivaciach/deaktiv.
    const [modalMessage, setModalMessage] = useState();

    //handler pre alert------------------------
    const [openTravelRestrictionSuccess, setOpenTravelRestricionSuccess] = React.useState(false);
    const handleOpenSuccess = () => {
        setOpenTravelRestricionSuccess(true);
    };
    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTravelRestricionSuccess(false);
    };
    //po neuspensom pokuse o aktivaciu
    const [openTravelRestrictionFailure, setOpenTravelRestrictionFailure] = React.useState(false);
    const handleOpenFailure = () => {
        setOpenTravelRestrictionFailure(true);
    };
    const handleCloseFailure = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenTravelRestrictionFailure(false);
    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    //------------------------------

    //buttony
    const [buttonNationalLockdownColor, setButtonNationalLockdownColor] = useState("default");
    const [buttonCordonSanitaireColor, setButtonCordonSanitaireColor] = useState("default");
    const [buttonPublicTransportRestrictionColor, setButtonPublicTransportRestrictionColor] = useState("default");
    const [buttonRiskCountriesRestrictionColor, setButtonRiskCountriesRestrictionColor] = useState("default");

    const [showNationalLockdown, setShowNationalLockdown] = React.useState(false);
    const [showCordonSanitaire, setShowCordonSanitaire] = React.useState(false);
    const [showPublicTransportRestriction, setShowPublicTransportRestriction] = React.useState(false);
    const [showRiskCountriesRestriction, setShowRiskCountriesRestriction] = React.useState(false);

    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        setLinkText(textMessage);
        setLinkPrice(buttonPrice);
        switch (buttonNumber) {
            case 1:
                setButtonNationalLockdownColor("primary");
                setButtonCordonSanitaireColor("default");
                setButtonPublicTransportRestrictionColor("default");
                setButtonRiskCountriesRestrictionColor("default");

                setShowNationalLockdown(true);
                setShowCordonSanitaire(false);
                setShowPublicTransportRestriction(false);
                setShowRiskCountriesRestriction(false);
                break;
            case 2:
                setButtonNationalLockdownColor("default");
                setButtonCordonSanitaireColor("primary");
                setButtonPublicTransportRestrictionColor("default");
                setButtonRiskCountriesRestrictionColor("default");

                setShowCordonSanitaire(true);
                setShowNationalLockdown(false);
                setShowPublicTransportRestriction(false);
                setShowRiskCountriesRestriction(false);
                break;
            case 3:
                setButtonNationalLockdownColor("default");
                setButtonCordonSanitaireColor("default");
                setButtonPublicTransportRestrictionColor("primary");
                setButtonRiskCountriesRestrictionColor("default");

                setShowPublicTransportRestriction(true);
                setShowNationalLockdown(false);
                setShowCordonSanitaire(false);
                setShowRiskCountriesRestriction(false);
                break;
            case 4:
                setButtonNationalLockdownColor("default");
                setButtonCordonSanitaireColor("default");
                setButtonPublicTransportRestrictionColor("default");
                setButtonRiskCountriesRestrictionColor("primary");

                setShowRiskCountriesRestriction(true);
                setShowNationalLockdown(false);
                setShowCordonSanitaire(false);
                setShowPublicTransportRestriction(false);
                break;
            default:
                return null;
        }
    }

    //funckia pre navrat hodnot do resultu
    const renderSwitch = (param) => {
        switch (param) {
            case 1:
                return <div><Button onClick={handleActivationNationalLockdown}>Aktivovať</Button><Button
                    onClick={handleDeactivationNationalLockdown}>Deaktivovať</Button></div>
            case 2:
                return <div><Button onClick={handleActivationCordonSanitaire}>Aktivovať</Button><Button
                    onClick={handleDeactivationCordonSanitaire}>Deaktivovať</Button></div>
            case 3:
                return <div><Button onClick={handleActivationPublicTransportRestriction}>Aktivovať</Button><Button
                    onClick={handleDeactivationPublicTransportRestriction}>Deaktivovať</Button></div>
            case 4:
                return <div><Button onClick={handleActivationRiskCountriesRestriction}>Aktivovať</Button><Button
                    onClick={handleDeactivationRiskCountriesRestriction}>Deaktivovať</Button></div>
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
    const handleActivationNationalLockdown = () => {
        if (travelRestrictionsState.NationalLockdownPrice <= gameCurrency) {
            if (travelRestrictionsState.NationalLockdown !== 1) {
                setTravelRestrictionsState((prevStats) => {
                    return {...prevStats, NationalLockdown: 1};
                });
                setGameCurrency(prev => (prev - travelRestrictionsState.NationalLockdownPrice));
                setBetaParameter(prev => (prev - travelRestrictionsState.NationalLockdownBeta));
                setModalMessage("Aktivoval si opatrenie - Lockdown v infekčných krajinách.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationNationalLockdown = () => {
        if (travelRestrictionsState.NationalLockdown === 1) {
            setTravelRestrictionsState((prevStats) => {
                return {...prevStats, NationalLockdown: 0};
            });
            setGameCurrency(prev => (prev + travelRestrictionsState.NationalLockdownPrice));
            setBetaParameter(prev => (prev + travelRestrictionsState.NationalLockdownBeta));
            setModalMessage("Deaktivoval si opatrenie - Lockdown v infekčných krajinách.")
            handleOpenSuccess();
        }
    }

    const handleActivationCordonSanitaire = () => {
        if (travelRestrictionsState.CordonSanitairePrice <= gameCurrency) {
            if (travelRestrictionsState.CordonSanitaire !== 1) {
                setTravelRestrictionsState((prevStats) => {
                    return {...prevStats, CordonSanitaire: 1};
                });
                setGameCurrency(prev => (prev - travelRestrictionsState.CordonSanitairePrice));
                setBetaParameter(prev => (prev - travelRestrictionsState.CordonSanitaireBeta));
                setDeltaParameter(prev => (prev - travelRestrictionsState.CordonSanitaireDelta));
                setModalMessage("Aktivoval si opatrenie - Lekársky zásah v ohniskách.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationCordonSanitaire = () => {
        if (travelRestrictionsState.CordonSanitaire === 1) {
            setTravelRestrictionsState((prevStats) => {
                return {...prevStats, CordonSanitaire: 0};
            });
            setGameCurrency(prev => (prev + travelRestrictionsState.CordonSanitairePrice));
            setBetaParameter(prev => (prev + travelRestrictionsState.CordonSanitaireBeta));
            setDeltaParameter(prev => (prev + travelRestrictionsState.CordonSanitaireDelta));
            setModalMessage("Deaktivoval si opatrenie - Lekársky zásah v ohniskách.")
            handleOpenSuccess();
        }
    }

    const handleActivationPublicTransportRestriction = () => {
        if (travelRestrictionsState.PublicTransportRestrictionPrice <= gameCurrency) {
            if (travelRestrictionsState.PublicTransportRestriction !== 1) {
                setTravelRestrictionsState((prevStats) => {
                    return {...prevStats, PublicTransportRestriction: 1};
                });
                setGameCurrency(prev => (prev - travelRestrictionsState.PublicTransportRestrictionPrice));
                setBetaParameter(prev => (prev - travelRestrictionsState.PublicTransportRestrictionBeta));
                setModalMessage("Aktivoval si opatrenie - Obmedzenie verejnej dopravy.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationPublicTransportRestriction = () => {
        if (travelRestrictionsState.PublicTransportRestriction === 1) {
            setTravelRestrictionsState((prevStats) => {
                return {...prevStats, PublicTransportRestriction: 0};
            });
            setGameCurrency(prev => (prev + travelRestrictionsState.PublicTransportRestrictionPrice));
            setBetaParameter(prev => (prev + travelRestrictionsState.PublicTransportRestrictionBeta));
            setModalMessage("Deaktivoval si opatrenie - Obmedzenie verejnej dopravy.")
            handleOpenSuccess();
        }
    }

    const handleActivationRiskCountriesRestriction = () => {
        if (travelRestrictionsState.RiskCountriesRestrictionPrice <= gameCurrency) {
            if (travelRestrictionsState.RiskCountriesRestriction !== 1) {
                setTravelRestrictionsState((prevStats) => {
                    return {...prevStats, RiskCountriesRestriction: 1};
                });
                setGameCurrency(prev => (prev - travelRestrictionsState.RiskCountriesRestrictionPrice));
                setBetaParameter(prev => (prev - travelRestrictionsState.RiskCountriesRestrictionBeta));
                setModalMessage("Aktivoval si opatrenie - Obmedzenie z rizikových krajín.");
                handleOpenSuccess();
            }
        } else {
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }
    const handleDeactivationRiskCountriesRestriction = () => {
        if (travelRestrictionsState.RiskCountriesRestriction === 1) {
            setTravelRestrictionsState((prevStats) => {
                return {...prevStats, RiskCountriesRestriction: 0};
            });
            setGameCurrency(prev => (prev + travelRestrictionsState.RiskCountriesRestrictionPrice));
            setBetaParameter(prev => (prev + travelRestrictionsState.RiskCountriesRestrictionBeta));
            setModalMessage("Deaktivoval si opatrenie - Obmedzenie z rizikových krajín.")
            handleOpenSuccess();
        }
    }
    return (

        <DialogContent dividers>
            <Snackbar open={openTravelRestrictionSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    {modalMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={openTravelRestrictionFailure} autoHideDuration={6000} onClose={handleCloseFailure}>
                <Alert onClose={handleCloseFailure} severity="warning">
                    {modalMessage}
                </Alert>
            </Snackbar>

            <Typography gutterBottom>
                Aktiváciou týchto opatrení sa znižuje riziko šírenia nákazy na jednotlivých svetadieloch alebo
                celosvetovo.
                <Divider/>
                Popis: {linkText}
                <br/>
                Cena: {linkPrice}
            </Typography>

            {/*<FormControl style={{width:"85px"}}>*/}
            {/*    <InputLabel>Svetadiel</InputLabel>*/}
            {/*    <Select>*/}

            {/*        <MenuItem onClick={handleEuropeClick}>Európa</MenuItem>*/}
            {/*        <MenuItem onClick={handleAmericaClick}>Amerika</MenuItem>*/}
            {/*        <MenuItem onClick={handleAfricaClick}>Afrika</MenuItem>*/}
            {/*        <MenuItem onClick={handleAsiaClick}>Ázia</MenuItem>*/}
            {/*        <MenuItem onClick={handleAustraliaOceaniaClick}>Austrália a Oceánia</MenuItem>*/}
            {/*        <MenuItem onClick={handleAntarticaClick}>Antarktída</MenuItem>*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}
            {/*{ showResultsEurope ? <RegionTravelRestriction regionName="Európa" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                        measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                        measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAmerica ?  <RegionTravelRestriction regionName="Amerika" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                        measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                        measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAfrica ?   <RegionTravelRestriction regionName="Afrika" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                        measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                        measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAsia ?   <RegionTravelRestriction regionName="Ázia" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                        measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                        measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAustraliaOceania ?   <RegionTravelRestriction regionName="Austrália a Oceánia" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                      measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                      measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAntartica ?    <RegionTravelRestriction regionName="Antarktída" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                                   measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                                   measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}

            <RegionTravelRestriction regionEN="Europe" regionName="Európa"
                                     measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                     measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                     measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                     changeLinkText={changeLinkText}
                                     changeLinkPrice={changeLinkPrice}
            />
            <RegionTravelRestriction regionEN="Americas" regionName="Amerika"
                                     measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                     measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                     measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                     changeLinkText={changeLinkText}
                                     changeLinkPrice={changeLinkPrice}
            />
            <RegionTravelRestriction regionEN="Africa" regionName="Afrika"
                                     measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                     measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                     measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                     changeLinkText={changeLinkText}
                                     changeLinkPrice={changeLinkPrice}
            />
            <RegionTravelRestriction regionEN="Asia" regionName="Ázia"
                                     measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                     measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                     measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                     changeLinkText={changeLinkText}
                                     changeLinkPrice={changeLinkPrice}
            />
            <RegionTravelRestriction regionEN="Oceania" regionName="Austrália a Oceánia"
                                     measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                     measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                     measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                     changeLinkText={changeLinkText}
                                     changeLinkPrice={changeLinkPrice}
            />

            <Grid container>
                <Grid item xs={6} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonNationalLockdownColor}
                            variant={travelRestrictionsState.NationalLockdown === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Aktivovaním lockdownov v postihnutých krajinách sa potenciálne zníži šírenie nákazy.", 1, travelRestrictionsState.NationalLockdownPrice);
                            }}>
                        Lockdown v infekčných krajinách
                    </Button>
                    {showNationalLockdown ? <Results cislo={1}/> : null}
                </Grid>

                <Grid item xs={6} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonCordonSanitaireColor}
                            variant={travelRestrictionsState.CordonSanitaire === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Zaslaním lekárskych tímov do ohnísk nákazy sa potenciálne zníži šírenie nákazy a smrtnosť.", 2, travelRestrictionsState.CordonSanitairePrice);
                            }}>
                        Lekársky zásah v ohniskách
                    </Button>
                    {showCordonSanitaire ? <Results cislo={2}/> : null}
                </Grid>

                <Grid item xs={6} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonPublicTransportRestrictionColor}
                            variant={travelRestrictionsState.PublicTransportRestriction === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Obmedzením verejnej dopravy sa potenciálne zníži šírenie nákazy.", 3, travelRestrictionsState.PublicTransportRestrictionPrice);
                            }}>
                        Obmedzenie verejnej dopravy
                    </Button>
                    {showPublicTransportRestriction ? <Results cislo={3}/> : null}
                </Grid>
                <Grid item xs={6} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonRiskCountriesRestrictionColor}
                            variant={travelRestrictionsState.RiskCountriesRestriction === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Obmedzením cestovania z/do rizikových krajín sa potenciálne zníži šírenie nákazy.", 4, travelRestrictionsState.RiskCountriesRestrictionPrice);
                            }}>
                        Obmedzenia z rizikových krajín
                    </Button>
                    {showRiskCountriesRestriction ? <Results cislo={4}/> : null}
                </Grid>
            </Grid>
        </DialogContent>

    );
}

export default TravelRestriction;
