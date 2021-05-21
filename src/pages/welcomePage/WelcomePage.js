import React, {useState} from 'react';
import {Button, Container, Dialog, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ResponsiveDesign, {useWindowDimensions} from "../ResponsiveDesign";
import TutorialImageCarousel from "../../components/tutorialImageCarousel/TutorialImageCarousel";


function WelcomePage() {

    const {height, width} = useWindowDimensions();

    const useStyles = makeStyles(() => ({
        inviteModal: {
            padding: "10px"
        }, textCentering: {
            textAlign: "center",
            fontSize: "20px",
            color: "#3f51b5"
        },
        acceptButton: {
            textAlign: "center",
            fontSize: "20px",

        },
        titleText: {
            color: 'white',
            opacity: 0.8,
        },
        subTitleText: {
            color: '#F8F8FF',
            opacity: 0.7,
        },
        titleTextWrapper: {
            marginTop: "10%"
        },
        titleTextWrapperMobile: {},
        buttons:{
            minWidth:"100px"
        },
        aboutInfo:{
            marginLeft:"10px"
        }
    }));
    const classes = useStyles();

    //invite modal
    const [openInviteModal, setOpenInviteModal] = useState(true);
    const handleCloseInviteModal = () => {
        setOpenInviteModal(false);
    };

    //tutorial modal
    const [openTutorial, setOpenTutorial] = React.useState(false);
    const handleClickOpenTutorial = () => {
        setOpenTutorial(true);
    };
    const handleClickCloseTutorial = () => {
        setOpenTutorial(false);
    };

    const [openAbout, setOpenAbout] = React.useState(false);
    const handleClickOpenAbout = () => {
        setOpenAbout(true);
    };
    const handleClickCloseAbout = () => {
        setOpenAbout(false);
    };

    return (
        <div className="welcomePageCss">
            <Container fixed>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={height > 380 ? 5 : 1}
                >
                    <Grid item xs={12}
                          className={height > 300 ? classes.titleTextWrapper : classes.titleTextWrapperMobile}>
                        <Typography variant={width < 400 ? "h2" : width < 820 ? "h3" : "h1"} component="h2"
                                    className={classes.titleText}>
                            AI: Artificial Infection
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/game">
                            <Button variant="contained" className={classes.buttons}>Hrať hru</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size={"small"} variant="contained" onClick={handleClickOpenTutorial} className={classes.buttons}>Ako hrať?</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button size={"small"} variant="contained" onClick={handleClickOpenAbout} className={classes.buttons}>O aplikácii</Button>
                    </Grid>
                </Grid>

                <Dialog fullWidth={true} maxWidth={"xs"} open={openInviteModal}>
                    <Grid className={classes.textCentering}>
                        UPOZORNENIE
                    </Grid>
                    <Grid className={classes.inviteModal}>
                        Táto webová aplikácia je určená na účely zábavy, nie ako reálny pandemický simulátor.
                        <Divider/>
                        Šírenie vírusu a jeho následné spomaľovanie/zastavenie síce je inšpirované z rôznych štúdií,
                        avšak určite nie je odrazom reálneho sveta.
                    </Grid>
                    <Button color={"primary"} variant={"contained"} className={classes.acceptButton}
                            onClick={handleCloseInviteModal}>
                        Prečítal som a rozumiem
                    </Button>
                </Dialog>
                <ResponsiveDesign/>
            </Container>

            <Dialog fullWidth={true} maxWidth={"lg"} onClose={handleClickCloseTutorial} open={openTutorial}>
                <TutorialImageCarousel/>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={"xs"} onClose={handleClickCloseAbout} open={openAbout}>
                <Grid className={classes.aboutInfo}>
                <Typography variant={"h4"}>
                    Bakalárska práca:
                </Typography>
                <Typography variant={"h4"}>
                    Strategická hra založená na simulácii epidémie
                </Typography>
                <Divider/>
                    <br/>
                    <Typography>
                        Webová aplikácia AI: Artificial Infection je open-source hra založená na viacerých strategických sci-fi mechanikách.
                    </Typography>
                    <br/>
                    <Divider/>

                <Typography variant={"h6"}>
                   Autor práce: Šimon Zaujec
                </Typography>
                <Typography variant={"h6"}>
                    Vedúci práce: Ing. Roderik Ploszek
                </Typography>
                </Grid>
            </Dialog>
        </div>
    );
}

export default WelcomePage;
