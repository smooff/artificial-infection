import React from 'react';
import {Button, Container, Typography} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from "react-router-dom";
import {useRecoilState} from "recoil";
import {mapContainerState} from "../../components/mapContainer/MapContainerState";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function WelcomePage(props) {
    const classes = useStyles();
    return (
        <Container fixed>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={5}
                >
                    <Grid item xs={12}>
                        <Typography variant="h1" component="h2">
                            Bakalarska praca - Simulacna hra
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained">
                            <Link to="/game">Play game</Link>
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained">Guide</Button>
                    </Grid>
                </Grid>

        </Container>

        );
}

export default WelcomePage;