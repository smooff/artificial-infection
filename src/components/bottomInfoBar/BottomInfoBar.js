import React, {useEffect, useRef, useState} from 'react';
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";


function BottomInfoBar(props) {
    const useStyles = makeStyles((theme) => ({
        root: {},

    }));
    const classes = useStyles();

    let countType;
    if (props.name === "Susceptibles") {
        countType = props.compartmentValue.SusceptiblesCount;
    } else if (props.name === "Infectious") {
        countType = props.compartmentValue.InfectiousCount;
    } else if (props.name === "Recovered") {
        countType = props.compartmentValue.RecoveredCount;
    } else if (props.name === "Deceased") {
        countType = props.compartmentValue.DeceasedCount;
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
                        <br/>
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>

            </Card>

        </div>
    );
}

export default BottomInfoBar;