import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, Grid, Modal} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilState} from "recoil";
import {GameCurrencyState} from "../../../data/GameCurrencyState.js";
import {HromadneOblastneOpatreniaState} from "./HromadneOblastneOpatreniaState";


function KartaHromadneOblastneOpatrenia(props) {
    const useStyles = makeStyles((theme) => ({
        actionButtons: {
            textAlign: "center",
        },
        activationButtons: {
            textAlign: "center",
            marginTop: "6px"
        },
        cards: {
            margin: "4px",
            backgroundColor: "ghostwhite"
        },
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }

    }));
    const classes = useStyles();

    useEffect(() => console.log(props.regionEN), [props.regionEN]);

    //modal po aktivacii opatrenia
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    function getModalStyle() {
        return {
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
        };
    }

    const [modalRegion, setModalRegion] = useState();
    const [modalMessage, setModalMessage] = useState();


    //herna mena
    const [gameCurrency, setGameCurrency] = useRecoilState(GameCurrencyState);

    //data s opatreniami
    const [measuresActualState, setmeasuresActualState] = useRecoilState(HromadneOblastneOpatreniaState);

    //sprava pre jednotlive opatrenie
    const [text, setText] = useState("");

    const [showResults1, setShowResults1] = React.useState(false);
    const [showResults2, setShowResults2] = React.useState(false);
    const [showResults3, setShowResults3] = React.useState(false);

    const [button1Color, setbutton1Color] = useState("default");
    const [button2Color, setbutton2Color] = useState("default");
    const [button3Color, setbutton3Color] = useState("default");

    const handleButtonClick = (textMessage, buttonNumber) => {
        setText(textMessage);


        if (buttonNumber === 1) {
            setbutton1Color("primary");
            setbutton2Color("default");
            setbutton3Color("default");

            setShowResults1(true);
            setShowResults2(false);
            setShowResults3(false);
        } else if (buttonNumber === 2) {
            setbutton1Color("default");
            setbutton2Color("primary");
            setbutton3Color("default");

            setShowResults1(false);
            setShowResults2(true);
            setShowResults3(false);
        } else if (buttonNumber === 3) {
            setbutton1Color("default");
            setbutton2Color("default");
            setbutton3Color("primary");

            setShowResults1(false);
            setShowResults2(false);
            setShowResults3(true);
        }

    }

    const Results = (c) => (
        <Grid className={classes.activationButtons}>
            {c.cislo === 1 ? <div><Button onClick={handleActivationClickBorders}>Aktivovať</Button><Button
                onClick={handleDeactivationClickBorders}>Dektivovať</Button></div> : c.cislo === 2 ?
                <div><Button onClick={handleActivationClickAirports}>Aktivovať</Button><Button
                    onClick={handleDeactivationClickAirports}>Dektivovať</Button></div> : c.cislo === 3 ?
                    <div><Button onClick={handleActivationClickSeaports}>Aktivovať</Button><Button
                        onClick={handleDeactivationClickSeaports}>Deaktivovať</Button></div> : <div/>}


        </Grid>
    )

    const handleActivationClickBorders = () => {

        if (measuresActualState[props.regionEN].bordersPrice <= gameCurrency) {
            if (measuresActualState[props.regionEN].borders !== 1) {
                setmeasuresActualState((prevStats) => {
                    return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], borders: 1}};
                });
                setGameCurrency(prev => (prev - 5));

                //alert o vykonani
                setModalRegion(props.regionName);
                setModalMessage("Aktivoval si uzavretie hraníc pre daný región.")
                handleOpen();
            }
        }
    }

    const handleDeactivationClickBorders = () => {
        if (measuresActualState[props.regionEN].borders === 1) {
            setmeasuresActualState((prevStats) => {
                return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], borders: 0}};
            });
            setGameCurrency(prev => (prev + 5));

            //alert o vykonani
            setModalRegion(props.regionName);
            setModalMessage("Deaktivoval si uzavretie hraníc pre daný región.")
            handleOpen();
        }
    }

    const handleActivationClickAirports = () => {
        if (measuresActualState[props.regionEN].airportsPrice <= gameCurrency) {
            if (measuresActualState[props.regionEN].airports !== 1) {
                setmeasuresActualState((prevStats) => {
                    return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], airports: 1}};
                });
                setGameCurrency(prev => (prev - 4));

                //alert o vykonani
                setModalRegion(props.regionName);
                setModalMessage("Aktivoval si uzavretie letísk pre daný región.")
                handleOpen();
            }
        }
    }

    const handleDeactivationClickAirports = () => {
        if (measuresActualState[props.regionEN].airports === 1) {
            setmeasuresActualState((prevStats) => {
                return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], airports: 0}};
            });
            setGameCurrency(prev => (prev + 4));

            //alert o vykonani
            setModalRegion(props.regionName);
            setModalMessage("Deaktivoval si uzavretie letísk pre daný región.")
            handleOpen();
        }
    }

    const handleActivationClickSeaports = () => {
        if (measuresActualState[props.regionEN].seaportsPrice <= gameCurrency) {
            if (measuresActualState[props.regionEN].seaports !== 1) {
                setmeasuresActualState((prevStats) => {
                    return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], seaports: 1}};
                });
                setGameCurrency(prev => (prev - 3));

                //alert o vykonani
                setModalRegion(props.regionName);
                setModalMessage("Aktivoval si uzavretie ľodných prístavov pre daný región.")
                handleOpen();
            }
        }
    }

    const handleDeactivationClickSeaports = () => {
        if (measuresActualState[props.regionEN].seaports === 1) {
            setmeasuresActualState((prevStats) => {
                return {...prevStats, [props.regionEN]: {...prevStats[props.regionEN], seaports: 0}};
            });
            setGameCurrency(prev => (prev + 3));

            //alert o vykonani
            setModalRegion(props.regionName);
            setModalMessage("Deaktivoval si uzavretie ľodných prístavov pre daný región.")
            handleOpen();
        }
    }

    const bordersButtonActivated = () => {
        console.log("rernder");
        if (measuresActualState[props.regionEN].borders === 1) {
            return "contained";
        } else {
            return "outlined";
        }
    }

    const airportsButtonActivated = () => {
        if (measuresActualState[props.regionEN].airports === 1) {
            return "contained";
        } else {
            return "outlined";
        }
    }

    const seaportsButtonActivated = () => {
        if (measuresActualState[props.regionEN].seaports === 1) {
            return "contained";
        } else {
            return "outlined";
        }
    }


    const body = (
        <div style={getModalStyle()} className={classes.paper}>
            <h2>{modalRegion}</h2>
            <p>
                {modalMessage}
            </p>
        </div>
    );

    return (


        <Card className={classes.cards}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            <CardContent>
                <Grid container direction="column">
                    <Grid item xs={12}>
                        <Typography className={classes.title} color="textPrimary" gutterBottom>
                            {text}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Grid container className={classes.actionButtons}>
                            <Grid item xs={3}>
                                <Typography className={classes.title} color="textPrimary" gutterBottom>
                                    {props.regionName}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Button id={props.regionEN} color={button1Color}
                                        variant={measuresActualState[props.regionEN].borders === 1 ? "contained" : "outlined"}
                                        onClick={() => {
                                            handleButtonClick(props.measurestext1, 1);
                                        }}>
                                    Hranice
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button color={button2Color}
                                        variant={measuresActualState[props.regionEN].airports === 1 ? "contained" : "outlined"}
                                        onClick={() => {
                                            handleButtonClick(props.measurestext2, 2);
                                        }}>
                                    Letiská
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button color={button3Color}
                                        variant={measuresActualState[props.regionEN].seaports === 1 ? "contained" : "outlined"}
                                        onClick={() => {
                                            handleButtonClick(props.measurestext3, 3);
                                        }}>
                                    Prístavy
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {showResults1 ? <Results cislo={1}/> : null}
                        {showResults2 ? <Results cislo={2}/> : null}
                        {showResults3 ? <Results cislo={3}/> : null}
                    </Grid>
                </Grid>
            </CardContent>

        </Card>

    );
}

export default KartaHromadneOblastneOpatrenia;