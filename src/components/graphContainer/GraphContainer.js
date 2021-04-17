import React, {useEffect, useState} from 'react';
import {LineChart, CartesianGrid, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useRecoilValue} from "recoil";
import {infectiousProgressSelector} from "../mapContainer/MapContainerState";


function GraphContainer({graphDataState}) {
    const graphInfectiousSelectorData = useRecoilValue(graphDataState);
    const [graphInfectiousDataArray, setGraphInfectiousDataArray] = useState([]);
    useEffect(() => {
        setGraphInfectiousDataArray(currentState=> [graphInfectiousSelectorData,...currentState]);
    },[graphInfectiousSelectorData]);
    return (
        <ResponsiveContainer width={900} height={500}>
            <LineChart
                width={900}
                height={500}
                data={graphInfectiousDataArray}
                margin={{
                    top: 5,
                    right: 30,
                    left: 25,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey={"day"}/>
                <YAxis />
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey={"inf"} stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default GraphContainer;