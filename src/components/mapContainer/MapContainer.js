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

/**
 * Renders a MapContainer component.
 * Component is used to display map and for handling game functions
 * @returns {JSX.Element}
 * @constructor
 * @component
 */
const MapContainer = () => {

    //stores info if the modal for single country is opened or not
    const [openCountryModal, setOpenCountryModal] = React.useState(false);
    const handleClickOpenCountryModal = () => {
        setOpenCountryModal(true);
    };
    const handleCloseCountryModal = () => {
        setOpenCountryModal(false);
    };
    //stores info about country for modal after clicking on specific country
    const [singleCountryModal, setSingleCountryModal] = useState();

    //actual window dimensions
    const {height, width} = useWindowDimensions();


   //function for handling game interval
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

    //game time
    const [days, setDays] = useRecoilState(GameTimeState);

    //value, which determines if game is running
    const [gameFlow,] = useRecoilState(GameFlowState);

    //value, which stores time - how often is interval called
    const [intervalSpeed,] = useRecoilState(GameIntervalState);

    //breakpoint for adding game currency, based on increasing infectious
    const [infectedBreakpoints, setInfectedBreakpoints] = useRecoilState(CurrencyInfectedPopulationBreakpointState);

    //game parameters
    const [betaParameter,] = useRecoilState(BetaState);
    const [gammaParameter, setGammaParameter] = useRecoilState(GammaState);
    const [deltaParameter,] = useRecoilState(DeltaState);

    //all countries data
    const [allCountries, setAllCountries] = useRecoilState(mapContainerState);

    //data for graph and game over
    const [, setGraphData] = useRecoilState(GraphDataState);
    let susceptibleWorldData = useRecoilValue(susceptiblesSelector);
    let infectiousWorldData = useRecoilValue(infectiousSelector);
    let recoveredWorldData = useRecoilValue(recoveredSelector);
    let deceasedWorldData = useRecoilValue(deceasedSelector);


    //game messages
    const [, setMessages] = useRecoilState(MessageModalState);

    //counter for unread game messages
    const [, setMessageCounter] = useRecoilState(NewMessagesCounter);

    //clickable (temporary) currency
    const [clickableGameCurrency, setClickAbleGameCurrency] = useRecoilState(ClickableGameCurrencyState);

    //game trust messages
    const [, setTrustMessages] = useRecoilState(TrustMessageState);

    //map color
    const [mapColor,] = useRecoilState(mapColorDataState);
    //function for scaling color of single countries based on numbers
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

    /**
     * Arrow function for infecting new countries
     * @param countryName - iso code of country
     * @param infectiousOrigin - infectious origin - infecting by borders, airplanes...
     * RETURNS: modified single country data
     */
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
        //setting game message state
        setMessages((prevStats) => ([...prevStats, {
            iso: countryName,
            name: data.NAME,
            primaryMessage: " ● Nakazila sa nová krajina - " + data.NAME + ". Oblasť " + data.subregion + ".",
            day: days,
            reason: 'infecting'
        }]));

        //setting unread message counter
        setMessageCounter(prev => (prev + 1));

        //randomize chance for getting clickable game currency after infecting new country
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

    /**
     * Arrow function, which handle recalculation for all compartments for single country
     * @param countryName - iso code of country
     * RETURNS: modified single country data
     */
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

        //value of new susceptible for country
        const [newSusceptibleValue] = susceptibleCalculate(vaccineState.vaccineDevelopmentFinished, S, I, N, gammaParameter, betaParameter);

        //value of new infectious for country
        //infectiousUnderZero - check for infectious dropping under zero
        //infectiousPushToRD - check if infectious has to be pushed to recovered/deceased
        //infectiousBiggerThanPopulation - check if infectious didnt overgrow whole population number
        //infArrayLocal - check if infectious didnt loop
        //LoopPushToRD - if they are looping, push them to recovered/deceased
        const [newInfectiousValue, infectiousUnderZero, infectiousPushToRD, infectiousBiggerThanPopulation, infArrayLocal, LoopPushToRD] = infectiousCalculate(S, I, N, betaParameter,
            gammaParameter, deltaParameter, infArrayState, vaccineState.vaccineDevelopmentFinished);

        //value of new recovered for country
        const newRecoveredValue = recoveredCalculate(S, I, R, N, gammaParameter, deltaParameter, infectiousUnderZero, LoopPushToRD, infectiousBiggerThanPopulation,
            infectiousPushToRD, vaccineState.vaccineDevelopmentFinished);

        //value of new deceased for country
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

    //region restrictions, for decreasing chance of infecting new countries
    const [regionRestrictions,] = useRecoilState(RegionTravelRestrictionState);

    //value check for first infected country
    const [pickFirstInfectedCountry, setPickFirstInfectedCountry] = useRecoilState(FirstInfectedCountryState);

    //vaccine state
    const [vaccineState, setVaccineState] = useRecoilState(VaccineState);

    //TRUST state
    //number of infectious countries
    const infectiousCountriesNumber = useRecoilValue(infectiousCountriesNumberSelector);
    //number of active measurements from Cure
    const cureMeasuresNumber = useRecoilValue(CureMeasuresSelector);
    //number of active measurements from Communication
    const communicationMeasuresNumber = useRecoilValue(CommunicationMeasuresSelector);
    //number of active measurements from Infection prevention
    const infectionPreventionMeasuresNumber = useRecoilValue(InfectionPreventionMeasuresSelector);
    //number of active measurements from Tracing and Testing
    const tracingTestingMeasuresNumber = useRecoilValue(TracingTestingMeasuresSelector);
    //number of active measurements from Vaccine
    const vaccineMeasuresNumber = useRecoilValue(VaccineMeasuresSelector);
    //number of active measurements from Travel restriction
    const travelRestrictionMeasuresNumber = useRecoilValue(TravelRestrictionMeasuresSelector);
    //number of active measurements from regions- travel restrictions
    const regionTravelRestrictionMeasuresNumber = useRecoilValue(RegionTravelRestrictionMeasuresSelector);
    //sum number of active measurements from Travel restrictions and Region travel restrictions
    const allTravelRestrictionMeasuresNumber = travelRestrictionMeasuresNumber + regionTravelRestrictionMeasuresNumber;

    //number of global deceased
    const deceasedWorlWideNumber = useRecoilValue(deceasedSelector);
    //value, which determines if lockdown is activated
    const lockDownMeasureState = useRecoilValue(TravelRestrictionLockDownSelector);
    //value, which determines how long was lockdown activated etc.
    const [strictMeasuresTime, setStrictMeasuresTime] = useRecoilState(StrictMeasuresTimeState);
    //values, which determines if borders/seaports/airports are closed
    const bordersMeasureState = useRecoilValue(RegionBordersSelector);
    const airportsMeasureState = useRecoilValue(RegionAirportsSelector);
    const seaportsMeasureState = useRecoilValue(RegionSeaportsSelector);

    //trust value
    const [trustValue, setTrustValue] = useRecoilState(GameTrustState);


    useInterval(() => {

        //check if game is running
        if (gameFlow === true) {

            //game time incrementation (adding days)
            setDays(prevDays => prevDays + 1);

            //object for countries that are going to be recalculated - used for one-time setting countries state
            let countries = {};
            //countries from countries state
            const countryCodes = Object.keys(allCountries);

            /**
             * random infecting FIRST country
             */
            infectFirstCountry(pickFirstInfectedCountry, countryCodes, allCountries, countries, infectingNewCountry, setPickFirstInfectedCountry);

            /**
             * function that handle game trust
             */
            gameTrustHandle(infectiousCountriesNumber, cureMeasuresNumber, communicationMeasuresNumber,
                infectionPreventionMeasuresNumber, tracingTestingMeasuresNumber, allTravelRestrictionMeasuresNumber,
                vaccineMeasuresNumber, deceasedWorlWideNumber, days, lockDownMeasureState, strictMeasuresTime,
                setStrictMeasuresTime, bordersMeasureState, airportsMeasureState, seaportsMeasureState,
                trustValue, setGameOverState, setTrustValue, setTrustMessages);

            /**
             * function that handle vaccine
             */
            gameVaccineHandle(vaccineState, days, setGammaParameter, setMessages, setVaccineState);

            /**
             * loop for all countries - infecting new countries
             */
            Object.keys(allCountries).forEach(currentCountry => {
                infectionSpread(currentCountry, allCountries, regionRestrictions, countries, infectingNewCountry, countryCodes, compartmentsRecalculateValues);
            })

            /**
             * currency increment handle
             */
            addCurrency(infectiousWorldData, infectedBreakpoints, clickableGameCurrency, days, setClickAbleGameCurrency, setInfectedBreakpoints);

            //setter for graph data
            setGraphData((prevStats) => ([...prevStats, {
                inf: infectiousWorldData,
                sus: susceptibleWorldData,
                rec: recoveredWorldData,
                dec: deceasedWorldData,
                day: days
            }]));

            //setter for updating countries
            setAllCountries((prevAllCountriesState) => {
                return {
                    ...prevAllCountriesState, ...countries
                }
            });

            /**
             * game over handle
             */
            gameOver(recoveredWorldData, susceptibleWorldData, infectiousWorldData, days, setGameOverState);
        }

    }, intervalSpeed);
//-------------------------------------------------------------------->

    const mapHeight = height * 0.75;
    const mapWidth = width * 0.75;

    //responsive map
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
