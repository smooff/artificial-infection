import React from 'react';
import {Button, Card, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

/**
 * Renders a <PagesNavigationModal /> component
 * component is used to display navigation between pages
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function PagesNavigationModal() {

    const useStyles = makeStyles(() => ({
        itemsAlign: {
            textAlign: "center",
        },
        actionButtons: {
            textAlign: "center",
            marginTop: "10px",
        }
    }));
    const classes = useStyles();

    //resetuje aplikaciu (ak pouzivatel isiel z mainpage do welcomepage)
    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 350);
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} className={classes.itemsAlign}>
                            <Typography>
                                Návrat na úvod
                            </Typography>
                        </Grid>
                        <Grid xs={12} className={classes.actionButtons}>
                            <Link to="/" onClick={refreshPage}>
                                <Button variant="contained">Ukončiť hru</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default PagesNavigationModal;
