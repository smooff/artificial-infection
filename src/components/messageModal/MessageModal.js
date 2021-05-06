import React from 'react';
import {Card, CardContent, ListItem, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilValue} from "recoil";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";


function MessageModal({dataSelector}) {
    const useStyles = makeStyles((theme) => ({
        title: {
            fontSize: "25px"
        },
        infectingColor: {
            backgroundColor: "#ffd8d4"
        },
        vaccineColor: {
            backgroundColor: "lightblue"
        },
        trustColor: {
            backgroundColor: "#d3ffe3"
        },
        messageText: {
            marginLeft: "5px",
            whiteSpace: 'pre-line'
        },
        messageTitle: {
            marginLeft: "5px",
            fontWeight: "bold"
        }

    }));
    const classes = useStyles();

    const data = useRecoilValue(dataSelector);

    function addDays(date, days) {
        date.setDate(date.getDate() + days);
        return date;
    }

    return (
        <div>
            <Card>
                <CardContent>
                    <List className={classes.list}>
                        {data.slice(0).reverse().map(({name, primaryMessage, day, reason}) => {
                                return (
                                    <div>
                                        <ListItem button>

                                            <ListItemText primary={
                                                <Typography className={classes.messageTitle}>
                                                    {name}
                                                </Typography>
                                            } secondary={
                                                <div>
                                                    <Typography className={classes.messageText}>
                                                        {addDays(new Date(), day).toLocaleDateString()}
                                                    </Typography>

                                                    <Typography
                                                        className={classes.messageText}
                                                        color="textPrimary">
                                                        {primaryMessage}
                                                    </Typography>
                                                </div>
                                            }
                                                          className={reason === 'infecting' ? classes.infectingColor : reason === 'vaccine' ? classes.vaccineColor : classes.trustColor}/>
                                        </ListItem>
                                        <Divider/>
                                    </div>
                                );
                            }
                        )}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
}

export default MessageModal;
