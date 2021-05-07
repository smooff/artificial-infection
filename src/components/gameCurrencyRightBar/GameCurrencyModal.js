import React from 'react';
import {Button, Card, CardContent, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

function GameCurrencyModal({mena}) {

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Typography>Aktuálna herná mena: {mena}</Typography>

                        </Grid>
                        <Grid item xs={3}>
                            Nákup zdravotníkov
                            <Button>
                                Zdravotníci
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            Permanentné zníženie šírenia
                            <Button>
                                Aktivuj
                            </Button>
                        </Grid>
                        <Grid item xs={3}>
                            Permanentné zníženie smrtnosti
                            <Button>
                                Aktivuj
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
}

export default GameCurrencyModal;
