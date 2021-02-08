import React from 'react';
import {useRecoilState} from "recoil";
import {mapContainerState} from "../mapContainer/MapContainerState";

function DataContainer(props) {

    const [mapData, setMapData] = useRecoilState(mapContainerState);

//good to know
//zachytavat navratovu hodnotu setIntervalu

    const onChange = (event, countryName = 'USA') => {
        // moze napisat bud mapData.USA alebo takto (ak nazov kluca objektu je v premennej tak sa poziva zapis s [])
        const data = mapData[countryName];
        setMapData({
            ...mapData,
            ...{
                [countryName]: {...data, Infectious: 5000000, Sus: 10}
            }
        });
        // console.log(mapData);
        console.log(mapData.USA);
    };

    return (
        <div>
            <button onClick={(e) => onChange(e)}/>
            <br/>
        </div>
    );
}

export default DataContainer;