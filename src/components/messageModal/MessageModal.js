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
                        {data.map(({name, primaryMessage, day}) => {
                                return (
                                    <div>
                                    <ListItem button>

                                        <ListItemText primary={name} secondary={
                                            <div>
                                                <Typography>
                                                    {addDays(new Date(),day).toLocaleDateString()}
                                                </Typography>

                                                <Typography
                                                    color="textPrimary">
                                                    {primaryMessage}
                                                </Typography>
                                            </div>
                                        }/>
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
