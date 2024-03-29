import React from 'react';
import {Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilValue} from "recoil";

/**
 * Renders a BottomInfoBar component.
 * Component is used to display global compartment statistics
 * @param props
 * @param props.name - specifies compartment type
 * @param props.dataSelector - data for specified compartment type
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function BottomInfoBar({name, dataSelector}) {
    const useStyles = makeStyles(() => ({
        title: {
            fontSize: "20px"
        }
    }));
    const classes = useStyles();

    const data = useRecoilValue(dataSelector);

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {new Intl.NumberFormat('de-DE').format(data)}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default BottomInfoBar;
