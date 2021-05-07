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
import {
    deceasedSelector, infectiousCountriesNumberSelector,
    infectiousSelector,
    mapContainerState,
    recoveredSelector,
    susceptiblesSelector
} from "./MapContainerState";
import {useRecoilState, useRecoilValue} from "recoil";

import './MapContainer.css';
import {GameTimeState} from "../../data/GameTimeState";
import {GameFlowState} from "../../data/GameFlowState";
import {GameIntervalState} from "../../data/GameIntervalState";
import {
    RegionAirportsSelector,
    RegionBordersSelector, RegionSeaportsSelector,
    RegionTravelRestrictionState
} from "../gameActions/travelRestriction/RegionTravelRestrictionState";
import {FirstInfectedCountryState} from "../../data/FirstInfectedCountryState";
import {BetaState} from "../../data/parameters/BetaState";
import {GammaState} from "../../data/parameters/GammaState";
import {DeltaState} from "../../data/parameters/DeltaState";
import {Dialog} from "@material-ui/core";
import SingleCountryModal from "./SingleCountryModal";
import {MessageModalState} from "../../data/MessageModalState";
import {mapColorDataState} from "../../data/MapColorDataState";
import {GraphDataState} from "../../data/GraphDataState";
import {VaccineMeasuresSelector, VaccineState} from "../gameActions/vaccine/VaccineState";
import {CureMeasuresSelector} from "../gameActions/cure/CureState";
import {GameTrustState} from "../gameTrust/GameTrustState";
import {CommunicationMeasuresSelector} from "../gameActions/communication/CommunicationState";
import {InfectionPreventionMeasuresSelector} from "../gameActions/infectionPrevention/InfectionPreventionState";
import {TracingTestingMeasuresSelector} from "../gameActions/tracingTesting/TracingTestingState";
import {
    TravelRestrictionLockDownSelector,
    TravelRestrictionMeasuresSelector
} from "../gameActions/travelRestriction/TravelRestrictionState";
import {TrustMessageState} from "../../data/TrustMessageState";
import {StrictMeasuresTimeState} from "../../data/StrictMeasuresTimeState";
import {ClickableGameCurrencyState} from "../../data/currencies/ClickableGameCurrencyState";


const geoUrl = require('./topologies.json');

export function getRandomNumberInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

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

    const [gameFlow,] = useRecoilState(GameFlowState);

    const [intervalSpeed,] = useRecoilState(GameIntervalState);


//---------------------------

    //parametre
    const [betaParameter,] = useRecoilState(BetaState);
    const [gammaParameter, setGammaParameter] = useRecoilState(GammaState);
    const [deltaParameter,] = useRecoilState(DeltaState);

    //
    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);

    //data pre graf
    let susceptibleGraphData = useRecoilValue(susceptiblesSelector);
    let infectiousGraphData = useRecoilValue(infectiousSelector);
    let recoveredGraphData = useRecoilValue(recoveredSelector);
    let deceasedGraphData = useRecoilValue(deceasedSelector);
    const [, setGraphData] = useRecoilState(GraphDataState);

    //spravy z hry
    const [, setMessages] = useRecoilState(MessageModalState);

    //klikatelna herna mena
    const [clickableGameCurrency, setClickAbleGameCurrency] = useRecoilState(ClickableGameCurrencyState);

    //spravy z dovery
    const [, setTrustMessages] = useRecoilState(TrustMessageState);

    //mapa farba
    const [mapColor,] = useRecoilState(mapColorDataState);
    const scaling = (infectiousNum, populationNum, deceasedNum) => {

        if (deceasedNum === populationNum) {
            return "rgb(0,0,0)";
        }
        if (mapColor === 'infectious') {
            const colorScale = scaleLinear()
                .domain([0, populationNum * 0.75])
                .range(["#ffedea", "#FF2A05"]);
            return colorScale(infectiousNum);
        } else if (mapColor === 'deceased') {
            const colorScale = scaleLinear()
                .domain([0, populationNum * 0.4])
                .range(["#dcdbdd", "#070707"]);
            return colorScale(deceasedNum);
        }

    }

    //funkcia na infikovanie novej krajiny
    const infectingNewCountry = (countryName, infectiousOrigin) => {
        const data = allCountries[countryName];
        let {Susceptible: S, Infectious: I} = data;

        switch (infectiousOrigin) {
            case "initial":
                S = S - 1;
                I = 1;
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
            default:
                return null;
        }

        setMessages((prevStats) => ([...prevStats, {
            iso: countryName,
            name: data.NAME,
            primaryMessage: " ● Nakazila sa nová krajina - " + data.NAME,
            day: days,
            reason: 'infecting'
        }]));

        if (clickableGameCurrency < 10) {
            setClickAbleGameCurrency(prev => (prev + 1));
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


        // if(Math.ceil((betaParameter * S * I) / N) > N*0.002){
        //     nachylny = (S - Math.ceil((Math.ceil((betaParameter * S * I) / N))*0.05));
        //     console.log(Math.ceil(N*0.002),( - Math.ceil((Math.ceil((betaParameter * S * I) / N))*0.002)));
        // }
        if (nachylny < 0) {
            nachylny = 0;
        }

        return [nachylny];
    }

    const infectiousCalculate = (S, I, N, beta, gamma, delta, infArrayState) => {
        let infekcny = (I + Math.ceil((betaParameter * S * I) / N)) - Math.round(gammaParameter * I) - Math.round(deltaParameter * I);
        // console.log('inf', data.Infectious);
        // console.log('round do R: ', Math.round(gamma * I));
        // console.log('bez do R: ', (gamma * I));

        // console.log('ceil do R: ', Math.ceil(gamma * I));
        // console.log('ROZDIEL MEDZI I A INF', I - infekcny);

        // if(Math.ceil((betaParameter * S * I) / N) > N*0.002){
        //     infekcny = (I + Math.ceil((Math.ceil((betaParameter * S * I) / N))*0.05))- Math.round(gammaParameter * I) - Math.round(deltaParameter * I);
        // }

        let infekcnyVacsiNezPopulaciaCheck = 0;
        let povodnyInfekcny = 0;
        if (infekcny > N) {
            infekcny = N - Math.round(gammaParameter * N) - Math.round(deltaParameter * N);
            infekcnyVacsiNezPopulaciaCheck = 1;
        }//ak infekcny padnu pod nulu
        else if (infekcny < 0) {
            povodnyInfekcny = infekcny;
            infekcny = 0;
        }//ak S padne pod nulu po tom co ich I ma celych zobrat
        else if ((S - Math.ceil((betaParameter * S * I) / N)) < 0) {
            infekcny = (I + S - Math.round(gammaParameter * I) - Math.round(deltaParameter * I));
        }

        const infekcnyPushToRD = I - infekcny;
        if ((I - infekcny) === 0) {
            //ak uz do I neprichadza nic, tak aby dokazalo vytiahnut z I do R/D (aby vynulovalo I)
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

        let LoopPushToRD = 0;
        //ak S je velke cislo a I sa blizi k nule ale nikdy ju nedosiahne (pretoze do I prichadzaju cez ceil)
        //kopirovanie State pola do Local pola, pracujeme s Local polom ktore returneme a to sa nasetuje do State
        let infArrayLocal = Array.from(infArrayState);
        infArrayLocal.push(infekcny);
        //ak je po pushnuti hodnoty infekcnych pole vacsie ako 3 tak vyhodi posledny prvok (udrziavanie pola o velkosti 3)
        if (infArrayLocal.length > 3) {
            infArrayLocal.shift();
            //check ci su hodnoty infekcnych zacyklene (napr. pomale tahanie z S do I, v pripade ked I sa blizilo k nule)
            if (infArrayLocal[0] === infArrayLocal[1] && infArrayLocal[1] === infArrayLocal[2]) {
                //check pre nulu, pretoze ta nas nezaujima
                if (infArrayLocal[0] !== 0) {
                    infekcny = infekcny - 10;
                    LoopPushToRD = 1;

                    if (infekcny < 0) {
                        povodnyInfekcny = infekcny;
                        infekcny = 0;
                        LoopPushToRD = 2;
                    }
                }
                //check ci su hodnoty infekcnych zacyklene, a zaroven gamma a delta su schopne tahat kazdu druhu iteraciu -> cyklenie 8,9,8 / 9,8,9
            } else if (infArrayLocal[0] === infArrayLocal[2] && infArrayLocal[0] < infArrayLocal[1] && infArrayLocal[0] < 20) {
                if (infArrayLocal[0] !== 0) {
                    infekcny = infekcny - 10;
                    LoopPushToRD = 1;

                    if (infekcny < 0) {
                        povodnyInfekcny = infekcny;
                        infekcny = 0;
                        LoopPushToRD = 2;
                    }
                }
            }
        }
        return [infekcny, povodnyInfekcny, infekcnyPushToRD, infekcnyVacsiNezPopulaciaCheck, infArrayLocal, LoopPushToRD];
    }

    const recoveredCalculate = (I, R, gamma, delta, I2, infekcnyPush, infekcnyVacsiNezPopulaciaCheckValue, N, beta, S, LoopPushToRD) => {
        //if funkcny v pripade presunu z kompartmentu I do R,
        //kde I sa dostava do zapornej hodnoty a je potrebne to vykompenzovat v R (aj v D) upravenym-znizenym pripocitanim
        if (I2 < 0) {
            let splittedI2 = I2 / (gammaParameter + deltaParameter);
            let recoveredReduction = Math.round(gammaParameter * splittedI2);//-1
            let zotavenyZmena = R - recoveredReduction;

            //pre pripad ze presun z I do D bol vynuteny na zaklade zacyklenia z S do I (S=400m,I=9 a I pomaly taha z S aj ked by nemalo)
            //je to kompenzacia ked pri vynuteni ukoncenia zacyklenia I skocia pod nulu
            //UPDATE: prepocet nastava len z I do D, R ostava zachovane
            if (LoopPushToRD === 2) {
                if (gammaParameter !== 0) {
                    return Math.round(R + gammaParameter * I);
                }

                return R;
            }

            if (gammaParameter === deltaParameter) {
                return R;
            }

            return zotavenyZmena;
        }

        //(tak ako vyssie len neskocia I pod nulu) pre pripad ze presun z I do R bol vynuteny na zaklade zacyklenia z S do I
        //UPDATE: prepocet nastava len z I do D, R ostava zachovane
        if (LoopPushToRD === 1) {
            //pre pripad zacyklenia 9,9,9
            //let zotaveny=Math.round(R + gammaParameter * I)+10;
            return R;
        }
        // else if(LoopPushToRD===3){
        //     //pre pripad zacyklenia 8,9,8 / 9,8,9
        //     let zotaveny=Math.round(R + gammaParameter * I)+5;
        //     return zotaveny;
        // }

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

    const deceasedCalculate = (I, D, delta, gamma, I2, infekcnyPush, infekcnyVacsiNezPopulaciaCheckValue, N, beta, S, LoopPushToRD) => {
        //rovnake osetrenie ako vo funkcii vyssie
        if (I2 < 0) {
            let splittedI2 = I2 / (gammaParameter + deltaParameter);
            let deceasedReduction = Math.round(deltaParameter * splittedI2);
            let zosnulyZmena = D - deceasedReduction;

            //pre pripad ze presun z I do R bol vynuteny na zaklade zacyklenia z S do I (S=400m,I=9 a I pomaly taha z S aj ked by nemalo)
            //je to kompenzacia ked pri vynuteni ukoncenia zacyklenia I skocia pod nulu
            if (LoopPushToRD === 2) {
                let zosnuly = Math.round(D + deltaParameter * I) + 10 + I2;
                return zosnuly;
            }

            if (gammaParameter === deltaParameter) {
            }
            return zosnulyZmena;
        }
        //(tak ako vyssie len neskocia I pod nulu) pre pripad ze presun z I do D bol vynuteny na zaklade zacyklenia z S do I
        //pre pripad zacyklenia 9,9,9 ale aj  8,9,8 / 9,8,9
        if (LoopPushToRD === 1) {
            let zosnuly = Math.round(D + deltaParameter * I) + 10;
            return zosnuly;
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
        const {
            beta,
            gamma,
            delta,
            Susceptible: S,
            Infectious: I,
            Recovered: R,
            Deceased: D,
            Population: N,
            infectiousLooping: infArrayState
        } = data;
        // console.log('data:', data);
        // console.log('sus: ', new Intl.NumberFormat('de-DE').format(data.Susceptible));
        //console.log('inf: ', new Intl.NumberFormat('de-DE').format(data.Infectious));
        // console.log('rec: ', new Intl.NumberFormat('de-DE').format(data.Recovered));
        // console.log('dec: ', new Intl.NumberFormat('de-DE').format(data.Deceased));
        // console.log('NovaPopulacia: ', new Intl.NumberFormat('de-DE').format(data.Susceptible + data.Infectious + data.Recovered + data.Deceased),
        //     '\n rozdiel populacie: ', new Intl.NumberFormat('de-DE').format(data.Population - (data.Susceptible + data.Infectious + data.Recovered + data.Deceased)));

        const [susceptibleValue] = susceptibleCalculate(S, I, N, beta);
        const [actualInfectiousNumber, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, infekcnyArrayFromLocal, LoopPushToRD] = infectiousCalculate(S, I, N, beta, gamma, delta, infArrayState);
        // console.log(actualInfectiousNumber, negativeNumberInfectious);
        const infectiousValue = actualInfectiousNumber;
        const recoveredValue = recoveredCalculate(I, R, gamma, delta, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, N, beta, S, LoopPushToRD);
        const deceasedValue = deceasedCalculate(I, D, delta, gamma, negativeNumberInfectious, infekcnyPushToRD, infekcnyVacsiNezPopulaciaChecking, N, beta, S, LoopPushToRD);
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
            Deceased: deceasedValue,
            infectiousLooping: infekcnyArrayFromLocal
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

    //opatrenia pre nakazenie novych krajin
    const [oblastneOpatrenia,] = useRecoilState(RegionTravelRestrictionState);
    //check pre vyber prvej krajiny
    const [pickFirstInfectedCountry, setPickFirstInfectedCountry] = useRecoilState(FirstInfectedCountryState);

    //VAKCINA
    const [vaccineState, setVaccineState] = useRecoilState(VaccineState);
    //1095 dni = 3 roky, 2920 dni = 8 rokov
    const vaccineStep1Start = 1095;
    const vaccineStep1End = 2920;
    //730 dni = 2 roky, 3650 dni = 10 rokov
    const vaccineStep2Start = 730;
    const vaccineStep2End = 3650;
    //365 dni = 1 rok, 730 dni = 2 roky
    const vaccineStep3Start = 365;
    const vaccineStep3End = 730;

    //DOVERA
    //pocet infkecnych krajin pre doveru
    const infectiousCountriesNumber = useRecoilValue(infectiousCountriesNumberSelector);
    //pocet aktivnych opatreni z liecby
    const cureMeasuresNumber = useRecoilValue(CureMeasuresSelector);
    //pocet aktivnych opatreni z komunikacie
    const communicationMeasuresNumber = useRecoilValue(CommunicationMeasuresSelector);
    //pocet aktivnych opatreni z prevencie nakazenia
    const infectionPreventionMeasuresNumber = useRecoilValue(InfectionPreventionMeasuresSelector);
    //pocet aktivnych opatreni z trasovania/testovania
    const tracingTestingMeasuresNumber = useRecoilValue(TracingTestingMeasuresSelector);
    //pocet aktivnych opatreni z obmedzenia cestovania
    const travelRestrictionMeasuresNumber = useRecoilValue(TravelRestrictionMeasuresSelector);
    //pocet aktivnych opatreni z vakciny
    const vaccineMeasuresNumber = useRecoilValue(VaccineMeasuresSelector);

    //pocet celosvetovych zosnulych
    const deceasedWorlWideNumber = useRecoilValue(deceasedSelector);
    //info o aktivovanom lockdowne
    const lockDownMeasureState = useRecoilValue(TravelRestrictionLockDownSelector);
    //info o dnoch, kolko uz je aktivny lockdown, ...
    const [strictMeasuresTime, setStrictMeasuresTime] = useRecoilState(StrictMeasuresTimeState);
    //info o aktivnych uzatvoreniach hranic, letisk, pristavov
    const bordersMeasureState = useRecoilValue(RegionBordersSelector);
    const airportsMeasureState = useRecoilValue(RegionAirportsSelector);
    const seaportsMeasureState = useRecoilValue(RegionSeaportsSelector);

    //dovera
    const [, setTrustValue] = useRecoilState(GameTrustState);

    function gameTrustHandle() {
        let triggerPoint = 0;
        let trustDecrease = 0;
        let messageString = "";
        if (infectiousCountriesNumber > 10 && (cureMeasuresNumber === 0 && communicationMeasuresNumber === 0 && infectionPreventionMeasuresNumber === 0
            && tracingTestingMeasuresNumber === 0 && travelRestrictionMeasuresNumber === 0 && vaccineMeasuresNumber === 0)) {
            trustDecrease += 4;
            triggerPoint++;
            messageString = messageString.concat(" ● Nakazilo sa príliš veľa krajín bez akéhokoľvek aktivovaného opatrenia. Aktivuj nejaké opatrenie.\n");
        }
        if (infectiousCountriesNumber > 15 && (travelRestrictionMeasuresNumber === 0)) {
            trustDecrease += 4;
            triggerPoint++;
            messageString = messageString.concat(" ● Nakazilo sa príliš veľa krajín bez akéhokoľvek aktivovaného opatrenia z obmedzenia cestovnia. Aktivuj nejaké opatrenie z tejto sekcie. \n");
        }
        if (infectiousCountriesNumber > 40 && (communicationMeasuresNumber === 0)) {
            trustDecrease += 5;
            triggerPoint++;
            messageString = messageString.concat(" ● Nakazilo sa príliš veľa krajín bez akéhokoľvek aktivovaného opatrenia z komunikácie. Aktivuj nejaké opatrenie z tejto sekcie. \n");
        }
        if (infectiousCountriesNumber > 100 && (communicationMeasuresNumber < 3)) {
            trustDecrease += 5;
            triggerPoint++;
            messageString = messageString.concat(" ● Nakazilo sa príliš veľa krajín, dôvera klesá z dôvodu slabej komunikácie s obyvateľmi. Aktivuj opatrenie zo sekcie Komunikácia. \n");
        }

        //1 milion
        if (deceasedWorlWideNumber > 1000000 && cureMeasuresNumber === 0) {
            trustDecrease += 3;
            triggerPoint++;
            messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu slabej liečby. Aktivuj opatrenie zo sekcie Liečba. \n");
        }
        //10 milionov
        if (deceasedWorlWideNumber > 10000000 && cureMeasuresNumber < 2) {
            trustDecrease += 3;
            triggerPoint++;
            messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu slabej liečby. Aktivuj viacero opatrení zo sekcie Liečba. \n");
        }
        //100 milionov
        if (deceasedWorlWideNumber > 100000000 && cureMeasuresNumber < 3) {
            trustDecrease += 3;
            triggerPoint++;
            messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu slabej liečby. Aktivuj opatrenie zo sekcie Liečba. \n");
        }
        //150 milionov
        if (deceasedWorlWideNumber > 150000000 && vaccineMeasuresNumber === 0) {
            trustDecrease += 3;
            triggerPoint++;
            messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu nevyvíjania vakcíny. Aktivuj opatrenie zo sekcie Vakcína. \n");
        }
        //cca 75% populacie mrtva
        if (deceasedWorlWideNumber > 5500000000 && cureMeasuresNumber < 5 && vaccineMeasuresNumber === 0 && communicationMeasuresNumber < 6 && infectionPreventionMeasuresNumber < 3) {
            trustDecrease += 1;
            triggerPoint++;
            messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z viacerých možných dôvodov. Aktivuj opatrenia zo sekcie Liečba, Vakcína, Komunikácia alebo Prevencia nakazenia. \n");
        }

        if (days > 60 && vaccineMeasuresNumber === 0) {
            trustDecrease += 1;
            triggerPoint++;
            messageString = messageString.concat(" ● Dôvera klesá z dôvodu nevyvíjania vakcíny. Aktivuj opatrenie zo sekcie Vakcína. \n");
        }
        if (days > 100 && communicationMeasuresNumber === 0) {
            trustDecrease += 3;
            triggerPoint++;
            messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi. Aktivuj opatrenie zo sekcie Komunikácia. \n");
        }
        if (days > 200 && communicationMeasuresNumber < 3) {
            trustDecrease += 4;
            triggerPoint++;
            messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi. Aktivuj opatrenia zo sekcie Komunikácia. \n");
        }

        //kazdych 30 dni sa strhne dovera za lockdown ale aj za aktivaciu lockdownu
        if (lockDownMeasureState !== 0) {
            if (strictMeasuresTime.lockdown === 0) {
                trustDecrease += 7;
                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera klesla z dôvodu akitvácie lockdownu. \n");
            }
            if (strictMeasuresTime.lockdown === 30) {
                trustDecrease += 7;
                triggerPoint++;

                //ak je lockdown aktivny a nie su opatrenia z komunikacie - > strhne este viac
                if (communicationMeasuresNumber < 1) {
                    trustDecrease += 1;
                    messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi počas lockdownu. \n");
                } else if (communicationMeasuresNumber < 3) {
                    trustDecrease += 2;
                    messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi počas lockdownu. \n");
                }

                messageString = messageString.concat(" ● Dôvera klesá z dôvodu aktívneho lockdownu. \n");
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, lockdown: 1};
                });
            } else {
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, lockdown: prevStats.lockdown + 1};
                });
            }
        } else {
            if (strictMeasuresTime.lockdown !== 0) {
                trustDecrease -= 2;
                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera stúpla z dôvodu deaktivovania lockdownu. \n");
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, lockdown: 0};
                });
            }
        }

        //kazdych 25 dni sa strhne dovera za uzatvorenie hranic ale aj za aktivaciu uzavretia hranic
        if (bordersMeasureState !== 0) {
            if (strictMeasuresTime.borders === 0) {
                trustDecrease += 4;
                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera klesla z dôvodu uzavretia hraníc. \n");
            }
            if (strictMeasuresTime.borders === 25) {
                switch (bordersMeasureState) {
                    case 1:
                        trustDecrease += 3;
                        break;
                    case 2:
                        trustDecrease += 4;
                        break;
                    case 3:
                        trustDecrease += 5;
                        break;
                    case 4:
                        trustDecrease += 6;
                        break;
                    case 5:
                        trustDecrease += 6;
                        break;
                    default:
                        return null;
                }

                //ak su hranice zatvorene a nie su opatrenia z komunikacie - > strhne este viac
                if (communicationMeasuresNumber < 1) {
                    trustDecrease += 1;
                    messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi počas uzavretých hraníc. \n");
                } else if (communicationMeasuresNumber < 3) {
                    trustDecrease += 2;
                    messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi počas uzavretých hraníc. \n");
                }

                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera klesá z dôvodu aktívneho uzavretia hraníc. \n");
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, borders: 1};
                });
            } else {
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, borders: prevStats.borders + 1};
                });
            }
        } else {
            if (strictMeasuresTime.borders !== 0) {
                trustDecrease -= 2;
                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera stúpla z dôvodu otvorenia hraníc. \n");
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, borders: 0};
                });
            }
        }

        //kazdych 25 dni sa strhne dovera za uzatvorenie letisk ale aj za aktivaciu uzavretia letisk
        if (airportsMeasureState !== 0) {
            if (strictMeasuresTime.airports === 0) {
                trustDecrease += 4;
                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera klesla z dôvodu uzavretia letísk. \n");
            }
            if (strictMeasuresTime.airports === 25) {
                switch (airportsMeasureState) {
                    case 1:
                        trustDecrease += 3;
                        break;
                    case 2:
                        trustDecrease += 4;
                        break;
                    case 3:
                        trustDecrease += 5;
                        break;
                    case 4:
                        trustDecrease += 6;
                        break;
                    case 5:
                        trustDecrease += 6;
                        break;
                    default:
                        return null;
                }

                //ak su letiska zatvorene a nie su opatrenia z komunikacie - > strhne este viac
                if (communicationMeasuresNumber < 1) {
                    trustDecrease += 1;
                    messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi počas uzavretých letísk. \n");
                } else if (communicationMeasuresNumber < 3) {
                    trustDecrease += 2;
                    messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi počas uzavretých letísk. \n");
                }

                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera klesá z dôvodu aktívneho uzavretia letísk. \n");
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, airports: 1};
                });
            } else {
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, airports: prevStats.airports + 1};
                });
            }
        } else {
            if (strictMeasuresTime.airports !== 0) {
                trustDecrease -= 2;
                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera stúpla z dôvodu otvorenia letísk. \n");
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, airports: 0};
                });
            }
        }

        //kazdych 25 dni sa strhne dovera za uzatvorenie pristavov ale aj za aktivaciu uzavretia pristavov
        if (seaportsMeasureState !== 0) {
            if (strictMeasuresTime.seaports === 0) {
                trustDecrease += 4;
                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera klesla z dôvodu uzavretia prístavov. \n");
            }
            if (strictMeasuresTime.seaports === 25) {
                switch (seaportsMeasureState) {
                    case 1:
                        trustDecrease += 3;
                        break;
                    case 2:
                        trustDecrease += 4;
                        break;
                    case 3:
                        trustDecrease += 5;
                        break;
                    case 4:
                        trustDecrease += 6;
                        break;
                    case 5:
                        trustDecrease += 6;
                        break;
                    default:
                        return null;
                }

                //ak su pristavy zatvorene a nie su opatrenia z komunikacie - > strhne este viac
                if (communicationMeasuresNumber < 1) {
                    trustDecrease += 1;
                    messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi počas uzavretých prístavov. \n");
                } else if (communicationMeasuresNumber < 3) {
                    trustDecrease += 2;
                    messageString = messageString.concat(" ● Dôvera klesá z dôvodu slabej komunikácie s obyvateľmi počas uzavretých prístavov. \n");
                }

                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera klesá z dôvodu aktívneho uzavretia prístavov. \n");
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, seaports: 1};
                });
            } else {
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, seaports: prevStats.seaports + 1};
                });
            }
        } else {
            if (strictMeasuresTime.seaports !== 0) {
                trustDecrease -= 2;
                triggerPoint++;
                messageString = messageString.concat(" ● Dôvera stúpla z dôvodu otvorenia prístavov. \n");
                setStrictMeasuresTime((prevStats) => {
                    return {...prevStats, seaports: 0};
                });
            }
        }

        if (triggerPoint !== 0) {
            setTrustValue(prev => (prev - trustDecrease));
            setTrustMessages((prevStats) => ([...prevStats, {
                name: "Dôvera",
                primaryMessage: messageString,
                day: days,
                reason: 'trust'
            }]));
        }

    }


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
                countries[firstCountry] = infectingNewCountry(firstCountry, "initial");
                setPickFirstInfectedCountry(1);
            }
            //funkcia na prepocet dovery
            gameTrustHandle();

            //inicializacia casu vakciny (tradicny vyvoj)
            if (vaccineState.InitializeVaccineTime === false) {
                let step1 = getRandomNumberInRange(vaccineStep1Start, vaccineStep1End);
                let step2 = getRandomNumberInRange(vaccineStep2Start, vaccineStep2End);
                let step3 = getRandomNumberInRange(vaccineStep3Start, vaccineStep3End);

                setVaccineState((prevStats) => {
                    return {
                        ...prevStats,
                        InitializeVaccineTime: true,
                        step1Time: step1,
                        step2Time: step2,
                        step3Time: step3,
                    };
                });
            }

            if (vaccineState.vaccineDevelopmentFinished === true) {
                setGammaParameter(0.49);
            }

            let maxDevelopmentTime = vaccineState.step1Time + vaccineState.step2Time + vaccineState.step3Time;
            //prepocet casu vyvoja vakciny od zaciatku jej vyvoja
            if (vaccineState.ActivationVaccineDevelopment === 1) {

                if (vaccineState.actualDevelopmentTime < maxDevelopmentTime) {
                    let actualVaccineTime = vaccineState.actualDevelopmentTime + 1;

                    //check ci bude vakcina v tejto iteracii vynajdena
                    if (actualVaccineTime === maxDevelopmentTime) {
                        setMessages((prevStats) => ([...prevStats, {
                            name: "Vakcína",
                            primaryMessage: " ● Vývoj vakcíny bol dokončený.",
                            day: days,
                            reason: 'vaccine'
                        }]));
                        setVaccineState((prevStats) => {
                            return {
                                ...prevStats,
                                actualDevelopmentTime: actualVaccineTime,
                                vaccineDevelopmentFinished: true,
                            };
                        });
                    }

                    setVaccineState((prevStats) => {
                        return {
                            ...prevStats,
                            actualDevelopmentTime: actualVaccineTime,
                        };
                    });
                } else if (vaccineState.actualDevelopmentTime > maxDevelopmentTime) {
                    setVaccineState((prevStats) => {
                        return {
                            ...prevStats,
                            actualDevelopmentTime: maxDevelopmentTime,
                        };
                    });
                }
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
                                                countries[element] = infectingNewCountry(element, "border");
                                            }
                                            //check ci su hranice v regione uzavrete, ak ano, tak pravdepodobnost infikovania novej krajiny cez hranice je mensia
                                        } else if (oblastneOpatrenia[region].borders === 1) {
                                            if (Math.random() < 0.003) {
                                                countries[element] = infectingNewCountry(element, "border");
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
                                            countries[property] = infectingNewCountry(property, "region");
                                            //break pre for, aby sa v jednom for infikovala len jedna nova krajina, tym znizime vysoky prirastok novo-nakazenych krajin
                                            break;
                                        }
                                        //check ci su v regione uzavrete hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v regione je "mensia"
                                    } else if (oblastneOpatrenia[allCountries[property].region].borders === 1) {
                                        if (Math.random() < 0.001) {
                                            countries[property] = infectingNewCountry(property, "region");
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
                                            countries[property] = infectingNewCountry(property, "subregion");
                                            break;
                                        }
                                        //check ci su v regione uzavrete hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v subregione je mensia
                                    } else if (oblastneOpatrenia[allCountries[property].region].borders === 1) {
                                        if (Math.random() < 0.002) {
                                            countries[property] = infectingNewCountry(property, "subregion");
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
                                                        countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes, "airTraffic");
                                                        //console.log("krajina:",allCountries[currentCountry],"ma otvorene letiska a nakazila",allCountries[pickCountryToInfectViaPlanes],"ta ma tiez otvorene letiska");
                                                    } else if (oblastneOpatrenia[regionToInfect].airports === 1) {
                                                        if (Math.random() < 0.05) {
                                                            countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes, "airTraffic");
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
                                                        countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes, "airTraffic");
                                                        //console.log("krajina:",allCountries[currentCountry],"ma zatvorene letiska a nakazila",allCountries[pickCountryToInfectViaPlanes],"ta ma otvorene letiska");
                                                    } else if (oblastneOpatrenia[regionToInfect].airports === 1) {
                                                        if (Math.random() < 0.05) {
                                                            countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes, "airTraffic");
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
                                                        countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips, "seaTraffic");
                                                    } else if (oblastneOpatrenia[regionToInfect].seaports === 1) {
                                                        if (Math.random() < 0.05) {
                                                            countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips, "seaTraffic");
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
                                                        countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips, "seaTraffic");
                                                    } else if (oblastneOpatrenia[regionToInfect].seaports === 1) {
                                                        if (Math.random() < 0.05) {
                                                            countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips, "seaTraffic");
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


            setGraphData((prevStats) => ([...prevStats, {
                inf: infectiousGraphData,
                sus: susceptibleGraphData,
                rec: recoveredGraphData,
                dec: deceasedGraphData,
                day: days
            }]));

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

    const mapHeight = height * 0.745;
    const mapWidth = width * 0.75;
    return (
        <div>
            <Dialog fullWidth={true} maxWidth={"xs"} onClose={handleCloseCountryModal}
                    aria-labelledby="customized-dialog-title"
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
                                            fill={mapColor === 'infectious' ? d?.Infectious ? scaling(d?.Infectious, d?.Population, d?.Deceased) : "#F5F4F6" :
                                                mapColor === 'deceased' ? d?.Deceased ? scaling(d?.Infectious, d?.Population, d?.Deceased) : "#F5F4F6" : "#F5F4F6"}
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
