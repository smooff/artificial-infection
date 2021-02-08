import React, {useEffect, useRef, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapContainer from "../../components/mapContainer/MapContainer";

import {
    BottomNavigation,
    BottomNavigationAction,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';


import FolderIcon from '@material-ui/icons/Folder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ReactTooltip from "react-tooltip";
import DataContainer from "../../components/dataContainer/DataContainer";
import {useRecoilState} from "recoil";
import {mapContainerState} from "../../components/mapContainer/MapContainerState";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));


function MainPage(props) {

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    const classes = useStyles();

    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


//modal
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //react-tooltip
    const [content, setContent] = useState("");


    //
    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);

    const valueChange = (countryName) => {
        const data = allCountries[countryName];

        setAllCountries({
            ...allCountries,
            ...{
                [countryName]: {...data, Infectious: infectiousIncrement}
            }
        });
    };

    const [infectiousIncrement, setInfectiousIncrement] = useState(0);
    const [selectedState, ] = useState(() => {
        const countryCodes = Object.keys(allCountries);
        const firstCountryIndex = Math.floor(Math.random() * countryCodes.length);
        return countryCodes[firstCountryIndex]
    });

    useInterval(() => {
        setInfectiousIncrement(infectiousIncrement + 1000000);
        valueChange(selectedState);

    }, 1000);


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                {/*<Toolbar>*/}
                {/*    <Typography variant="h6" noWrap>*/}
                {/*        Main Page*/}
                {/*    </Typography>*/}
                {/*</Toolbar>*/}
            </AppBar>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    {/*<MapContainer/>*/}
                    <MapContainer setTooltipContent={setContent}/>
                    <ReactTooltip>{content}</ReactTooltip>

                    <DataContainer/>

                    <Grid item xs={12}>
                        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                            <BottomNavigationAction label="Susceptible" value="susceptible" icon={<FolderIcon/>}/>
                            <BottomNavigationAction label="Infected" value="infected" icon={<FolderIcon/>}/>
                            <BottomNavigationAction label="Recovered" value="recovered" icon={<FolderIcon/>}/>
                            <BottomNavigationAction label="Deceased" value="deceased" icon={<FolderIcon/>}/>
                        </BottomNavigation>
                    </Grid>
                </Grid>
            </main>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="right"
            >
                <div className={classes.toolbar}/>
                <Divider/>
                <List>
                    {['Date', 'Game Speed', 'Trust Level', 'Game Money'].map((text, index) => (
                        <ListItem button key={text}>
                            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {[1, 2, 3, 4, 5, 6].map((text, index) => (
                        <ListItem button key={text}>
                            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                            <ListItemText primary={text} onClick={handleClickOpen}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Modal title
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                        lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>

        </div>


    );
}

export default MainPage;