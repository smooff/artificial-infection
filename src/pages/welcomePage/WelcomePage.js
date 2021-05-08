import React, {useState} from 'react';
import {Button, Container, createMuiTheme, Dialog, ThemeProvider, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import Divider from "@material-ui/core/Divider";


const theme = createMuiTheme({
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 20,
        h1: {
            color: 'white',
            opacity: 0.8,
        },
        h2: {
            color: '#F8F8FF',
            opacity: 0.7,
        },
    },
});

function WelcomePage() {
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
                    spacing={5}
                >
                    <Grid item xs={12}>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h1" component="h2">
                                Bakalárska práca
                            </Typography>
                            <Typography variant="h2" component="h2">
                                Strategická hra založená na simulácii epidémie
                            </Typography>
                        </ThemeProvider>
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
            </Container>
        </div>
    );
}

export default WelcomePage;
