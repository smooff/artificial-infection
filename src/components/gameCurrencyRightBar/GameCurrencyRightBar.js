import React from 'react';
import {Box, Button, CircularProgress, Dialog, DialogTitle, Tooltip} from "@material-ui/core";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../data/currencies/GameCurrencyState";
import {ClickableGameCurrencyState} from "../../data/currencies/ClickableGameCurrencyState";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import GameCurrencyModal from "./GameCurrencyModal";
import {LocalAtmTwoTone} from "@material-ui/icons";

/**
 * Renders a <GameCurrencyRightBar /> component
 * component is used to display game currency value and clickable game currency button
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function GameCurrencyRightBar() {

    const useStyles = makeStyles(() => ({
        progressBar: {
            marginLeft: "15px",
        }, buttonText: {
            textTransform: 'none',
        }, drawerIcons: {
            marginRight: "20px"
        }
    }));
    const classes = useStyles();

    // modal
    const [openCurrency, setOpenCurrency] = React.useState(false);
    const handleClickOpenCurrency = () => {
        setOpenCurrency(true);
    };
    const handleCloseCurrency = () => {
        setOpenCurrency(false);
    };

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
        <Grid container>
            <Grid item xs={6}>
                <Typography>
                    <Tooltip title="Herná mena">
                        <Button onClick={handleClickOpenCurrency} className={classes.buttonText}>
                            <LocalAtmTwoTone className={classes.drawerIcons}/>
                            {gameCurrency}</Button>
                    </Tooltip>
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Tooltip title="Herná mena na prevzatie">
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
                </Tooltip>
            </Grid>
            <Dialog fullWidth={true} maxWidth={"sm"} scroll={"paper"} onClose={handleCloseCurrency}
                    open={openCurrency}>
                <DialogTitle onClose={handleCloseCurrency}>
                    Herná mena
                </DialogTitle>
                <GameCurrencyModal/>
            </Dialog>
        </Grid>
    );
}

export default GameCurrencyRightBar;
