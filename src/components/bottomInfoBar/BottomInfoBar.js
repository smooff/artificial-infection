import React, {useEffect, useRef, useState} from 'react';
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilState} from "recoil";
import {mapContainerState} from "../mapContainer/MapContainerState";


function BottomInfoBar(props) {
    const useStyles = makeStyles((theme) => ({
        root: {

        },

    }));
    const classes = useStyles();

    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
    const [SusceptiblesCount, setSusceptiblesCount] = useState(0);
    const [InfectiousCount, setInfectiousCount] = useState(0);
    const [RecoveredCount, setRecoveredCount] = useState(0);
    const [DeceasedCount, setDeceasedCount] = useState(0);

    useInterval(() => {
        let SusceptiblesCountInterval=0;
        let InfectiousCountInterval=0;
        let RecoveredCountInterval=0;
        let DeceasedCountInterval=0;



        Object.keys(allCountries).forEach(currentCountry => {
            SusceptiblesCountInterval += allCountries[currentCountry].Susceptible;
            InfectiousCountInterval += allCountries[currentCountry].Infectious;
            RecoveredCountInterval += allCountries[currentCountry].Recovered;
            DeceasedCountInterval += allCountries[currentCountry].Deceased;

        })


        setSusceptiblesCount(SusceptiblesCountInterval);
        setInfectiousCount(InfectiousCountInterval);
        setRecoveredCount(RecoveredCountInterval);
        setDeceasedCount(DeceasedCountInterval);

    }, 2000);
    let countType;
    if(props.name==="Susceptibles"){

        countType=SusceptiblesCount;
    }else if (props.name==="Infectious"){
        countType=InfectiousCount;
    }else if (props.name==="Recovered"){
        countType=RecoveredCount;
    }else if (props.name==="Deceased"){
        countType=DeceasedCount;
    }


    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {props.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.type} count: {new Intl.NumberFormat('de-DE').format(countType)}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>

            </Card>

        </div>
    );
}

export default BottomInfoBar;