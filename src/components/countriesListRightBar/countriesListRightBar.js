import React from 'react';
import {
    DialogContent,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useRecoilValue} from "recoil";
import {Text} from "recharts";


function CountriesListRightBar({dataSelector, dataSelectorCount, dataHeight}) {

    let tableContainer = 440;

    if(dataHeight<400){
        tableContainer = dataHeight*0.44;
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        container: {
            maxHeight: tableContainer,
        },
    }));
    const classes = useStyles();

    //data s opatreniami
    //const [measuresActualState,] = useRecoilState(RegionTravelRestrictionState);

    const data = useRecoilValue(dataSelector);
    const count = useRecoilValue(dataSelectorCount);

    const columns = [
        {id: 'name', label: 'Name', minWidth: 100},
        {id: 'infectivity', label: 'Nakazená', minWidth: 10},
        {
            id: 'population',
            label: 'Populácia',
            minWidth: 60,
            align: 'right',
            format: (value) => value.toLocaleString('de-DE'),
        },
        {
            id: 'susceptibles',
            label: 'Náchylní',
            minWidth: 60,
            align: 'right',
            format: (value) => value.toLocaleString('de-DE'),
        },
        {
            id: 'infectious',
            label: 'Infekční',
            minWidth: 60,
            align: 'right',
            format: (value) => value.toLocaleString('de-DE'),
        },
        {
            id: 'recovered',
            label: 'Zotavení',
            minWidth: 60,
            align: 'right',
            format: (value) => value.toLocaleString('de-DE'),
        },
        {
            id: 'deceased',
            label: 'Zosnulí',
            minWidth: 60,
            align: 'right',
            format: (value) => value.toLocaleString('de-DE'),
        }
    ];
    return (

        <DialogContent dividers>
            {/*<Grid container direction={"row"}>*/}
            <Typography variant="h5">
                Infikované krajiny: <Text style={{color: 'red'}}>
                {count[0]}</Text> Neinfikované krajiny: <Text style={{color: 'limegreen'}}>
                {count[1]}</Text>
            </Typography>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            let textColor = 'black';
                                            if(column.id==="infectivity"){
                                                if(value===0){
                                                    textColor='green';
                                                }else{
                                                    textColor='red';
                                                }
                                            }
                                            return (
                                                <TableCell style={{backgroundColor: 'white', color: textColor,}}
                                                           key={column.id} align={column.align}>
                                                    {column.id==="infectivity"? value===1 ? "Áno":"Nie" :column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>


            {/*<Grid item xs={6} direction={"row"}>*/}
            {/*    Infikovnané krajiny:{count[0]} Neinfikované krajiny:{count[1]}*/}
            {/*    <Divider/>*/}
            {/*    {data.map((item) => (*/}
            {/*        <p style={(parseInt(`${item.countryInfectivity}`)===1) ? {color:"red"} : {color:"green"}}>{`${item.countryName}`}</p>*/}
            {/*    ))}*/}
            {/*</Grid>*/}

            {/*<Grid item xs={6} direction={"row"}>*/}
            {/*    <Typography>*/}
            {/*        Európa*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Hranice {measuresActualState.Europe.borders}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Letiská {measuresActualState.Europe.airports}*/}
            {/*    </Typography>*/}
            {/*    <Typography gutterBottom>*/}
            {/*        Prístavy {measuresActualState.Europe.seaports}*/}
            {/*    </Typography>*/}

            {/*    <Divider/>*/}

            {/*    <Typography>*/}
            {/*        Amerika*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Hranice {measuresActualState.Americas.borders}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Letiská {measuresActualState.Americas.airports}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Prístavy {measuresActualState.Americas.seaports}*/}
            {/*    </Typography>*/}
            {/*    <Divider/>*/}

            {/*    <Typography>*/}
            {/*        Afrika*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Hranice {measuresActualState.Africa.borders}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Letiská {measuresActualState.Africa.airports}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Prístavy {measuresActualState.Africa.seaports}*/}
            {/*    </Typography>*/}
            {/*    <Divider/>*/}

            {/*    <Typography>*/}
            {/*        Ázia*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Hranice {measuresActualState.Asia.borders}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Letiská {measuresActualState.Asia.airports}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Prístavy {measuresActualState.Asia.seaports}*/}
            {/*    </Typography>*/}
            {/*    <Divider/>*/}

            {/*    <Typography>*/}
            {/*        Austrália a Oceánia*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Hranice {measuresActualState.Oceania.borders}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Letiská {measuresActualState.Oceania.airports}*/}
            {/*    </Typography>*/}
            {/*    <Typography>*/}
            {/*        Prístavy {measuresActualState.Oceania.seaports}*/}
            {/*    </Typography>*/}

            {/*</Grid>*/}
            {/*</Grid>*/}
        </DialogContent>

    );
}

export default CountriesListRightBar;
