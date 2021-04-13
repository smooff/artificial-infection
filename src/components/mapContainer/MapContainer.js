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
import {useRecoilState, useRecoilValue} from "recoil";

import './MapContainer.css';
import {GameTimeState} from "../../data/GameTimeState";
import {GameFlowState} from "../../data/GameFlowState";
import {GameIntervalState} from "../../data/GameIntervalState";
import {RegionTravelRestrictionState} from "../gameActions/travelRestriction/RegionTravelRestrictionState";
import {FirstInfectedCountryState} from "../../data/FirstInfectedCountryState";
import {BetaState} from "../../data/parameters/BetaState";
import {GammaState} from "../../data/parameters/GammaState";
import {DeltaState} from "../../data/parameters/DeltaState";
import {Dialog, DialogTitle} from "@material-ui/core";
import Communication from "../gameActions/communication/Communication";
import SingleCountryModal from "./SingleCountryModal";



const geoUrl = require('./topologies.json');

const colorScale = scaleLinear()
    .domain([10000, 500000000])
    .range(["#ffedea", "#FF2A05"]);

const MapContainer = ({setTooltipContent}) => {
    const [data, setData] = useState([]);

    //modal
    const [openCountryModal, setOpenCountryModal] = React.useState(false);
    const handleClickOpenCountryModal = () => {
        setOpenCountryModal(true);
    };
    const handleCloseCountryModal = () => {
        setOpenCountryModal(false);
    };

    const [singleCountryModal, setSingleCountryModal] = useState();

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
        const {innerWidth: width, innerHeight: height} = window;
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

    const {height, width} = useWindowDimensions();
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

    //parametre
    const [betaParameter, setBetaParameter] = useRecoilState(BetaState);
    const [gammaParameter, setGammaParameter] = useRecoilState(GammaState);
    const [deltaParameter, setDeltaParameter] = useRecoilState(DeltaState);

    //
    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);

    //funkcia na infikovanie novej krajiny
    const infectingNewCountry = (countryName, infectiousOrigin) => {
        const data = allCountries[countryName];
        let {Susceptible: S, Infectious: I} = data;

        switch (infectiousOrigin) {
            case "initial":
                S = S - 5;
                I = 5;
                //console.log(countryName,"nakazena cez",infectiousOrigin,"S/I",S,I);
                break;
            case "border":
                S = S - 10;
                I = 10;
                //console.log(countryName,"nakazena cez",infectiousOrigin,"S/I",S,I);
                break;
            case "region":
                S = S - 5;
                I = 5;
                //console.log(countryName,"nakazena cez",infectiousOrigin,"S/I",S,I);
                break;
            case "subregion":
                S = S - 8;
                I = 8;
                //console.log(countryName,"nakazena cez",infectiousOrigin,"S/I",S,I);
                break;
            case "airTraffic":
                S = S - 4;
                I = 4;
                //console.log(countryName,"nakazena cez",infectiousOrigin,"S/I",S,I);
                break;
            case "seaTraffic":
                S = S - 4;
                I = 4;
                //console.log(countryName,"nakazena cez",infectiousOrigin,"S/I",S,I);
                break;
        }

        return {
            ...data,
            infectivity: 1,
            Susceptible: S,
            Infectious: I,
        };
    }


    const susceptibleCalculate = (S, I, N, beta) => {
        // let nachylny = Math.round(S - (beta * S * I) / N);
        let nachylny = (S - Math.ceil((betaParameter * S * I) / N));
        // console.log('nach',nachylny);


        if (nachylny < 0) {
            nachylny = 0;
        }

        return [nachylny];
    }

    const infectiousCalculate = (S, I, N, beta, gamma, delta) => {
        let infekcny = (I + Math.ceil((betaParameter * S * I) / N)) - Math.round(gammaParameter * I) - Math.round(deltaParameter * I);
        // console.log('inf', data.Infectious);
        // console.log('round do R: ', Math.round(gamma * I));
        // console.log('bez do R: ', (gamma * I));

        // console.log('ceil do R: ', Math.ceil(gamma * I));
        // console.log('ROZDIEL MEDZI I A INF', I - infekcny);

        let infekcnyVacsiNezPopulaciaCheck = 0;
        let povodnyInfekcny = 0;
        if (infekcny > N) {
            // console.log('INFEKCNY JE VASCI', N - Math.round(gamma * I) - Math.round(delta * I));
            infekcny = N - Math.round(gammaParameter * N) - Math.round(deltaParameter * N);
            infekcnyVacsiNezPopulaciaCheck = 1;
        } else if (infekcny < 0) {
            povodnyInfekcny = infekcny;
            infekcny = 0;
        }

        const infekcnyPushToRD = I - infekcny;
        if ((I - infekcny) === 0) {
            if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
                infekcny = (I + Math.ceil((betaParameter * S * I) / N) - Math.ceil(gammaParameter * I) - Math.ceil(deltaParameter * I));

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
            let splittedI2 = I2 / (gammaParameter + deltaParameter);
            let recoveredReduction = Math.round(gammaParameter * splittedI2);
            let zotavenyZmena = R - recoveredReduction;

            if (gammaParameter === deltaParameter) {
                return R;
            }

            return zotavenyZmena;
        }

        if (infekcnyVacsiNezPopulaciaCheckValue === 1) {
            let zotaveny = Math.round(gammaParameter * N);
            return zotaveny;
        }

        if (infekcnyPush === 0) {
            if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
                if (I === 1) {
                    if (gammaParameter > deltaParameter) {
                        let zotaveny = Math.ceil(R + gammaParameter * I);
                        return zotaveny;
                    } else if (deltaParameter > gammaParameter) {
                        return R;
                    }
                }
                let zotaveny = Math.ceil(R + gammaParameter * I);
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

        let zotaveny = Math.round(R + gammaParameter * I);

        return zotaveny;
    }

    const deceasedCalculate = (I, D, delta, gamma, I2, infekcnyPush, infekcnyVacsiNezPopulaciaCheckValue, N, beta, S) => {
        //rovnake osetrenie ako vo funkcii vyssie
        if (I2 < 0) {
            let splittedI2 = I2 / (gammaParameter + deltaParameter);
            let deceasedReduction = Math.round(deltaParameter * splittedI2);
            let zosnulyZmena = D - deceasedReduction;

            if (gammaParameter === deltaParameter) {
            }
            return zosnulyZmena;
        }

        if (infekcnyVacsiNezPopulaciaCheckValue === 1) {
            let zosnuly = Math.round(deltaParameter * N);
            return zosnuly;
        }

        if (infekcnyPush === 0) {
            if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
                if (I === 1) {
                    if (deltaParameter > gammaParameter) {
                        let zosnuly = Math.ceil(D + deltaParameter * I);
                        return zosnuly;
                    } else if (gammaParameter > deltaParameter) {
                        return D;
                    }
                }
                let zosnuly = Math.ceil(D + deltaParameter * I);
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

        let zosnuly = Math.round(D + deltaParameter * I);

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

    const [oblastneOpatrenia, setOblastneOpatrenia] = useRecoilState(RegionTravelRestrictionState);
    const [pickFirstInfectedCountry, setPickFirstInfectedCountry] = useRecoilState(FirstInfectedCountryState);


    useInterval(() => {
        // setInfectiousIncrement(infectiousIncrement + 1000000);


        if (gameFlow === true) {

            //inkrement dni (herneho casu)
            setDays(prevDays => prevDays + 1);

            let countries = {};
            const countryCodes = Object.keys(allCountries);

            //nahodne nakazenie prvej krajiny
            if (pickFirstInfectedCountry === 0) {
                const firstCountry = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
                countries[firstCountry] = infectingNewCountry(firstCountry,"initial");
                setPickFirstInfectedCountry(1);
            }

            Object.keys(allCountries).forEach(currentCountry => {
                if (allCountries[currentCountry].infectivity === 1) {

                    //check ci krajina povodu splna pocet infikovanych na infikovanie novej krajiny
                    if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0003 || allCountries[currentCountry].Infectious > 10000) {

                        //INFIKOVANIE CEZ HRANICE
                        allCountries[currentCountry].border.forEach(element => {
                            //check ci target krajina moze byt nakazena
                            if (allCountries[element].infectivity === 0) {
                                //iteracia cez RegionTravelRestrictionState
                                for (const region in oblastneOpatrenia) {
                                    if (allCountries[element].region === region) {
                                        //check ci su hranice v regione otvorene, ak ano, tak pravdepodobnost infikovania novej krajiny cez hranice je "normalna"
                                        if (oblastneOpatrenia[region].borders === 0) {
                                            if (Math.random() < 0.005) {
                                                countries[element] = infectingNewCountry(element,"border");
                                            }
                                            //check ci su hranice v regione uzavrete, ak ano, tak pravdepodobnost infikovania novej krajiny cez hranice je mensia
                                        } else if (oblastneOpatrenia[region].borders === 1) {
                                            if (Math.random() < 0.003) {
                                                countries[element] = infectingNewCountry(element,"border");
                                            }
                                        }
                                    }
                                }
                            }
                        });
                    }
                    // setFirstInfectedCountry(...firstInfectedCountry, currentCountry);
                    // console.log(allCountries[currentCountry].Infectious, currentCountry);


                    //INFIKOVANIE CEZ REGION A SUBREGION
                    for (const property in allCountries) {

                        //check ci krajina povodu splna pocet infikovanych na infikovanie novej krajiny
                        if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0004 || allCountries[currentCountry].Infectious > 35000) {

                            //REGION
                            if (allCountries[property].region === allCountries[currentCountry].region) {
                                if (allCountries[property].infectivity === 0) {
                                    //check ci su v regione otvorene hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v regione je "normalna"
                                    if (oblastneOpatrenia[allCountries[property].region].borders === 0) {
                                        if (Math.random() < 0.002) {
                                            countries[property] = infectingNewCountry(property,"region");
                                            //break pre for, aby sa v jednom for infikovala len jedna nova krajina, tym znizime vysoky prirastok novo-nakazenych krajin
                                            break;
                                        }
                                        //check ci su v regione uzavrete hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v regione je "mensia"
                                    } else if (oblastneOpatrenia[allCountries[property].region].borders === 1) {
                                        if (Math.random() < 0.001) {
                                            countries[property] = infectingNewCountry(property,"region");
                                            //break pre for, aby sa v jednom for infikovala len jedna nova krajina, tym znizime vysoky prirastok novo-nakazenych krajin
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        //check ci krajina povodu splna pocet infikovanych na infikovanie novej krajiny
                        if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.00035 || allCountries[currentCountry].Infectious > 20000) {
                            //SUBREGION
                            if (allCountries[property].subregion === allCountries[currentCountry].subregion) {
                                if (allCountries[property].infectivity === 0) {
                                    //check ci su v regione otvorene hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v subregione je "normalna"
                                    if (oblastneOpatrenia[allCountries[property].region].borders === 0) {
                                        if (Math.random() < 0.003) {
                                            countries[property] = infectingNewCountry(property,"subregion");
                                            break;
                                        }
                                        //check ci su v regione uzavrete hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v subregione je mensia
                                    } else if (oblastneOpatrenia[allCountries[property].region].borders === 1) {
                                        if (Math.random() < 0.002) {
                                            countries[property] = infectingNewCountry(property,"subregion");
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //infikovanie cez LETISKA
                    if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.00035 || allCountries[currentCountry].Infectious > 15000) {

                        //vyber krajiny na nakazanie
                        const pickCountryToInfectViaPlanes = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
                        //check ci uz nie je nakazena
                        if (allCountries[pickCountryToInfectViaPlanes].infectivity === 0) {
                            for (const regionFromInfecting in oblastneOpatrenia) {
                                if (allCountries[currentCountry].region === regionFromInfecting) {
                                    //check ci ma krajina povodu otvorene letiska
                                    if (oblastneOpatrenia[regionFromInfecting].airports === 0) {
                                        if (Math.random() < 0.008) {
                                            for (const regionToInfect in oblastneOpatrenia) {
                                                if (allCountries[pickCountryToInfectViaPlanes].region === regionToInfect) {
                                                    //check ci ma vybrana krajina na infikovanie otvorene letiska
                                                    if (oblastneOpatrenia[regionToInfect].airports === 0) {
                                                        countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes,"airTraffic");
                                                        //console.log("krajina:",allCountries[currentCountry],"ma otvorene letiska a nakazila",allCountries[pickCountryToInfectViaPlanes],"ta ma tiez otvorene letiska");
                                                    } else if (oblastneOpatrenia[regionToInfect].airports === 1) {
                                                        if (Math.random() < 0.05) {
                                                            countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes,"airTraffic");
                                                            //console.log("krajina:",allCountries[currentCountry],"ma otvorene letiska a nakazila",allCountries[pickCountryToInfectViaPlanes],"ta ma zatvorene letiska");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else if (oblastneOpatrenia[regionFromInfecting].airports === 1) {
                                        if (Math.random() < 0.001) {
                                            for (const regionToInfect in oblastneOpatrenia) {
                                                if (allCountries[pickCountryToInfectViaPlanes].region === regionToInfect) {
                                                    //check ci ma vybrana krajina na infikovanie otvorene letiska
                                                    if (oblastneOpatrenia[regionToInfect].airports === 0) {
                                                        countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes,"airTraffic");
                                                        //console.log("krajina:",allCountries[currentCountry],"ma zatvorene letiska a nakazila",allCountries[pickCountryToInfectViaPlanes],"ta ma otvorene letiska");
                                                    } else if (oblastneOpatrenia[regionToInfect].airports === 1) {
                                                        if (Math.random() < 0.05) {
                                                            countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes,"airTraffic");
                                                            //console.log("krajina:",allCountries[currentCountry],"ma zatvorene letiska a nakazila",allCountries[pickCountryToInfectViaPlanes],"ta ma tiez zatvorene letiska");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //infikovanie cez PRISTAVY
                    if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0005 || allCountries[currentCountry].Infectious > 17000) {

                        //vyber krajiny na nakazanie
                        const pickCountryToInfectViaShips = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
                        //check ci uz nie je nakazena
                        if (allCountries[pickCountryToInfectViaShips].infectivity === 0) {
                            for (const regionFromInfecting in oblastneOpatrenia) {
                                if (allCountries[currentCountry].region === regionFromInfecting) {
                                    //check ci ma krajina povodu otvorene letiska
                                    if (oblastneOpatrenia[regionFromInfecting].seaports === 0) {
                                        if (Math.random() < 0.005) {
                                            for (const regionToInfect in oblastneOpatrenia) {
                                                if (allCountries[pickCountryToInfectViaShips].region === regionToInfect) {
                                                    //check ci ma vybrana krajina na infikovanie otvorene letiska
                                                    if (oblastneOpatrenia[regionToInfect].seaports === 0) {
                                                        countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips,"seaTraffic");
                                                    } else if (oblastneOpatrenia[regionToInfect].seaports === 1) {
                                                        if (Math.random() < 0.05) {
                                                            countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips,"seaTraffic");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else if (oblastneOpatrenia[regionFromInfecting].seaports === 1) {
                                        if (Math.random() < 0.001) {
                                            for (const regionToInfect in oblastneOpatrenia) {
                                                if (allCountries[pickCountryToInfectViaShips].region === regionToInfect) {
                                                    //check ci ma vybrana krajina na infikovanie otvorene letiska
                                                    if (oblastneOpatrenia[regionToInfect].seaports === 0) {
                                                        countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips,"seaTraffic");
                                                    } else if (oblastneOpatrenia[regionToInfect].seaports === 1) {
                                                        if (Math.random() < 0.05) {
                                                            countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips,"seaTraffic");
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }


                    countries[currentCountry] = compartmentsRecalculateValues(currentCountry);
                } else {


                    // if (Math.random() < 0.005) {
                    //     const dataInfectivity = allCountries[currentCountry];
                    //     setAllCountries((prevAllCountriesState) => ({
                    //         ...prevAllCountriesState, ...{
                    //             [currentCountry]: {
                    //                 ...dataInfectivity,
                    //                 infectivity: 1,
                    //                 Susceptible: dataInfectivity.Susceptible - 4,
                    //                 Infectious: 4,
                    //                 beta: 0.940961,
                    //                 gamma: 0.0622677,
                    //                 delta: 0.01559
                    //             }
                    //         }
                    //     }));
                    //     console.log("SKOCIL SOM A INFIKOVAL SOM NOVU KRAJINU");
                    //     console.log(currentCountry);
                    // }
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

    const mapHeight = height * 0.70;
    const mapWidth = width * 0.75;
    return (
        <div>
            <Dialog fullWidth={true} maxWidth={"xs"} onClose={handleCloseCountryModal} aria-labelledby="customized-dialog-title"
                    open={openCountryModal}>

                <SingleCountryModal singleCountryData={singleCountryModal}/>
            </Dialog>

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
                                   [0, 0],
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
                                            onClick={() => {
                                                setSingleCountryModal(geo.properties.ISO_A3);
                                                handleClickOpenCountryModal();
                                                //console.log(d?.Population ? `${d.NAME} — ${rounded(d.Population)} SUS- ${d.Susceptible} INF- ${d.Infectious} REC- ${d.Recovered} DEC- ${d.Deceased}` : "");
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