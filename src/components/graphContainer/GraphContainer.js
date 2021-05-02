import React, {useState} from 'react';
import {LineChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, Text} from "recharts";
import {useRecoilValue} from "recoil";
import {GraphDataState} from "../../data/GraphDataState";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";


function GraphContainer() {
    //vyber typu grafu
    const [graphType, setGraphType] = useState(() => ['infectious']);
    const handleGraphType = (event, newType) => {
        if (graphType.includes(event)) {

        }
        setGraphType(newType);
    };

    const data = useRecoilValue(GraphDataState);

    return (
        <div>
            <ToggleButtonGroup
                value={graphType}
                onChange={handleGraphType}
                aria-label="text alignment"
                style={{display: 'flex', fontWeight: 'bold'}}
            >
                <ToggleButton value="susceptibles" aria-label="centered" style={{flex: 1}}>
                    <Text style={{color: '#8884d8'}}>Náchylní</Text>
                </ToggleButton>
                <ToggleButton value="infectious" aria-label="left aligned" style={{flex: 1}}>
                    <Text style={{color: 'red'}}>Infekční</Text>
                </ToggleButton>
                <ToggleButton value="recovered" aria-label="centered" style={{flex: 1}}>
                    <Text style={{color: '#82ca9d'}}>Zotavení</Text>
                </ToggleButton>
                <ToggleButton value="deceased" aria-label="centered" style={{flex: 1}}>
                    <Text style={{color: 'black'}}>Zosnulí</Text>
                </ToggleButton>
            </ToggleButtonGroup>
            <ResponsiveContainer width={900} height={500}>
                <LineChart
                    width={900}
                    height={500}
                    data={data}
                    margin={{
                        top: 5,
                        right: 5,
                        left: 35,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey={"day"}/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {graphType.includes('infectious') ?
                        <Line type="monotone" name="Infekční" dataKey={"inf"} stroke="red" activeDot={{r: 8}}/> : null}
                    {graphType.includes('susceptibles') ?
                        <Line type="monotone" name="Náchylní" dataKey={"sus"} stroke="#8884d8"
                              activeDot={{r: 8}}/> : null}
                    {graphType.includes('deceased') ?
                        <Line type="monotone" name="Zosnulí" dataKey={"dec"} stroke="black" activeDot={{r: 8}}/> : null}
                    {graphType.includes('recovered') ?
                        <Line type="monotone" name="Zotavení" dataKey={"rec"} stroke="#82ca9d"
                              activeDot={{r: 8}}/> : null}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default GraphContainer;
