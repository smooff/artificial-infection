import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    DialogContent,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {PlayArrow} from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import KartaHromadneOblastneOpatrenia from "./KartaHromadneOblastneOpatrenia";
import Divider from "@material-ui/core/Divider";


function HromadneOblastneOpatrenia(props) {
    const useStyles = makeStyles((theme) => ({}));
    const classes = useStyles();


    const [linkText, setLinkText] = useState();
    const changeLinkText = (text) => {
        setLinkText(text);
    };
    const [linkPrice, setLinkPrice] = useState();
    const changeLinkPrice = (price) => {
        setLinkPrice(price);
    };
    return (

        <DialogContent dividers>
            <Typography gutterBottom>
                Aktiváciou týchto opatrení sa znižuje riziko šírenia nákazy na jednotlivých svetadieloch alebo
                celosvetovo.
                <Divider/>
                Popis: {linkText}
                <br/>
                Cena: {linkPrice}
            </Typography>

            {/*<FormControl style={{width:"85px"}}>*/}
            {/*    <InputLabel>Svetadiel</InputLabel>*/}
            {/*    <Select>*/}

            {/*        <MenuItem onClick={handleEuropeClick}>Európa</MenuItem>*/}
            {/*        <MenuItem onClick={handleAmericaClick}>Amerika</MenuItem>*/}
            {/*        <MenuItem onClick={handleAfricaClick}>Afrika</MenuItem>*/}
            {/*        <MenuItem onClick={handleAsiaClick}>Ázia</MenuItem>*/}
            {/*        <MenuItem onClick={handleAustraliaOceaniaClick}>Austrália a Oceánia</MenuItem>*/}
            {/*        <MenuItem onClick={handleAntarticaClick}>Antarktída</MenuItem>*/}
            {/*    </Select>*/}
            {/*</FormControl>*/}
            {/*{ showResultsEurope ? <KartaHromadneOblastneOpatrenia regionName="Európa" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                        measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                        measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAmerica ?  <KartaHromadneOblastneOpatrenia regionName="Amerika" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                        measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                        measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAfrica ?   <KartaHromadneOblastneOpatrenia regionName="Afrika" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                        measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                        measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAsia ?   <KartaHromadneOblastneOpatrenia regionName="Ázia" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                        measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                        measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAustraliaOceania ?   <KartaHromadneOblastneOpatrenia regionName="Austrália a Oceánia" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                      measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                      measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}
            {/*{ showResultsAntartica ?    <KartaHromadneOblastneOpatrenia regionName="Antarktída" measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."*/}
            {/*                                                                   measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."*/}
            {/*                                                                   measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."*/}
            {/*/> : null }*/}

            <KartaHromadneOblastneOpatrenia regionEN="Europe" regionName="Európa"
                                            measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                            measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                            measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                            changeLinkText={changeLinkText}
                                            changeLinkPrice={changeLinkPrice}
            />
            <KartaHromadneOblastneOpatrenia regionEN="Americas" regionName="Amerika"
                                            measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                            measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                            measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                            changeLinkText={changeLinkText}
                                            changeLinkPrice={changeLinkPrice}
            />
            <KartaHromadneOblastneOpatrenia regionEN="Africa" regionName="Afrika"
                                            measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                            measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                            measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                            changeLinkText={changeLinkText}
                                            changeLinkPrice={changeLinkPrice}
            />
            <KartaHromadneOblastneOpatrenia regionEN="Asia" regionName="Ázia"
                                            measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                            measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                            measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                            changeLinkText={changeLinkText}
                                            changeLinkPrice={changeLinkPrice}
            />
            <KartaHromadneOblastneOpatrenia regionEN="Oceania" regionName="Austrália a Oceánia"
                                            measurestext1="Uzatvoria sa hranice, čím sa medzi susednými krajinami potenciálne zníži šírenie vírusu."
                                            measurestext2="Uzatvoria sa letiská, čím sa medzi krajinami potenciálne zníži šírenie vírusu leteckou dopravou."
                                            measurestext3="Uzatvoria sa prístavy, čím sa medzi krajinami potenciálne zníži šírenie vírusu lodnou dopravou."
                                            changeLinkText={changeLinkText}
                                            changeLinkPrice={changeLinkPrice}
            />
        </DialogContent>

    );
}

export default HromadneOblastneOpatrenia;