import React from 'react';
import {Button, Container, createMuiTheme, Typography, ThemeProvider } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         padding: theme.spacing(2),
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));

const theme = createMuiTheme({
    typography: {
        // In Chinese and Japanese the characters are usually larger,
        // so a smaller fontsize may be appropriate.
        fontSize: 20,
        h1: {
            color: 'white',
            opacity:0.8,
        },
        h2:{
            color:'#F8F8FF',
            opacity:0.7,
        },
    },
});

//resetuje aplikaciu (ak pouzivatel isiel z mainpage do welcomepage a spustil hru)
function refreshPage() {
    window.location.reload(false);
}


function WelcomePage(props) {
    // const classes = useStyles();
    return (
        <div className="welcomePageCss">
        <Container fixed >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                >
                    <Grid item xs={12}>
                        <ThemeProvider theme={theme}>
                        <Typography  variant="h1" component="h2">
                            Bakalárska práca
                        </Typography>
                        <Typography variant="h2" component="h2">
                           Strategická hra založená na simulácii epidémie
                        </Typography>
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={refreshPage} variant="contained">
                            <Link to="/game">Play game</Link>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained">Guide</Button>
                    </Grid>
                </Grid>

        </Container>
        </div>
        );
}

export default WelcomePage;