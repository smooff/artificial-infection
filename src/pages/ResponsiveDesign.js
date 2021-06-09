import React, {useEffect, useState} from 'react';
import {Dialog, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

/**
 * function for getting window dimensions
 * @returns {{width: number, height: number}}
 */
export function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

/**
 * function for handling resizing window
 * @returns {{width: number, height: number}}
 */
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

/**
 * Renders a ResponsiveDesign component.
 * Component is used to display warning, if device has wrong screen orientation.
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
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
