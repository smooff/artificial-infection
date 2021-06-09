import React, {useEffect, useState} from 'react';
import {Box, Grid, LinearProgress, Typography} from "@material-ui/core";
import {useRecoilValue} from "recoil";

/**
 * Renders a <GameTrust /> component
 * component is used to display game trust
 * @param props
 * @param props.trustState - contains game trust value
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
function GameTrust({trustState}) {

    const trust = useRecoilValue(trustState);

    const [count, setCount] = useState(0);

    useEffect(() => {
        return () => {
            setCount(1);
            setTimeout(function () {
                setCount(0);
            }, 500);
        };
    }, [trust])

    return (
        <Grid>
            <Typography>
                Dôvera
            </Typography>
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate"
                                    value={trust > 100 ? 100 : trust}
                                    color={count === 1 ? 'secondary' : 'primary'
                                    }/>
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">
                        {trust}
                    </Typography>
                </Box>
            </Box>
        </Grid>
    );
}

export default GameTrust;
