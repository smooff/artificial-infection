/**
 * function for infecting new countries
 * @param currentCountry - contains current country
 * @param allCountries - contains all countries
 * @param regionRestrictions - contains region restrictions (from measurements) for decreasing chance of infection
 * @param countries - new object, where are new infected countries set - this object is used then to set the main object
 * @param infectingNewCountry - function for infecting new country
 * @param countryCodes - country codes of all coutnries
 * @param compartmentsRecalculateValues - function for recalculating compartments
 */
export const infectionSpread = (currentCountry, allCountries, regionRestrictions, countries, infectingNewCountry, countryCodes, compartmentsRecalculateValues) => {

    //check if country is infected
    if (allCountries[currentCountry].infectivity === 1) {

        //check if country fulfills requirements needed for infecting
        if ((allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0003 || allCountries[currentCountry].Infectious > 10000) && allCountries[currentCountry].Infectious > 15) {

            //INFECTING BY BORDERS
            allCountries[currentCountry].border.forEach(element => {
                //check if targeted country can be infected
                if (allCountries[element].infectivity === 0) {
                    //iterating in RegionTravelRestrictionState
                    for (const region in regionRestrictions) {
                        if (allCountries[element].region === region) {
                            if (regionRestrictions.hasOwnProperty(region)) {
                                //check if borders in region are opened - if yes chance for infecting is "normal"
                                if (regionRestrictions[region].borders === 0) {
                                    if (Math.random() < 0.006) {
                                        countries[element] = infectingNewCountry(element, "border");
                                    }
                                    //check if borders in region are closed - if yes chance for infecting is "lower"
                                } else if (regionRestrictions[region].borders === 1) {
                                    if (Math.random() < 0.003) {
                                        countries[element] = infectingNewCountry(element, "border");
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

        //INFECTING BY REGIONS AND SUBREGIONS
        for (const property in allCountries) {
            if (allCountries.hasOwnProperty(property)) {
                //check if country fulfills requirements needed for infecting
                if ((allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0004 || allCountries[currentCountry].Infectious > 35000) && allCountries[currentCountry].Infectious > 20) {

                    //REGION
                    if (allCountries[property].region === allCountries[currentCountry].region) {
                        if (allCountries[property].infectivity === 0) {
                            //check if borders in region are opened - if yes chance for infecting is "normal"
                            if (regionRestrictions[allCountries[property].region].borders === 0) {
                                if (Math.random() < 0.002) {
                                    countries[property] = infectingNewCountry(property, "region");
                                    //breaking for, so we wont let infect more countries in for loop, decrease of new infections
                                    break;
                                }
                                //check if borders in region are closed - if yes chance for infecting is "lower"
                            } else if (regionRestrictions[allCountries[property].region].borders === 1) {
                                if (Math.random() < 0.001) {
                                    countries[property] = infectingNewCountry(property, "region");
                                    //breaking for, so we wont let infect more countries in for loop, decrease of new infections
                                    break;
                                }
                            }
                        }
                    }
                }

                //check if country fulfills requirements needed for infecting
                if ((allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.00035 || allCountries[currentCountry].Infectious > 20000) && allCountries[currentCountry].Infectious > 20) {
                    //SUBREGION
                    if (allCountries[property].subregion === allCountries[currentCountry].subregion) {
                        if (allCountries[property].infectivity === 0) {
                            //check if borders in region are opened - if yes chance for infecting is "normal"
                            if (regionRestrictions[allCountries[property].region].borders === 0) {
                                if (Math.random() < 0.003) {
                                    countries[property] = infectingNewCountry(property, "subregion");
                                    break;
                                }
                                //check if borders in region are closed - if yes chance for infecting is "lower"
                            } else if (regionRestrictions[allCountries[property].region].borders === 1) {
                                if (Math.random() < 0.002) {
                                    countries[property] = infectingNewCountry(property, "subregion");
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        //INFECTING BY ARIPORTS
        if ((allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.00035 || allCountries[currentCountry].Infectious > 15000) && allCountries[currentCountry].Infectious > 25) {

            //choosing country to infect
            const pickCountryToInfectViaPlanes = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
            //check if it is not infected already
            if (allCountries[pickCountryToInfectViaPlanes].infectivity === 0) {
                for (const regionFromInfecting in regionRestrictions) {
                    if (regionRestrictions.hasOwnProperty(regionFromInfecting)) {
                        if (allCountries[currentCountry].region === regionFromInfecting) {
                            //check if origin country has open airports
                            if (regionRestrictions[regionFromInfecting].airports === 0) {
                                if (Math.random() < 0.008) {
                                    for (const regionToInfect in regionRestrictions) {
                                        if (regionRestrictions.hasOwnProperty(regionToInfect)) {
                                            if (allCountries[pickCountryToInfectViaPlanes].region === regionToInfect) {
                                                //check if destination country has open airports
                                                if (regionRestrictions[regionToInfect].airports === 0) {
                                                    countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes, "airTraffic");
                                                } else if (regionRestrictions[regionToInfect].airports === 1) {
                                                    if (Math.random() < 0.0501) {
                                                        countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes, "airTraffic");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (regionRestrictions[regionFromInfecting].airports === 1) {
                                if (Math.random() < 0.001) {
                                    for (const regionToInfect in regionRestrictions) {
                                        if (regionRestrictions.hasOwnProperty(regionToInfect)) {
                                            if (allCountries[pickCountryToInfectViaPlanes].region === regionToInfect) {
                                                //check if destination country has open airports
                                                if (regionRestrictions[regionToInfect].airports === 0) {
                                                    countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes, "airTraffic");
                                                } else if (regionRestrictions[regionToInfect].airports === 1) {
                                                    if (Math.random() < 0.05) {
                                                        countries[pickCountryToInfectViaPlanes] = infectingNewCountry(pickCountryToInfectViaPlanes, "airTraffic");
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
            }
        }

        //INFECTING BY SEAPORTS
        if ((allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0005 || allCountries[currentCountry].Infectious > 17000) && allCountries[currentCountry].Infectious > 30) {

            //choosing country to infect
            const pickCountryToInfectViaShips = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
            //check if it is not infected already
            if (allCountries[pickCountryToInfectViaShips].infectivity === 0) {
                for (const regionFromInfecting in regionRestrictions) {
                    if (regionRestrictions.hasOwnProperty(regionFromInfecting)) {
                        if (allCountries[currentCountry].region === regionFromInfecting) {
                            //check if origin country has open seaports
                            if (regionRestrictions[regionFromInfecting].seaports === 0) {
                                if (Math.random() < 0.005) {
                                    for (const regionToInfect in regionRestrictions) {
                                        if (regionRestrictions.hasOwnProperty(regionToInfect)) {
                                            if (allCountries[pickCountryToInfectViaShips].region === regionToInfect) {
                                                //check if destination country has open seaports
                                                if (regionRestrictions[regionToInfect].seaports === 0) {
                                                    countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips, "seaTraffic");
                                                } else if (regionRestrictions[regionToInfect].seaports === 1) {
                                                    if (Math.random() < 0.0502) {
                                                        countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips, "seaTraffic");
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (regionRestrictions[regionFromInfecting].seaports === 1) {
                                if (Math.random() < 0.001) {
                                    for (const regionToInfect in regionRestrictions) {
                                        if (regionRestrictions.hasOwnProperty(regionToInfect)) {
                                            if (allCountries[pickCountryToInfectViaShips].region === regionToInfect) {
                                                //check if destination country has open seaports
                                                if (regionRestrictions[regionToInfect].seaports === 0) {
                                                    countries[pickCountryToInfectViaShips] = infectingNewCountry(pickCountryToInfectViaShips, "seaTraffic");
                                                } else if (regionRestrictions[regionToInfect].seaports === 1) {
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
            }
        }
        countries[currentCountry] = compartmentsRecalculateValues(currentCountry);
    }
}
/**
 * function for handling game trust
 * @param infectiousCountriesNumber - number of infected countries
 * @param cureMeasuresNumber - number of activated measurements of type Cure
 * @param communicationMeasuresNumber - number of activated measurements of type Communication
 * @param infectionPreventionMeasuresNumber - number of activated measurements of type Infection Prevention
 * @param tracingTestingMeasuresNumber - number of activated measurements of type Tracing and testing
 * @param allTravelRestrictionMeasuresNumber - number of activated measurements of type Travel restriction
 * @param vaccineMeasuresNumber - number of activated measurements of type Vaccine
 * @param deceasedWorlWideNumber - global number of deceased
 * @param days - game time
 * @param lockDownMeasureState - determines if lockdown is activated
 * @param strictMeasuresTime - contains how long (game time) have been strict measurements activated
 * @param setStrictMeasuresTime - reset game time for strict measurements
 * @param bordersMeasureState - determines if borders are closed
 * @param airportsMeasureState - determines if airports are closed
 * @param seaportsMeasureState - determines if seaports are closed
 * @param trustValue - contains game trust
 * @param setGameOverState - sets game end
 * @param setTrustValue - sets game trust
 * @param setTrustMessages - sets game trust messages
 * @returns {null}
 */
export const gameTrustHandle = (infectiousCountriesNumber, cureMeasuresNumber, communicationMeasuresNumber,
                                infectionPreventionMeasuresNumber, tracingTestingMeasuresNumber, allTravelRestrictionMeasuresNumber,
                                vaccineMeasuresNumber, deceasedWorlWideNumber, days, lockDownMeasureState, strictMeasuresTime,
                                setStrictMeasuresTime, bordersMeasureState, airportsMeasureState, seaportsMeasureState,
                                trustValue, setGameOverState, setTrustValue, setTrustMessages) => {
    let triggerPoint = 0;
    let trustDecrease = 0;
    let messageString = "";
    //BREAKPOINTS CHECKING VARIOUS SITUATIONS
    if (infectiousCountriesNumber > 10 && (cureMeasuresNumber === 0 && communicationMeasuresNumber === 0 && infectionPreventionMeasuresNumber === 0
        && tracingTestingMeasuresNumber === 0 && allTravelRestrictionMeasuresNumber === 0 && vaccineMeasuresNumber === 0)) {
        trustDecrease += 4;
        triggerPoint++;
        messageString = messageString.concat(" ● Nakazilo sa príliš veľa krajín bez akéhokoľvek aktivovaného opatrenia. Aktivuj nejaké opatrenie.\n");
    }
    if (infectiousCountriesNumber > 15 && (allTravelRestrictionMeasuresNumber === 0)) {
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

    //1 million
    if (deceasedWorlWideNumber > 1000000 && (cureMeasuresNumber === 0 && communicationMeasuresNumber === 0 && infectionPreventionMeasuresNumber === 0
        && tracingTestingMeasuresNumber === 0 && allTravelRestrictionMeasuresNumber === 0 && vaccineMeasuresNumber === 0)) {
        trustDecrease += 3;
        triggerPoint++;
        messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí bez akéhokoľvek aktivovaného opatrenia. Aktivuj nejaké opatrenie. \n");
    }
    //2 millions
    if (deceasedWorlWideNumber > 2000000 && cureMeasuresNumber === 0) {
        trustDecrease += 3;
        triggerPoint++;
        messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu slabej liečby. Aktivuj viacero opatrení zo sekcie Liečba. \n");
    }
    //10 millions
    if (deceasedWorlWideNumber > 10000000 && cureMeasuresNumber < 2) {
        trustDecrease += 3;
        triggerPoint++;
        messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu slabej liečby. Aktivuj viacero opatrení zo sekcie Liečba. \n");
    }
    //100 millions
    if (deceasedWorlWideNumber > 100000000 && cureMeasuresNumber < 3) {
        trustDecrease += 3;
        triggerPoint++;
        messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu slabej liečby. Aktivuj opatrenie zo sekcie Liečba. \n");
    }
    //150 millions
    if (deceasedWorlWideNumber > 150000000 && vaccineMeasuresNumber === 0) {
        trustDecrease += 3;
        triggerPoint++;
        messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu nevyvíjania vakcíny. Aktivuj opatrenie zo sekcie Vakcína. \n");
    }
    //approx 75% population deceased
    if (deceasedWorlWideNumber > 5500000000 && cureMeasuresNumber < 5 && vaccineMeasuresNumber === 0 && communicationMeasuresNumber < 6 && infectionPreventionMeasuresNumber < 3) {
        trustDecrease += 1;
        triggerPoint++;
        messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z viacerých možných dôvodov. Aktivuj opatrenia zo sekcie Liečba, Vakcína, Komunikácia alebo Prevencia nakazenia. \n");
    }

    if (days > 90 && vaccineMeasuresNumber === 0) {
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

    //every 30 days, trust is decreased if lockdown is active or is being activated
    if (lockDownMeasureState !== 0) {
        //one time activation
        if (strictMeasuresTime.lockdown === 0) {
            trustDecrease += 7;
            triggerPoint++;
            messageString = messageString.concat(" ● Dôvera klesla z dôvodu akitvácie lockdownu. \n");
        }
        //every 30 days
        if (strictMeasuresTime.lockdown === 30) {
            trustDecrease += 7;
            triggerPoint++;

            // if lockdown is active + no measurements = even higher trust decrease
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

    //every 25 days, trust is decreased if borders are closed or are being closed
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

            //if borders are closed + no active measurements from communication = even higher trust decrease
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

    //every 25 days, trust is decreased if airports are closed or are being closed
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

            //if airports are closed + no active measurements from communication = even higher trust decrease
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

    //every 25 days, trust is decreased if seaports are closed or are being closed
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

            //if seaports are closed + no active measurements from communication = even higher trust decrease
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
        if ((trustValue - trustDecrease) < 1) {
            setGameOverState((prevStats) => {
                return {...prevStats, lose: 1, loseReason: "Stratil si všetku hernú dôveru."};
            });
        }
        if (trustValue - trustDecrease < 0) {
            setTrustValue(0);
        } else {
            setTrustValue(prev => (prev - trustDecrease));
        }
        setTrustMessages((prevStats) => ([...prevStats, {
            name: "Dôvera",
            primaryMessage: messageString,
            day: days,
            reason: 'trust'
        }]));
    }

}
/**
 * arrow function for handling game over
 * @param recoveredWorldData - global data of recovered
 * @param susceptibleWorldData - global data of susceptible
 * @param infectiousWorldData global data of infected
 * @param days - game time
 * @param setGameOverState - setting game over
 */
export const gameOver = (recoveredWorldData, susceptibleWorldData, infectiousWorldData, days, setGameOverState) => {
    if (recoveredWorldData > 1000000) {
        setGameOverState((prevStats) => {
            return {...prevStats, win: 1, winReason: "Dokázal si vyliečiť viac ako 1 milión ovyvateľov."};
        });
    } else if (susceptibleWorldData < 1000000 && infectiousWorldData === 0 && recoveredWorldData === 0 && days > 100) {
        setGameOverState((prevStats) => {
            return {...prevStats, lose: 1, loseReason: "Nedokázal si vyliečiť viac ako 1 milión ovyvateľov."};
        });
    } else if ((susceptibleWorldData + infectiousWorldData < 1000000) && recoveredWorldData === 0 && days > 100) {
        setGameOverState((prevStats) => {
            return {...prevStats, lose: 1, loseReason: "Nedokázal si vyliečiť viac ako 1 milión ovyvateľov."};
        });
    }
}
/**
 * arrow function for adding game currency
 * @param infectiousWorldData - global data of infected
 * @param infectedBreakpoints - infected number breakpoints
 * @param clickableGameCurrency - clickable game currency
 * @param days - game time
 * @param setClickAbleGameCurrency - setting clickable game currency
 * @param setInfectedBreakpoints - setting infected number breakpoints
 */
export const addCurrency = (infectiousWorldData, infectedBreakpoints, clickableGameCurrency, days, setClickAbleGameCurrency, setInfectedBreakpoints) => {
    //adding clickable currency for every 50mil. infected
    if (infectiousWorldData > infectedBreakpoints) {
        if (infectiousWorldData < 1000000000) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 1));
            }
            setInfectedBreakpoints(prev => (prev + 50000000))
        }
    }
    //adding clickable currency every 20 days (game time)
    if ((days % 20) === 0) {
        if (days > 0 && days < 100) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 4));
            }
        }
        if (days >= 100 && days < 220) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 2));
            }
        }
        if (days >= 220) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 3));
            }
        }
    }
}
/**
 * arrow function for infecting first country
 * @param pickFirstInfectedCountry - value, if first country was already infected
 * @param countryCodes - all codes of countries
 * @param allCountries - all countries
 * @param countries - new object, where are new infected countries set - this object is used then to set the main object
 * @param infectingNewCountry - function for infecting coutnry
 * @param setPickFirstInfectedCountry - setting value, which determines if first country was infected
 */
export const infectFirstCountry = (pickFirstInfectedCountry, countryCodes, allCountries, countries, infectingNewCountry, setPickFirstInfectedCountry) => {
    //random infection
    if (pickFirstInfectedCountry === 0) {
        const firstCountry = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
        countries[firstCountry] = infectingNewCountry(firstCountry, "initial");
        setPickFirstInfectedCountry(1);
    }
}

/**
 * function for getting random number in range
 * @param min
 * @param max
 * @returns {number}
 */
export function getRandomNumberInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * function for initializing vaccine development time
 * @param vaccineState - vaccine measurement state
 * @param setVaccineState - setter for vaccine measurement state
 */
export const vaccineInitialization = (vaccineState, setVaccineState) => {

    //1095 days = 3 years, 2920 days = 8 years
    const vaccineStep1Start = 1095;
    const vaccineStep1End = 2920;
    //730 days = 2 years, 3650 days = 10 years
    const vaccineStep2Start = 730;
    const vaccineStep2End = 3650;
    //365 days = 1 years, 730 days = 2 years
    const vaccineStep3Start = 365;
    const vaccineStep3End = 730;

    //inicializacia casu vakciny (tradicny vyvoj)
    //initializing development time (traditional development)
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
}

/**
 * function for handling vaccine events
 * @param vaccineState - vaccine measurement state
 * @param days - game time
 * @param setGammaParameter - setter for gamma parameter
 * @param setMessages - setter for game messages
 * @param setVaccineState - setter for vaccine measurement state
 */
export const gameVaccineHandle = (vaccineState, days, setGammaParameter, setMessages, setVaccineState) => {

    //first development time initialization
    vaccineInitialization(vaccineState, setVaccineState);

    //if development is finished - recover the remaining population
    if (vaccineState.vaccineDevelopmentFinished === true) {
        setGammaParameter(0.49);
    }

    //whole development time
    let maxDevelopmentTime = vaccineState.step1Time + vaccineState.step2Time + vaccineState.step3Time;
    //vaccine development
    if (vaccineState.ActivationVaccineDevelopment === 1) {
        //handler for over exceeding development time by activating vaccine measurements at the end of the development
        if (vaccineState.actualDevelopmentTime > maxDevelopmentTime) {
            setMessages((prevStats) => ([...prevStats, {
                name: "Vakcína",
                primaryMessage: " ● Vývoj vakcíny bol dokončený.",
                day: days,
                reason: 'vaccine'
            }]));
            setVaccineState((prevStats) => {
                return {
                    ...prevStats,
                    actualDevelopmentTime: maxDevelopmentTime,
                    vaccineDevelopmentFinished: true,
                };
            });
        }
        //incrementing development time
        if (vaccineState.actualDevelopmentTime < maxDevelopmentTime) {
            let actualVaccineTime = vaccineState.actualDevelopmentTime + 1;

            //check if vaccine development will be finished in next iteration
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

            //setting dev. time
            setVaccineState((prevStats) => {
                return {
                    ...prevStats,
                    actualDevelopmentTime: actualVaccineTime,
                };
            });
            //handler for setting over exceeded dev. time
        } else if (vaccineState.actualDevelopmentTime > maxDevelopmentTime) {
            setVaccineState((prevStats) => {
                return {
                    ...prevStats,
                    actualDevelopmentTime: maxDevelopmentTime,
                };
            });
        }
    }
}

/**
 * function for recalculating susceptible
 * @param vaccineDevelopmentFinished - value, which determines if vaccine dev. is finished
 * @param S - number of susceptible (single country)
 * @param I - number of infectious (single country)
 * @param N - population (single country)
 * @param gammaParameter - gamma parameter
 * @param betaParameter - beta parameter
 * RETURNS : new infectious number
 */
export const susceptibleCalculate = (vaccineDevelopmentFinished, S, I, N, gammaParameter, betaParameter) => {
    let newSusceptible;
    //if vaccine dev. is finished
    if (vaccineDevelopmentFinished === true) {
        //"transfer" susceptible to recovered - recalculation
        newSusceptible = (S - Math.ceil(gammaParameter * S));
    } else {
        //"transfer" susceptible to infected - recalculation
        newSusceptible = (S - Math.ceil((betaParameter * S * I) / N));
    }

    //check for susceptible dropping under 0
    if (newSusceptible < 0) {
        newSusceptible = 0;
    }

    return [newSusceptible];
}

/**
 * function for recalculating infectious
 * @param S - number of susceptible (single country)
 * @param I - number of infectious (single country)
 * @param N - population (single country)
 * @param betaParameter - beta parameter
 * @param gammaParameter - gamma parameter
 * @param deltaParameter - delta parameter
 * @param infArrayState - array, which contains 3 previous values of infectious (single country)
 * @param vaccineDevelopmentFinished - value, which determines if vaccine dev. is finished
 * RETURNS : newInfectious - new infectious,
 *           infectiousUnderZero - previous state of inf. before dropping under 0,
 *           infectiousPushToRD - if this number is 0, force "transfer" based on low number of inf.
 *           infectiousBiggerThanPopulation - check if inf. is bigger than population,
 *           infArrayLocal - previous infectious state,
 *           LoopPushToRD - forcing "transfer" to rec./dec. based on looping inf.
 */
export const infectiousCalculate = (S, I, N, betaParameter, gammaParameter, deltaParameter, infArrayState, vaccineDevelopmentFinished) => {
    //if development is finished "transfer" infectious to recovered
    if (vaccineDevelopmentFinished === true) {
        let newInfectious = I - Math.ceil(gammaParameter * I);
        //drop under zero check
        if (newInfectious < 0) {
            newInfectious = 0;
        }
        return [newInfectious, 0, I, 0, [10, 11, 12], 0];
    }

    //recalculation for new infectious - "transfer" infectious to deceased and recovered(rec. has param. 0 - no real transfer)
    let newInfectious = (I + Math.ceil((betaParameter * S * I) / N)) - Math.round(gammaParameter * I) - Math.round(deltaParameter * I);

    let infectiousBiggerThanPopulation = 0;
    let infectiousUnderZero = 0;
    //handler for infectious over exceeding population number
    if (newInfectious > N) {
        newInfectious = N - Math.round(gammaParameter * N) - Math.round(deltaParameter * N);
        infectiousBiggerThanPopulation = 1;
    }//handler if infectious drop under 0
    else if (newInfectious < 0) {
        infectiousUnderZero = newInfectious;
        newInfectious = 0;
    }//handler if susceptible drops under 0 after "transfer" to infectious
    else if ((S - Math.ceil((betaParameter * S * I) / N)) < 0) {
        newInfectious = (I + S - Math.round(gammaParameter * I) - Math.round(deltaParameter * I));
    }

    const infectiousPushToRD = I - newInfectious;
    if ((I - newInfectious) === 0) {
        //handler if there is no "transfer" to infectious, so infectious can be reduced
        if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
            newInfectious = (I + Math.ceil((betaParameter * S * I) / N) - Math.ceil(gammaParameter * I) - Math.ceil(deltaParameter * I));

            if (newInfectious < 0) {
                infectiousUnderZero = newInfectious;
                newInfectious = 0;
            }
        }
    }

    let LoopPushToRD = 0;
    //handler scenario: susceptible is big number, infectious number is approaching to 0 however infectious will not reach 0 - because infectious
    // are "transferring" using Math.ceil

    //State array copied to lcoal array, after managing local array we return it to the State
    let infArrayLocal = Array.from(infArrayState);
    infArrayLocal.push(newInfectious);
    //if array has 3 elements, the last one is popped out (3element size array)
    if (infArrayLocal.length > 3) {
        infArrayLocal.shift();
        //check if infectious are looping (e.g. slow "transfer" from susceptible to infectious, in case infectious are close to 0)
        if (infArrayLocal[0] === infArrayLocal[1] && infArrayLocal[1] === infArrayLocal[2]) {
            //check for 0 value
            if (infArrayLocal[0] !== 0) {
                //force decrease infectious
                newInfectious = newInfectious - 10;
                LoopPushToRD = 1;

                //drop under 0 check
                if (newInfectious < 0) {
                    infectiousUnderZero = newInfectious;
                    newInfectious = 0;
                    LoopPushToRD = 2;
                }
            }
            //check if infectious are looping (e.g. delta (and gamma) are decreasing only every second iteration - looping 8,9,8 / 9,8,9)
        } else if (infArrayLocal[0] === infArrayLocal[2] && infArrayLocal[0] < infArrayLocal[1] && infArrayLocal[0] < 20) {
            if (infArrayLocal[0] !== 0) {
                newInfectious = newInfectious - 10;
                LoopPushToRD = 1;

                //drop under 0 check
                if (newInfectious < 0) {
                    infectiousUnderZero = newInfectious;
                    newInfectious = 0;
                    LoopPushToRD = 2;
                }
            }
        }
    }
    return [newInfectious, infectiousUnderZero, infectiousPushToRD, infectiousBiggerThanPopulation, infArrayLocal, LoopPushToRD];
}

/**
 * function for recalculating recovered
 * @param S - number of susceptible (single country)
 * @param I - number of infectious (single country)
 * @param R - number of recovered (single country)
 * @param N - population (single country)
 * @param gammaParameter - gamma parameter
 * @param deltaParameter - delta parameter
 * @param infectiousUnderZero - control different behaviour after inf. dropping under 0
 * @param LoopPushToRD - forcing "transfer" to rec./dec. based on looping inf.
 * @param infectiousBiggerThanPopulation - control different behaviour after inf. over exceed population
 * @param infectiousPushToRD - if this number is 0, force "transfer" based on low number of inf.
 * @param vaccineDevelopmentFinished - value, which determines if vaccine dev. is finished
 * @returns {number|*} - returns new recovered
 */
export const recoveredCalculate = (S, I, R, N, gammaParameter, deltaParameter, infectiousUnderZero, LoopPushToRD, infectiousBiggerThanPopulation, infectiousPushToRD, vaccineDevelopmentFinished) => {
    //if vaccine development finished
    if (vaccineDevelopmentFinished === true) {
        let newRecovered;

        //"transfer" check from sus. to rec. - if sus. drop under 0
        let checkSusDropUnderZero = (S - Math.ceil(gammaParameter * S));
        //recalculating new recovered from sus.
        let transferFromSus = Math.ceil(gammaParameter * S);
        //if sus. drops under 0 while recalculating
        if (checkSusDropUnderZero < 0) {
            transferFromSus = S;
        }

        //"transfer" check from inf. to rec. - if inf. drop under 0
        let checkInfDropUnderZero = (I - Math.ceil(gammaParameter * I));
        //recalculating new recovered from inf.
        let transferFromInf = Math.ceil(gammaParameter * I);
        //if inf. drops under 0 while recalculating
        if (checkInfDropUnderZero < 0) {
            transferFromInf = I;
        }

        //new recovered is sum of "transfer" from susceptible and infectious
        newRecovered = (R + transferFromSus + transferFromInf);

        return newRecovered
    }

    //in case "transfer" from inf. to rec., when happens that inf. drops under 0 and we need to fix "transfer" by lowering
    if (infectiousUnderZero < 0) {
        let splitInfectiousUnderZero = infectiousUnderZero / (gammaParameter + deltaParameter);
        let recoveredReduction = Math.round(gammaParameter * splitInfectiousUnderZero);//-1
        let newRecovered = R - recoveredReduction;

        //handler if "transfer" from inf. to rec. was forced based on looping (sus. to inf.)
        //if forcing makes inf. drop under 0 - fix
        //UPDATE: "transfer" is only from inf. to dec., rec. is the same
        if (LoopPushToRD === 2) {
            if (gammaParameter !== 0) {
                return Math.round(R + gammaParameter * I);
            }
            return R;
        }

        //if params. are same
        if (gammaParameter === deltaParameter) {
            return R;
        }

        return newRecovered;
    }

    //same as above - but inf. will not drop under 0 (case that "transfer" from inc. to rec. was forced based on looping)
    //UPDATE: "transfer" is only from inf. to dec., rec. is the same
    if (LoopPushToRD === 1) {
        //case looping 9,9,9 inf.
        //let zotaveny=Math.round(R + gammaParameter * I)+10;
        return R;
    }

    //if infectious are bigger than population
    if (infectiousBiggerThanPopulation === 1) {
        return Math.round(gammaParameter * N);
    }

    //force "transfer" from inf. based on low number of inf.
    if (infectiousPushToRD === 0) {
        if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
            //check if inf. are not just 1, if yes, compartment with higher parameter will take him
            if (I === 1) {
                if (gammaParameter > deltaParameter) {
                    return Math.ceil(R + gammaParameter * I);
                } else if (deltaParameter > gammaParameter) {
                    return R;
                }
            }
            return Math.ceil(R + gammaParameter * I);
        }
    }

    //return new recovered
    return Math.round(R + gammaParameter * I);
}

/**
 * function for recalculating deceased
 * @param I - number of susceptible (single country)
 * @param D - number of susceptible (single country)
 * @param N - population (single country)
 * @param gammaParameter - gamma parameter
 * @param deltaParameter - delta parameter
 * @param infectiousUnderZero - control different behaviour after inf. dropping under 0
 * @param LoopPushToRD - forcing "transfer" to rec./dec. based on looping inf.
 * @param infectiousBiggerThanPopulation - control different behaviour after inf. over exceed population
 * @param infectiousPushToRD - if this number is 0, force "transfer" based on low number of inf.
 * @param vaccineDevelopmentFinished - value, which determines if vaccine dev. is finished
 * @returns {number|*} - returns new deceased
 */
export const deceasedCalculate = (I, D, N, gammaParameter, deltaParameter, infectiousUnderZero, LoopPushToRD, infectiousBiggerThanPopulation, infectiousPushToRD, vaccineDevelopmentFinished) => {
    //if vaccine development finished
    if (vaccineDevelopmentFinished === true) {
        return D;
    }
    //in case "transfer" from inf. to rec., when happens that inf. drops under 0 and we need to fix "transfer" by lowering
    if (infectiousUnderZero < 0) {
        let splitInfectiousUnderZero = infectiousUnderZero / (gammaParameter + deltaParameter);
        let deceasedReduction = Math.round(deltaParameter * splitInfectiousUnderZero);
        let newDeceased = D - deceasedReduction;

        //handler if "transfer" from inf. to dec. was forced based on looping (sus. to inf.)
        //if forcing makes inf. drop under 0 - fix
        if (LoopPushToRD === 2) {
            return Math.round(D + deltaParameter * I) + 10 + infectiousUnderZero;
        }

        if (gammaParameter === deltaParameter) {
        }
        return newDeceased;
    }

    //same as above - but inf. will not drop under 0 (case that "transfer" from inc. to dec. was forced based on looping)
    //in case of looping 9,9,9 and 8,9,8 / 9,8,9 inf.
    if (LoopPushToRD === 1) {
        return Math.round(D + deltaParameter * I) + 10;
    }

    //if infectious are bigger than population
    if (infectiousBiggerThanPopulation === 1) {
        return Math.round(deltaParameter * N);
    }

    //force "transfer" from inf. based on low number of inf.
    if (infectiousPushToRD === 0) {
        if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
            //check if inf. are not just 1, if yes, compartment with higher parameter will take him
            if (I === 1) {
                if (deltaParameter > gammaParameter) {
                    return Math.ceil(D + deltaParameter * I);
                } else if (gammaParameter > deltaParameter) {
                    return D;
                }
            }
            return Math.ceil(D + deltaParameter * I);
        }
    }
    //return new deceased
    return Math.round(D + deltaParameter * I);
}
