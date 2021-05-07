import React from 'react';
import {Box, Button, CircularProgress} from "@material-ui/core";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../data/currencies/GameCurrencyState";
import {ClickableGameCurrencyState} from "../../data/currencies/ClickableGameCurrencyState";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

function GameCurrencyRightBar() {

    const useStyles = makeStyles((theme) => ({
        progressBar: {
            marginLeft: "15px",
        }
    }));
    const classes = useStyles();

    //game currency
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //temporary game currency
    const [clickableGameCurrency, setClickableGameCurrency] = useRecoilState(ClickableGameCurrencyState);

    if (clickableGameCurrency > 10) {
        setClickableGameCurrency(10);
    }

    function addCurrency() {
        if (clickableGameCurrency !== 0) {
            setGameCurrency(prev => (prev + clickableGameCurrency));
            setClickableGameCurrency(0);
        }
    }

    return (
        <>
            Herná mena: {gameCurrency}
            <Button onClick={addCurrency} className={classes.progressBar}>
                <Box position="relative" display="inline-flex">
                    <CircularProgress variant="determinate" value={clickableGameCurrency * 10}
                                      color={clickableGameCurrency === 10 ? "secondary" : "primary"}/>
                    <Box
                        top={0}
                        left={0}
                        bottom={0}
                        right={0}
                        position="absolute"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="caption" component="div" color="textSecondary">
                            {clickableGameCurrency}
                        </Typography>
                    </Box>
                </Box>
            </Button>
        </>
    );
}

export default GameCurrencyRightBar;
