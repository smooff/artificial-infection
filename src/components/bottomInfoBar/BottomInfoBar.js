import React, {useEffect, useRef, useState} from 'react';
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilValue} from "recoil";


function BottomInfoBar({name, dataSelector}) {
    const useStyles = makeStyles((theme) => ({
        root: {},

    }));
    const classes = useStyles();

    const data = useRecoilValue(dataSelector);

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {name} count: {new Intl.NumberFormat('de-DE').format(data)}
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