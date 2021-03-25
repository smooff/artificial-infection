import React from 'react';
import {
    DialogContent,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilState} from "recoil";
import {HromadneOblastneOpatreniaState} from "./hromadneOblastneOpatrenia/HromadneOblastneOpatreniaState";
import Divider from "@material-ui/core/Divider";


function ZoznamOpatreni(props) {
    const useStyles = makeStyles((theme) => ({}));
    const classes = useStyles();

    //data s opatreniami
    const [measuresActualState, setmeasuresActualState] = useRecoilState(HromadneOblastneOpatreniaState);

    return (

        <DialogContent dividers>
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
            </Typography >

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

        </DialogContent>

    );
}

export default ZoznamOpatreni;