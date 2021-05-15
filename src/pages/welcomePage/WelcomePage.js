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
                            Bakalárska práca
                        </Typography>
                        <Typography variant={width < 300 ? "h3" : width < 820 ? "h4" : "h2"} component="h2"
                                    className={classes.subTitleText}>
                            Strategická hra založená na simulácii epidémie
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/game">
                            <Button variant="contained">Hrať hru</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Button size={"small"} variant="contained" onClick={handleClickOpenTutorial}>Ako hrať?</Button>
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
        </div>
    );
}

export default WelcomePage;
