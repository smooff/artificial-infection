import React, {useEffect, useState} from 'react';
import {Dialog, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


export function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export function useWindowDimensions() {
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

function ResponsiveDesign() {

    const {height, width} = useWindowDimensions();

    const useStyles = makeStyles(() => ({
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
            <Dialog onClose={height < width && width >= 700} open={width < height && width < 700}>
                <Typography className={classes.root} variant={"h5"} color={"secondary"}>Pre používanie aplikácie otočte
                    zariadenie na šírku (horizontálne)</Typography>
            </Dialog>
        </div>
    );
}

export default ResponsiveDesign;
