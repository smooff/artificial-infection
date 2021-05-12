import React, {useEffect, useState} from 'react';
import {Button, Container, Dialog, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ScreenOrientation from "../screenOrientation";
import {getWindowDimensions} from "../../components/mapContainer/MapContainer";


function WelcomePage() {

    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    }

    const {height, width} = useWindowDimensions();

    const useStyles = makeStyles((theme) => ({
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
        titulok: {
            color: 'white',
            opacity: 0.8,
        },
        podtitulok: {
            color: '#F8F8FF',
            opacity: 0.7,
        },
        titulokWrapper: {
            marginTop: "10%"
        },
        titulokWrapperMobile: {}
    }));
    const classes = useStyles();

    //invite modal
    const [openInviteModal, setOpenInviteModal] = useState(true);
    const handleCloseInviteModal = () => {
        setOpenInviteModal(false);
    };

    return (
        <div className="welcomePageCss">
            <Container fixed>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={height > 360 ? 5 : 1}
                >
                    <Grid item xs={12} className={height > 280 ? classes.titulokWrapper : classes.titulokWrapperMobile}>
                        <Typography variant={width < 400 ? "h2" : width < 820 ? "h3" : "h1"} component="h2"
                                    className={classes.titulok}>
                            Bakalárska práca
                        </Typography>
                        <Typography variant={width < 400 ? "h3" : width < 820 ? "h4" : "h2"} component="h2"
                                    className={classes.podtitulok}>
                            Strategická hra založená na simulácii epidémie
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Link to="/game">
                            <Button variant="contained">Hrať hru</Button>
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Button size={"small"} variant="contained">Ako hrať?</Button>
                    </Grid>
                </Grid>

                <Dialog fullWidth={true} maxWidth={"xs"}
                        aria-labelledby="customized-dialog-title"
                        open={openInviteModal}>
                    <Grid className={classes.textCentering}>
                        UPOZORNENIE</Grid>
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
                <ScreenOrientation/>
            </Container>

        </div>
    );
}

export default WelcomePage;
