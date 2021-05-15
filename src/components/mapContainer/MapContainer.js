import React, {useEffect, useRef, useState} from "react";
import {scaleLinear} from "d3-scale";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import {
    deceasedSelector,
    infectiousCountriesNumberSelector,
    infectiousSelector,
    mapContainerState,
    recoveredSelector,
    susceptiblesSelector
} from "../../data/map/MapContainerState";
import {useRecoilState, useRecoilValue} from "recoil";

import './MapContainer.css';
import {GameTimeState} from "../../data/gameTime/GameTimeState";
import {GameFlowState} from "../../data/gameTime/GameFlowState";
import {GameIntervalState} from "../../data/gameTime/GameIntervalState";
import {
    RegionAirportsSelector,
    RegionBordersSelector,
    RegionSeaportsSelector,
    RegionTravelRestrictionMeasuresSelector,
    RegionTravelRestrictionState
} from "../../data/gameControls/RegionTravelRestrictionState";
import {FirstInfectedCountryState} from "../../data/FirstInfectedCountryState";
import {BetaState} from "../../data/parameters/BetaState";
import {GammaState} from "../../data/parameters/GammaState";
import {DeltaState} from "../../data/parameters/DeltaState";
import {Dialog} from "@material-ui/core";
import SingleCountryModal from "./SingleCountryModal";
import {MessageModalState} from "../../data/messages/MessageModalState";
import {mapColorDataState} from "../../data/map/MapColorDataState";
import {GraphDataState} from "../../data/GraphDataState";
import {VaccineMeasuresSelector, VaccineState} from "../../data/gameControls/VaccineState";
import {CureMeasuresSelector} from "../../data/gameControls/CureState";
import {GameTrustState} from "../../data/gameTrust/GameTrustState";
import {CommunicationMeasuresSelector} from "../../data/gameControls/CommunicationState";
import {InfectionPreventionMeasuresSelector} from "../../data/gameControls/InfectionPreventionState";
import {TracingTestingMeasuresSelector} from "../../data/gameControls/TracingTestingState";
import {
    TravelRestrictionLockDownSelector,
    TravelRestrictionMeasuresSelector
} from "../../data/gameControls/TravelRestrictionState";
import {TrustMessageState} from "../../data/gameTrust/TrustMessageState";
import {StrictMeasuresTimeState} from "../../data/StrictMeasuresTimeState";
import {ClickableGameCurrencyState} from "../../data/currencies/ClickableGameCurrencyState";
import {NewMessagesCounter} from "../../data/messages/NewMessagesCounter";
import {GameOverState} from "../../data/GameOverState";
import {CurrencyInfectedPopulationBreakpointState} from "../../data/currencies/CurrencyInfectedPopulationBreakpointState";
import {useWindowDimensions} from "../../pages/ResponsiveDesign";
import {
    addCurrency,
    deceasedCalculate,
    gameOver,
    gameTrustHandle,
    gameVaccineHandle,
    infectFirstCountry,
    infectionSpread,
    infectiousCalculate,
    recoveredCalculate,
    susceptibleCalculate
} from "../../utils/GameUtils";


const geoUrl = require('../../data/map/topologies.json');

const MapContainer = () => {

    //modal po kliknuti na jednu krajinu
    const [openCountryModal, setOpenCountryModal] = React.useState(false);
    const handleClickOpenCountryModal = () => {
        setOpenCountryModal(true);
    };
    const handleCloseCountryModal = () => {
        setOpenCountryModal(false);
    };
    const [singleCountryModal, setSingleCountryModal] = useState();

    const {height, width} = useWindowDimensions();


//----------------------------------------------
    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

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

    //HERNY CAS - jednotkou h.casu je den
    const [days, setDays] = useRecoilState(GameTimeState);

    const [gameFlow,] = useRecoilState(GameFlowState);

    const [intervalSpeed,] = useRecoilState(GameIntervalState);

//---------------------------

    //breakypointy pre pridavanie hernej meny na zaklade narastu infikovanych
    const [infectedBreakpoints, setInfectedBreakpoints] = useRecoilState(CurrencyInfectedPopulationBreakpointState);

    //parametre
    const [betaParameter,] = useRecoilState(BetaState);
    const [gammaParameter, setGammaParameter] = useRecoilState(GammaState);
    const [deltaParameter,] = useRecoilState(DeltaState);

    //data vsetkych krajin
    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);

    //data pre graf a pre game over
    const [, setGraphData] = useRecoilState(GraphDataState);
    let susceptibleWorldData = useRecoilValue(susceptiblesSelector);
    let infectiousWorldData = useRecoilValue(infectiousSelector);
    let recoveredWorldData = useRecoilValue(recoveredSelector);
    let deceasedWorldData = useRecoilValue(deceasedSelector);


    //spravy z hry
    const [, setMessages] = useRecoilState(MessageModalState);

    //counter pre spravy z hry
    const [, setMessageCounter] = useRecoilState(NewMessagesCounter);

    //klikatelna herna mena
    const [clickableGameCurrency, setClickAbleGameCurrency] = useRecoilState(ClickableGameCurrencyState);

    //spravy z dovery
    const [, setTrustMessages] = useRecoilState(TrustMessageState);

    //farba mapy
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
                .domain([0, populationNum * 0.95])
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
                break;
            case "border":
                S = S - 10;
                I = 10;
                break;
            case "region":
                S = S - 5;
                I = 5;
                break;
            case "subregion":
                S = S - 8;
                I = 8;
                break;
            case "airTraffic":
                S = S - 4;
                I = 4;
                break;
            case "seaTraffic":
                S = S - 4;
                I = 4;
                break;
            default:
                return null;
        }

        setMessages((prevStats) => ([...prevStats, {
            iso: countryName,
            name: data.NAME,
            primaryMessage: " ● Nakazila sa nová krajina - " + data.NAME + ". Oblasť " + data.subregion + ".",
            day: days,
            reason: 'infecting'
        }]));

        setMessageCounter(prev => (prev + 1));

        if (Math.random() > 0.25) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 1));
            }
        }

        return {
            ...data,
            infectivity: 1,
            Susceptible: S,
            Infectious: I,
        };
    }


    const compartmentsRecalculateValues = (countryName) => {
        const data = allCountries[countryName];
        const {
            Susceptible: S,
            Infectious: I,
            Recovered: R,
            Deceased: D,
            Population: N,
            infectiousLooping: infArrayState
        } = data;

        const [newSusceptibleValue] = susceptibleCalculate(vaccineState.vaccineDevelopmentFinished, S, I, N, gammaParameter, betaParameter);

        const [newInfectiousValue, infectiousUnderZero, infectiousPushToRD, infectiousBiggerThanPopulation, infArrayLocal, LoopPushToRD] = infectiousCalculate(S, I, N, betaParameter,
            gammaParameter, deltaParameter, infArrayState, vaccineState.vaccineDevelopmentFinished);

        const newRecoveredValue = recoveredCalculate(S, I, R, N, gammaParameter, deltaParameter, infectiousUnderZero, LoopPushToRD, infectiousBiggerThanPopulation,
            infectiousPushToRD, vaccineState.vaccineDevelopmentFinished);

        const newDeceasedValue = deceasedCalculate(I, D, N, gammaParameter, deltaParameter, infectiousUnderZero, LoopPushToRD, infectiousBiggerThanPopulation,
            infectiousPushToRD, vaccineState.vaccineDevelopmentFinished);

        return {
            ...data,
            Susceptible: newSusceptibleValue,
            Infectious: newInfectiousValue,
            Recovered: newRecoveredValue,
            Deceased: newDeceasedValue,
            infectiousLooping: infArrayLocal
        };
    };

    //game over check
    const [, setGameOverState] = useRecoilState(GameOverState);

    //opatrenia pre nakazenie novych krajin
    const [regionRestrictions,] = useRecoilState(RegionTravelRestrictionState);

    //check pre vyber prvej krajiny
    const [pickFirstInfectedCountry, setPickFirstInfectedCountry] = useRecoilState(FirstInfectedCountryState);

    //VAKCINA
    const [vaccineState, setVaccineState] = useRecoilState(VaccineState);

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
    //pocet aktivnych opatreni z vakciny
    const vaccineMeasuresNumber = useRecoilValue(VaccineMeasuresSelector);
    //pocet aktivnych opatreni z obmedzenia cestovania
    const travelRestrictionMeasuresNumber = useRecoilValue(TravelRestrictionMeasuresSelector);
    //pocet aktivnych opatreni z region - obmedzenia cestovania
    const regionTravelRestrictionMeasuresNumber = useRecoilValue(RegionTravelRestrictionMeasuresSelector);
    //sucet aktivnych opatreni z region travel restriction a travel restriction
    const allTravelRestrictionMeasuresNumber = travelRestrictionMeasuresNumber + regionTravelRestrictionMeasuresNumber;

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
    const [trustValue, setTrustValue] = useRecoilState(GameTrustState);


    useInterval(() => {

        if (gameFlow === true) {

            //inkrement dni (herneho casu)
            setDays(prevDays => prevDays + 1);

            let countries = {};
            const countryCodes = Object.keys(allCountries);

            //nahodne nakazenie prvej krajiny
            infectFirstCountry(pickFirstInfectedCountry, countryCodes, allCountries, countries, infectingNewCountry, setPickFirstInfectedCountry);

            //funkcia na prepocet dovery
            gameTrustHandle(infectiousCountriesNumber, cureMeasuresNumber, communicationMeasuresNumber,
                infectionPreventionMeasuresNumber, tracingTestingMeasuresNumber, allTravelRestrictionMeasuresNumber,
                vaccineMeasuresNumber, deceasedWorlWideNumber, days, lockDownMeasureState, strictMeasuresTime,
                setStrictMeasuresTime, bordersMeasureState, airportsMeasureState, seaportsMeasureState,
                trustValue, setGameOverState, setTrustValue, setTrustMessages);

            gameVaccineHandle(vaccineState, days, setGammaParameter, setMessages, setVaccineState);

            Object.keys(allCountries).forEach(currentCountry => {
                infectionSpread(currentCountry, allCountries, regionRestrictions, countries, infectingNewCountry, countryCodes, compartmentsRecalculateValues);
            })

            addCurrency(infectiousWorldData, infectedBreakpoints, clickableGameCurrency, days, setClickAbleGameCurrency, setInfectedBreakpoints);

            setGraphData((prevStats) => ([...prevStats, {
                inf: infectiousWorldData,
                sus: susceptibleWorldData,
                rec: recoveredWorldData,
                dec: deceasedWorldData,
                day: days
            }]));

            setAllCountries((prevAllCountriesState) => {
                return {
                    ...prevAllCountriesState, ...countries
                }
            });

            gameOver(recoveredWorldData, susceptibleWorldData, infectiousWorldData, days, setGameOverState);
        }

    }, intervalSpeed);
//-------------------------------------------------------------------->

    const mapHeight = height * 0.75;
    const mapWidth = width * 0.75;

    //responzivna mapa
    let mapScale = ((width / 80) * 11.2);

    return (
        <div>
            <Dialog fullWidth={true} maxWidth={"xs"} onClose={handleCloseCountryModal} open={openCountryModal}>

                <SingleCountryModal singleCountryData={singleCountryModal}/>
            </Dialog>

            <ComposableMap
                projectionConfig={{
                    rotate: [-10, 0, 0],
                    scale: mapScale
                }}
                width={mapWidth}
                height={mapHeight}
                style={{
                    backgroundImage: "radial-gradient(skyBlue, cornflowerBlue, royalBlue )"
                }}

            >
                <ZoomableGroup zoom={1}
                               translateExtent={[
                                   [0, 0],
                                   [mapWidth, mapHeight]
                               ]}
                >

                    {(
                        <Geographies geography={geoUrl}>
                            {({geographies}) =>
                                geographies.map((geo) => {
                                    const d = allCountries[geo.properties.ISO_A3];
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={mapColor === 'infectious' ? d?.Infectious ? scaling(d?.Infectious, d?.Population, d?.Deceased) : "#F5F4F6" :
                                                mapColor === 'deceased' ? d?.Deceased ? scaling(d?.Infectious, d?.Population, d?.Deceased) : "#F5F4F6" : "#F5F4F6"}

                                            onClick={() => {
                                                setSingleCountryModal(geo.properties.ISO_A3);
                                                handleClickOpenCountryModal();
                                            }}
                                            style={{
                                                default: {
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

export default MapContainer;
