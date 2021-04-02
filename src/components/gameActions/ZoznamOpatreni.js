import React from 'react';
import {
    DialogContent, ListItem, ListItemText,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilState, useRecoilValue} from "recoil";
import {HromadneOblastneOpatreniaState} from "./hromadneOblastneOpatrenia/HromadneOblastneOpatreniaState";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";


function ZoznamOpatreni({dataSelector, dataSelectorCount}) {
    const useStyles = makeStyles((theme) => ({}));
    const classes = useStyles();

    //data s opatreniami
    const [measuresActualState, setmeasuresActualState] = useRecoilState(HromadneOblastneOpatreniaState);

    const data = useRecoilValue(dataSelector);
    const count = useRecoilValue(dataSelectorCount);

    return (

        <DialogContent dividers>
            <Grid container direction={"row"}>
                <Grid item xs={6} direction={"row"}>
                    Infikovnané krajiny:{count[0]} Neinfikované krajiny:{count[1]}
                    {data.map((item) => (
                        <p style={(`${item.countryInfectivity}`==1) ? {color:"red"} : {color:"green"}}>{`${item.countryName}: ${item.countryInfectivity}`}</p>
                    ))}
                </Grid>

                <Grid item xs={6} direction={"row"}>
                    <Typography>
                        Európa
                    </Typography>
                    <Typography>
                        Hranice {measuresActualState.Europe.borders}
                    </Typography>
                    <Typography>
                        Letiská {measuresActualState.Europe.airports}
                    </Typography>
                    <Typography gutterBottom>
                        Prístavy {measuresActualState.Europe.seaports}
                    </Typography>

                    <Divider/>

                    <Typography>
                        Amerika
                    </Typography>
                    <Typography>
                        Hranice {measuresActualState.Americas.borders}
                    </Typography>
                    <Typography>
                        Letiská {measuresActualState.Americas.airports}
                    </Typography>
                    <Typography>
                        Prístavy {measuresActualState.Americas.seaports}
                    </Typography>
                    <Divider/>

                    <Typography>
                        Afrika
                    </Typography>
                    <Typography>
                        Hranice {measuresActualState.Africa.borders}
                    </Typography>
                    <Typography>
                        Letiská {measuresActualState.Africa.airports}
                    </Typography>
                    <Typography>
                        Prístavy {measuresActualState.Africa.seaports}
                    </Typography>
                    <Divider/>

                    <Typography>
                        Ázia
                    </Typography>
                    <Typography>
                        Hranice {measuresActualState.Asia.borders}
                    </Typography>
                    <Typography>
                        Letiská {measuresActualState.Asia.airports}
                    </Typography>
                    <Typography>
                        Prístavy {measuresActualState.Asia.seaports}
                    </Typography>
                    <Divider/>

                    <Typography>
                        Austrália a Oceánia
                    </Typography>
                    <Typography>
                        Hranice {measuresActualState.Oceania.borders}
                    </Typography>
                    <Typography>
                        Letiská {measuresActualState.Oceania.airports}
                    </Typography>
                    <Typography>
                        Prístavy {measuresActualState.Oceania.seaports}
                    </Typography>
                    <Divider/>

                    <Typography>
                        Antarktída
                    </Typography>
                    <Typography>
                        Hranice {measuresActualState.Antarctic.borders}
                    </Typography>
                    <Typography>
                        Letiská {measuresActualState.Antarctic.airports}
                    </Typography>
                    <Typography>
                        Prístavy {measuresActualState.Antarctic.seaports}
                    </Typography>
                    <Divider/>
                </Grid>
            </Grid>
        </DialogContent>

    );
}

export default ZoznamOpatreni;