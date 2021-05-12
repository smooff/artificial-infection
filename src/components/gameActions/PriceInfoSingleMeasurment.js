import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function PriceInfoSingleMeasurment({price,text}) {
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

export default PriceInfoSingleMeasurment;