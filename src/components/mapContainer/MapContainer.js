import React, {useEffect, useState} from "react";
import {csv} from "d3-fetch";
import {scaleLinear} from "d3-scale";
import {
    ComposableMap,
    Geographies,
    Geography,
    Sphere,
    Graticule, ZoomableGroup
} from "react-simple-maps";
import {mapContainerState} from "./MapContainerState";
import {useRecoilState} from "recoil";


const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
    .domain([10000, 500000000])
    .range(["#ffedea", "#FF2A05"]);

const MapContainer = ({setTooltipContent}) => {
    const [data, setData] = useState([]);

    //react-tooltip->population rounding
    const rounded = num => {
        if (num > 1000000000) {
            return Math.round(num / 100000000) / 10 + "Bn";
        } else if (num > 1000000) {
            return Math.round(num / 100000) / 10 + "M";
        } else {
            return Math.round(num / 100) / 10 + "K";
        }
    };

    // function centerMap(){
    //
    // }

    useEffect(() => {
        csv(`/vulnerability.csv`).then((data) => {
            setData(data);
        });
    }, []);

    const [mapData, setMapData] = useRecoilState(mapContainerState);

    useEffect(() => {
        // console.log(mapData);
    }, [mapData]);

    return (
        <ComposableMap
            projectionConfig={{
                rotate: [-10, 0, 0],
                scale: 150
            }}
            width={800}
            height={400}
            style={{
                width: "80%",
                height: "auto",
                marginLeft: "-15%",
                backgroundImage: "radial-gradient(skyBlue, cornflowerBlue, royalBlue )"
            }}
        >
            <ZoomableGroup zoom={1}>
                {/*<Sphere stroke="#E4E5E6" strokeWidth={0.5}/>*/}
                {/*<Graticule stroke="#E4E5E6" strokeWidth={0.5}/>*/}
                {data.length > 0 && (
                    <Geographies geography={geoUrl}>
                        {({geographies}) =>
                            geographies.map((geo) => {
                                const d = mapData[geo.properties.ISO_A3];
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={d?.Infectious ? colorScale(d?.Infectious) : "#F5F4F6"}

                                        onMouseEnter={() => {
                                            const {NAME, POP_EST} = geo.properties;
                                            // setTooltipContent(d?.Population ? `${d.NAME} — ${rounded(POP_EST)}` : "");
                                            setTooltipContent(d?.Population ? `${d.NAME} — ${rounded(d.Population)} SUS- ${d.Susceptible} INF- ${d.Infectious} REC- ${d.Recovered} DEC- ${d.Deceased}` : "");
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("");
                                        }}
                                        style={{
                                            default: {
                                                // fill: "#D6D6DA",
                                                // outline: "none"
                                                stroke: "grey",
                                                strokeOpacity: 0.2
                                            },
                                            hover: {
                                                fill: "#F53",
                                                outline: "none",
                                                stroke: "black",
                                                strokeOpacity: 1
                                            },
                                            pressed: {
                                                fill: "#E42",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>
                )}
            </ZoomableGroup>

        </ComposableMap>


    );
};
//memo
export default MapContainer;