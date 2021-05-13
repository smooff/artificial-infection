import React, {useEffect, useState} from 'react';
import {getWindowDimensions} from "../components/mapContainer/MapContainer";
import {Dialog, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

function ScreenOrientation() {
    function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    }

    const {height, width} = useWindowDimensions();

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: width * 0.9,
            maxHeight: height * 0.9,
            padding: "0",
            marginLeft: "10px"
        },
    }));

    const classes = useStyles();
    return (
        <div>
            <Dialog onClose={height < width} open={width < height}>
                <Typography className={classes.root} variant={"h5"} color={"secondary"}>Pre používanie aplikácie otočte
                    zariadenie na šírku (horizontálne)</Typography>
            </Dialog>
        </div>
    );
}

export default ScreenOrientation;
