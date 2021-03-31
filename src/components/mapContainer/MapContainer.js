import React, {useEffect, useRef, useState} from "react";
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

import './MapContainer.css';
import {GameTimeState} from "../../data/GameTimeState";
import {GameFlowState} from "../../data/GameFlowState";
import {GameIntervalState} from "../../data/GameIntervalState";


const geoUrl =
    "https://raw.githubusercontent.com/smooff/mapData/main/mapCoordsDataFetch.json";

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

    //pracuje s vyskou a sirkou okna, aby bola mapa responz.
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    function useWindowDimensions() {
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
    const { height, width } = useWindowDimensions();
    //PO TADIALTO


//--------------------------------------------------------->Z MAINPAGE
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        // Remember the latest callback.
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        // Set up the interval.
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
    //HERNY CAS------------
    //herny cas v jednotke-den
    const [days, setDays] = useRecoilState(GameTimeState);

    const [gameFlow, setgameFlow] = useRecoilState(GameFlowState);

    const [intervalSpeed, setIntervalSpeed] = useRecoilState(GameIntervalState);


//---------------------------
    //
    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);
    const infectingByBorders = (countryName) => {
        const data = allCountries[countryName];
        let {beta, gamma, delta, Susceptible: S, Infectious: I} = data;
        beta = 0.940961;
        gamma = 0.0622677;
        delta = 0.01559;
        S = S - 10;
        I = 10;

        return {
            ...data,
            infectivity: 1,
            Susceptible: S,
            Infectious: I,
            beta: beta,
            gamma: gamma,
            delta: delta,
        };
    }

    const infectingByRegions = (countryName) => {
        const data = allCountries[countryName];
        let {beta, gamma, delta, Susceptible: S, Infectious: I} = data;
        beta = 0.940961;
        gamma = 0.0622677;
        delta = 0.01559;
        S = S - 5;
        I = 5;

        return {
            ...data,
            infectivity: 1,
            Susceptible: S,
            Infectious: I,
            beta: beta,
            gamma: gamma,
            delta: delta,
        };
    }

    const infectingBySubRegions = (countryName) => {
        const data = allCountries[countryName];
        let {beta, gamma, delta, Susceptible: S, Infectious: I} = data;
        beta = 0.940961;
        gamma = 0.0622677;
        delta = 0.01559;
        S = S - 8;
        I = 8;

        return {
            ...data,
            infectivity: 1,
            Susceptible: S,
            Infectious: I,
            beta: beta,
            gamma: gamma,
            delta: delta,
        };
    }

    const susceptibleCalculate = (S, I, N, beta) => {
        // let nachylny = Math.round(S - (beta * S * I) / N);
        let nachylny = (S - Math.ceil((beta * S * I) / N));
        // console.log('nach',nachylny);


        if (nachylny < 0) {
            nachylny = 0;
        }

        return [nachylny];
    }

    const infectiousCalculate = (S, I, N, beta, gamma, delta) => {
        let infekcny = (I + Math.ceil((beta * S * I) / N)) - Math.round(gamma * I) - Math.round(delta * I);
        // console.log('inf', data.Infectious);
        // console.log('round do R: ', Math.round(gamma * I));
        // console.log('bez do R: ', (gamma * I));

        // console.log('ceil do R: ', Math.ceil(gamma * I));
        // console.log('ROZDIEL MEDZI I A INF', I - infekcny);

        let infekcnyVacsiNezPopulaciaCheck = 0;
        let povodnyInfekcny = 0;
        if (infekcny > N) {
            // console.log('INFEKCNY JE VASCI', N - Math.round(gamma * I) - Math.round(delta * I));
            infekcny = N - Math.round(gamma * N) - Math.round(delta * N);
            infekcnyVacsiNezPopulaciaCheck = 1;
        } else if (infekcny < 0) {
            povodnyInfekcny = infekcny;
            infekcny = 0;
        }

        const infekcnyPushToRD = I - infekcny;
        if ((I - infekcny) === 0) {
            if ((Math.round(gamma * I) + Math.round(delta * I)) === 0) {
                infekcny = (I + Math.ceil((beta * S * I) / N) - Math.ceil(gamma * I) - Math.ceil(delta * I));

                if (infekcny < 0) {
                    povodnyInfekcny = infekcny;
                    infekcny = 0;
                }
                //ak nastane ze sa nemeni pocet infikovanych, a infikovany stahuju nachylnych(kvoli ceil z S do I) aj napriek tomu ze maju byt sami stiahnuty
            }
            // else if((Math.ceil((beta * S * I) / N))===(Math.round(gamma * I) + Math.round(delta * I))){
            //     if(((beta * S * I) / N)<((gamma * I) + (delta * I))){
            //         infekcny=(I - Math.ceil(gamma * I) - Math.ceil(delta * I));
            //         if (infekcny < 0) {
            //             povodnyInfekcny = infekcny;
            //             infekcny = 0;
            //         }
            //     }
            // }

        }

        return [infekcny, povodnyInfekcny, infekcnyPushToRD, infekcnyVacsiNezPopulaciaCheck];
    }

    const recoveredCalculate = (I, R, gamma, delta, I2, infekcnyPush, infekcnyVacsiNezPopulaciaCheckValue, N, beta, S) => {
        //if funkcny v pripade presunu z kompartmentu I do R,
        //kde I sa dostava do zapornej hodnoty a je potrebne to vykompenzovat v R (aj v D) upravenym-znizenym pripocitanim
        if (I2 < 0) {
            let splittedI2 = I2 / (gamma + delta);
            let recoveredReduction = Math.round(gamma * splittedI2);
            let zotavenyZmena = R - recoveredReduction;

            if (gamma === delta) {
                return R;
            }

            return zotavenyZmena;
        }

        if (infekcnyVacsiNezPopulaciaCheckValue === 1) {
            let zotaveny = Math.round(gamma * N);
            return zotaveny;
        }

        if (infekcnyPush === 0) {
            if ((Math.round(gamma * I) + Math.round(delta * I)) === 0) {
                if (I === 1) {
                    if (gamma > delta) {
                        let zotaveny = Math.ceil(R + gamma * I);
                        return zotaveny;
                    } else if (delta > gamma) {
                        return R;
                    }
                }
                let zotaveny = Math.ceil(R + gamma * I);
                return zotaveny;
            }
            // else if((Math.ceil((beta * S * I) / N))===(Math.round(gamma * I) + Math.round(delta * I))){
            //     if(((beta * S * I) / N)<((gamma * I) + (delta * I))){
            //         if (I === 1) {
            //             if (gamma > delta) {
            //                 let zotaveny = Math.ceil(R + gamma * I);
            //                 return zotaveny;
            //             } else if (delta > gamma) {
            //                 return R;
            //             }
            //         }
            //        let zotaveny = Math.ceil(R + gamma * I);
            //         return zotaveny;
            //     }
            // }
        }

        let zotaveny = Math.round(R + gamma * I);

        return zotaveny;
    }

    const deceasedCalculate = (I, D, delta, gamma, I2, infekcnyPush, infekcnyVacsiNezPopulaciaCheckValue, N, beta, S) => {
        //rovnake osetrenie ako vo funkcii vyssie
        if (I2 < 0) {
            let splittedI2 = I2 / (gamma + delta);
            let deceasedReduction = Math.round(delta * splittedI2);
            let zosnulyZmena = D - deceasedReduction;

            if (gamma === delta) {
            }
            return zosnulyZmena;
        }

        if (infekcnyVacsiNezPopulaciaCheckValue === 1) {
            let zosnuly = Math.round(delta * N);
            return zosnuly;
        }

        if (infekcnyPush === 0) {
            if ((Math.round(gamma * I) + Math.round(delta * I)) === 0) {
                if (I === 1) {
                    if (delta > gamma) {
                        let zosnuly = Math.ceil(D + delta * I);
                        return zosnuly;
                    } else if (gamma > delta) {
                        return D;
                    }
                }
                let zosnuly = Math.ceil(D + delta * I);
                return zosnuly;
            }
            // else if((Math.ceil((beta * S * I) / N))===(Math.round(gamma * I) + Math.round(delta * I))){
            //     if(((beta * S * I) / N)<((gamma * I) + (delta * I))){
            //         if (I === 1) {
            //             if (delta > gamma) {
            //                 let zosnuly = Math.ceil(D + delta * I);
            //                 return zosnuly;
            //             } else if (gamma > delta) {
            //                 return D;
            //             }
            //         }
            //         let zosnuly = Math.ceil(D + delta * I);
            //         return zosnuly;
            //     }
            // }
        }

        let zosnuly = Math.round(D + delta * I);

        return zosnuly;
    }

    const compartmentsRecalculateValues = (countryName) => {
        const data = allCountries[countryName];
        const {beta, gamma, delta, Susceptible: S, Infectious: I, Recovered: R, Deceased: D, Population: N} = data;
        // console.log('data:', data);
        // console.log('sus: ', new Intl.NumberFormat('de-DE').format(data.Susceptible));
        //console.log('inf: ', new Intl.NumberFormat('de-DE').format(data.Infectious));
        // console.log('rec: ', new Intl.NumberFormat('de-DE').format(data.Recovered));
        // console.log('dec: ', new Intl.NumberFormat('de-DE').format(data.Deceased));
        // console.log('NovaPopulacia: ', new Intl.NumberFormat('de-DE').format(data.Susceptible + data.Infectious + data.Recovered + data.Deceased),
        //     '\n rozdiel populacie: ', new Intl.NumberFormat('de-DE').format(data.Population - (data.Susceptible + data.Infectious + data.Recovered + data.Deceased)));

        const [susceptibleValue] = susceptibleCalculate(S, I, N, beta);
        const [actualInfectiousNumber, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking] = infectiousCalculate(S, I, N, beta, gamma, delta);
        // console.log(actualInfectiousNumber, negativeNumberInfectious);
        const infectiousValue = actualInfectiousNumber;
        const recoveredValue = recoveredCalculate(I, R, gamma, delta, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, N, beta, S);
        const deceasedValue = deceasedCalculate(I, D, delta, gamma, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, N, beta, S);
        // const infekcny = data.Infectious + +50000;

        // if (povodnyNachylny >= 0) {
        //
        // } else if (povodnyNachylny < 0) {
        //     infekcny -= povodnyNachylny;
        // }

        return {
            ...data,
            Susceptible: susceptibleValue,
            Infectious: infectiousValue,
            Recovered: recoveredValue,
            Deceased: deceasedValue
        };


        // setAllCountries((prevAllCountriesState) => ({
        //     ...prevAllCountriesState, ...{
        //         [countryName]: {
        //             ...data,
        //             Susceptible: susceptibleValue,
        //             Infectious: infectiousValue,
        //             Recovered: recoveredValue,
        //             Deceased: deceasedValue
        //         }
        //     }
        // }));

    };

    useInterval(() => {
        // setInfectiousIncrement(infectiousIncrement + 1000000);

        if (gameFlow === true) {

            setDays(prevDays => prevDays + 1);

            let countries = {};


            Object.keys(allCountries).forEach(currentCountry => {
                if (allCountries[currentCountry].infectivity === 1) {
                    if (allCountries[currentCountry].Infectious > 50000) {

                    }
                    // setFirstInfectedCountry(...firstInfectedCountry, currentCountry);
                    // console.log(allCountries[currentCountry].Infectious, currentCountry);


                    //INFIKOVANIE CEZ HRANICE
                    allCountries[currentCountry].border.forEach(element => {
                        if (allCountries[element].infectivity === 0) {
                            if (Math.random() < 0.005) {
                                countries[element] = infectingByBorders(element);
                            }
                        }
                    });

                    //INFIKOVANIE CEZ REGION A SUBREGION
                    for (const property in allCountries) {

                        //REGION
                        if (allCountries[property].region === allCountries[currentCountry].region) {
                            if (allCountries[property].infectivity === 0) {
                                if (Math.random() < 0.005) {
                                    countries[property] = infectingByRegions(property);
                                }
                            }
                        }
                        //SUBREGION
                        if (allCountries[property].subregion === allCountries[currentCountry].subregion) {
                            if (allCountries[property].infectivity === 0) {
                                if (Math.random() < 0.005) {
                                    countries[property] = infectingBySubRegions(property);
                                }
                            }
                        }
                    }

                    countries[currentCountry] = compartmentsRecalculateValues(currentCountry);
                } else {
                    if (Math.random() < 0.005) {
                        const dataInfectivity = allCountries[currentCountry];
                        setAllCountries((prevAllCountriesState) => ({
                            ...prevAllCountriesState, ...{
                                [currentCountry]: {
                                    ...dataInfectivity,
                                    infectivity: 1,
                                    Susceptible: dataInfectivity.Susceptible - 4,
                                    Infectious: 4,
                                    beta: 0.940961,
                                    gamma: 0.0622677,
                                    delta: 0.01559
                                }
                            }
                        }));
                        console.log("SKOCIL SOM A INFIKOVAL SOM NOVU KRAJINU");
                        console.log(currentCountry);
                    }
                }
            })

            // setAllStats(
            //     (prevStats) => ({
            //         ...{
            //             SusceptiblesCount: SusceptiblesCountInterval,
            //             InfectiousCount: InfectiousCountInterval,
            //             RecoveredCount: RecoveredCountInterval,
            //             DeceasedCount: DeceasedCountInterval
            //         }
            //     }));

            setAllCountries((prevAllCountriesState) => {
                // console.log(prevAllCountriesState);
                return {
                    ...prevAllCountriesState, ...countries
                }
            });
        }
        // setAllCountries((prevAllCountriesState) => ({
        //     ...prevAllCountriesState, ...{
        //         [countryName]: {
        //             ...data,
        //             Susceptible: susceptibleValue,
        //             Infectious: infectiousValue,
        //             Recovered: recoveredValue,
        //             Deceased: deceasedValue
        //         }
        //     }
        // }));

        // valueChange(firstInfectedCountry);

    }, intervalSpeed);
//-------------------------------------------------------------------->

    const mapHeight= height*0.70;
    const mapWidth= width*0.75;
    return (
        <div >
            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: 250
                }}
                width={mapWidth}
                height={mapHeight}
                style={{
                    // width: "100%", height: "100%",
                    backgroundImage: "radial-gradient(skyBlue, cornflowerBlue, royalBlue )"
                }}

            >
                <ZoomableGroup zoom={1}
                               translateExtent={[
                                   [0, -mapHeight],
                                   [mapWidth, mapHeight]
                               ]}
                >
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

                                            // onMouseEnter={() => {
                                            //     const {NAME, POP_EST} = geo.properties;
                                            //     // setTooltipContent(d?.Population ? `${d.NAME} — ${rounded(POP_EST)}` : "");
                                            //     setTooltipContent(d?.Population ? `${d.NAME} — ${rounded(d.Population)} SUS- ${d.Susceptible} INF- ${d.Infectious} REC- ${d.Recovered} DEC- ${d.Deceased}` : "");
                                            // }}
                                            // onMouseLeave={() => {
                                            //     setTooltipContent("");
                                            // }}
                                            onClick={()=>{
                                                console.log(d?.Population ? `${d.NAME} — ${rounded(d.Population)} SUS- ${d.Susceptible} INF- ${d.Infectious} REC- ${d.Recovered} DEC- ${d.Deceased}` : "");
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
        </div>

    );
};
//memo
export default MapContainer;