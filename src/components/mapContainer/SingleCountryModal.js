import React from 'react';
import {
    Dialog,
    DialogContent, DialogTitle,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {useRecoilState} from "recoil";
import {mapContainerState} from "./MapContainerState";


function SingleCountryModal(props) {
    const useStyles = makeStyles((theme) => ({
        textCentering:{
            textAlign: "center",
            fontSize:"20px",
        }
    }));

    const classes = useStyles();

    const [allCountries, ] = useRecoilState(mapContainerState);


    return (
        <DialogContent className={classes.textCentering} dividers>
            <DialogTitle id="customized-dialog-title" >
                {allCountries[props.singleCountryData].NAME}
            </DialogTitle>

            <Divider/>

            <Typography gutterBottom>
              Populácia: {allCountries[props.singleCountryData].Population}
            </Typography>

            <Divider/>
            <Grid container>
                <Grid item xs={12}>
                    Náchylní: {allCountries[props.singleCountryData].Susceptible}
                </Grid>
                <Grid item xs={12}>
                    Infekční: {allCountries[props.singleCountryData].Infectious}
                </Grid>
                <Grid item xs={12}>
                    Zotavení: {allCountries[props.singleCountryData].Recovered}
                </Grid>
                <Grid item xs={12}>
                    Zosnulí: {allCountries[props.singleCountryData].Deceased}
                </Grid>
            </Grid>


        </DialogContent>

    );
}

export default SingleCountryModal;