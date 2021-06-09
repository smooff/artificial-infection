import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

/**
 * Renders a <PriceInfoSingleMeasurement /> component
 * component is used to display text and price in modal with measurements, after clicking specific measurement
 * @param props
 * @param props.price - price of specific measurement
 * @param props.text - text about specific measurement
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function PriceInfoSingleMeasurement({price, text}) {
    return (
        <div>
            <Grid item xs={12}>
                <Typography color="secondary" gutterBottom display={"inline"}>
                    Popis: {" "}
                </Typography>
                <Typography gutterBottom display={"inline"}>
                    {text}
                </Typography>

                <br/>

                <Typography color="secondary" gutterBottom display={"inline"}>
                    Cena: {" "}
                </Typography>
                <Typography gutterBottom display={"inline"}>
                    {price}
                </Typography>
            </Grid>
        </div>
    );
}

export default PriceInfoSingleMeasurement;
