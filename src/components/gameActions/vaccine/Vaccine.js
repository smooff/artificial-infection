import React, {useState} from 'react';
import {
    Button,
    DialogContent,
    Grid, Snackbar
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../../data/GameCurrencyState";
import MuiAlert from "@material-ui/lab/Alert";
import {VaccineState} from "./VaccineState";


function Vaccine(props) {
    const useStyles = makeStyles((theme) => ({
        actionButtons: {
            textAlign: "center",
            marginTop: "10px",
        },
        activationButtons: {
            textAlign: "center",
            marginTop: "6px",
        },buttonSize:{
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
    const [measuresActualState, setMeasuresActualState] = useRecoilState(VaccineState);

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
    const [buttonDevelopVaccineColor, setButtonDevelopVaccineColor] = useState("default");
    const [buttonFinanceVaccineDevelopmentColor, setButtonFinanceVaccineDevelopmentColor] = useState("default");
    const [buttonInternationalCooperationColor, setButtonInternationalCooperationColor] = useState("default");

    const [showDevelopVaccine, setShowDevelopVaccine] = React.useState(false);
    const [showFinanceVaccineDevelopment, setShowFinanceVaccineDevelopment] = React.useState(false);
    const [showInternationalCooperation, setShowInternationalCooperation] = React.useState(false);

    const handleButtonClick = (textMessage, buttonNumber, buttonPrice) => {
        setLinkText(textMessage);
        setLinkPrice(buttonPrice);
        switch (buttonNumber) {
            case 1:
                setButtonDevelopVaccineColor("primary");
                setButtonFinanceVaccineDevelopmentColor("default");
                setButtonInternationalCooperationColor("default");

                setShowDevelopVaccine(true);
                setShowFinanceVaccineDevelopment(false);
                setShowInternationalCooperation(false);
                break;
            case 2:
                setButtonDevelopVaccineColor("default");
                setButtonFinanceVaccineDevelopmentColor("primary");
                setButtonInternationalCooperationColor("default");

                setShowDevelopVaccine(false);
                setShowFinanceVaccineDevelopment(true);
                setShowInternationalCooperation(false);
                break;
            case 3:
                setButtonDevelopVaccineColor("default");
                setButtonFinanceVaccineDevelopmentColor("default");
                setButtonInternationalCooperationColor("primary");

                setShowDevelopVaccine(false);
                setShowFinanceVaccineDevelopment(false);
                setShowInternationalCooperation(true);
                break;
            default:
                return null;
        }
    }

    //funckia pre navrat hodnot do resultu
    const renderSwitch = (param) =>{
        switch(param) {
            case 1:
                return <div><Button onClick={handleActivationDevelopVaccine}>Aktivovať</Button></div>
            case 2:
                return <div><Button onClick={handleActivationFinanceVaccineDevelopment}>Aktivovať</Button></div>
            case 3:
                return <div><Button onClick={handleActivationInternationalCooperation}>Aktivovať</Button></div>
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
        if (measuresActualState.DevelopVaccinePrice <= gameCurrency) {
            if (measuresActualState.DevelopVaccine !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, DevelopVaccine: 1, DevelopmentProcess: false};
                });
                setGameCurrency(prev => (prev - measuresActualState.DevelopVaccinePrice));

                setModalMessage("Aktivoval si opatrenie - Vývoj vakcíny.");
                handleOpenSuccess();
            }
        }else{
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }

    const handleActivationFinanceVaccineDevelopment = () => {
        if (measuresActualState.FinanceVaccineDevelopmentPrice <= gameCurrency) {
            if (measuresActualState.FinanceVaccineDevelopment !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, FinanceVaccineDevelopment: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.FinanceVaccineDevelopmentPrice));

                setModalMessage("Aktivoval si opatrenie - Finančná pomoc vývoju.");
                handleOpenSuccess();
            }
        }else{
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
            handleOpenFailure();
        }
    }

    const handleActivationInternationalCooperation = () => {
        if (measuresActualState.InternationalCooperationPrice <= gameCurrency) {
            if (measuresActualState.InternationalCooperation !== 1) {
                setMeasuresActualState((prevStats) => {
                    return {...prevStats, InternationalCooperation: 1};
                });
                setGameCurrency(prev => (prev - measuresActualState.InternationalCooperationPrice));

                setModalMessage("Aktivoval si opatrenie - Medzinárodná kooperácia pri vývoji.");
                handleOpenSuccess();
            }
        }else{
            setModalMessage("Nemáš dostatok hernej meny na aktivovanie opatrenia");
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
               Tieto opatrenia sa týkajú vývoju vakcíny potrebnej na vyhratie hry.
                <Divider/>
                Popis: {linkText}
                <br/>
                Cena: {linkPrice}
            </Typography>

            <Grid container>
                <Grid item xs={12} className={classes.actionButtons}>
                    <Button className={classes.buttonSize} color={buttonDevelopVaccineColor}
                            variant={measuresActualState.DevelopVaccine === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Spustením tejto akcie sa začne vývoj vakcíny proti nákaze.", 1, measuresActualState.DevelopVaccinePrice);
                            }}>
                        Vývoj vakcíny
                    </Button>
                    {showDevelopVaccine ? <Results cislo={1}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.DevelopmentProcess} className={classes.buttonSize}
                            color={buttonFinanceVaccineDevelopmentColor}
                            variant={measuresActualState.FinanceVaccineDevelopment === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Pomocou finančnej pomoci vývoju vakcíny (laboratóriá, ...) sa urýchli vývoj vakcíny.", 2, measuresActualState.FinanceVaccineDevelopmentPrice);
                            }}>
                        Finančná pomoc vývoju
                    </Button>
                    {showFinanceVaccineDevelopment ? <Results cislo={2}/> : null}
                </Grid>

                <Grid item xs={12} className={classes.actionButtons}>
                    <Button disabled={measuresActualState.DevelopmentProcess} className={classes.buttonSize}
                            color={buttonInternationalCooperationColor}
                            variant={measuresActualState.InternationalCooperation === 1 ? "contained" : "outlined"}
                            onClick={() => {
                                handleButtonClick("Pomocou medzinárodnej kooperácii sa urýchli vývoj vakcíny.", 3, measuresActualState.InternationalCooperationPrice);
                            }}>
                        Medzinárodná kooperácia pri vývoji
                    </Button>
                    {showInternationalCooperation ? <Results cislo={3}/> : null}
                </Grid>

            </Grid>
        </DialogContent>

    );
}

export default Vaccine;