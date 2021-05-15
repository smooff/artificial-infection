export const infectionSpread = (currentCountry, allCountries, regionRestrictions, countries, infectingNewCountry, countryCodes, compartmentsRecalculateValues) => {

    if (allCountries[currentCountry].infectivity === 1) {

        //check ci krajina povodu splna pocet infikovanych na infikovanie novej krajiny
        if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0003 || allCountries[currentCountry].Infectious > 10000) {

            //INFIKOVANIE CEZ HRANICE
            allCountries[currentCountry].border.forEach(element => {
                //check ci target krajina moze byt nakazena
                if (allCountries[element].infectivity === 0) {
                    //iteracia cez RegionTravelRestrictionState
                    for (const region in regionRestrictions) {
                        if (allCountries[element].region === region) {
                            if (regionRestrictions.hasOwnProperty(region)) {
                                //check ci su hranice v regione otvorene, ak ano, tak pravdepodobnost infikovania novej krajiny cez hranice je "normalna"
                                if (regionRestrictions[region].borders === 0) {
                                    if (Math.random() < 0.006) {
                                        countries[element] = infectingNewCountry(element, "border");
                                    }
                                    //check ci su hranice v regione uzavrete, ak ano, tak pravdepodobnost infikovania novej krajiny cez hranice je mensia
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

        //INFIKOVANIE CEZ REGION A SUBREGION
        for (const property in allCountries) {
            if (allCountries.hasOwnProperty(property)) {
                //check ci krajina povodu splna pocet infikovanych na infikovanie novej krajiny
                if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0004 || allCountries[currentCountry].Infectious > 35000) {

                    //REGION
                    if (allCountries[property].region === allCountries[currentCountry].region) {
                        if (allCountries[property].infectivity === 0) {
                            //check ci su v regione otvorene hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v regione je "normalna"
                            if (regionRestrictions[allCountries[property].region].borders === 0) {
                                if (Math.random() < 0.002) {
                                    countries[property] = infectingNewCountry(property, "region");
                                    //break pre for, aby sa v jednom for infikovala len jedna nova krajina, tym znizime vysoky prirastok novo-nakazenych krajin
                                    break;
                                }
                                //check ci su v regione uzavrete hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v regione je "mensia"
                            } else if (regionRestrictions[allCountries[property].region].borders === 1) {
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
                            if (regionRestrictions[allCountries[property].region].borders === 0) {
                                if (Math.random() < 0.003) {
                                    countries[property] = infectingNewCountry(property, "subregion");
                                    break;
                                }
                                //check ci su v regione uzavrete hranice, ak ano, tak pravdepodobnost infikovania novej krajiny v subregione je mensia
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
        //infikovanie cez LETISKA
        if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.00035 || allCountries[currentCountry].Infectious > 15000) {

            //vyber krajiny na nakazanie
            const pickCountryToInfectViaPlanes = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
            //check ci uz nie je nakazena
            if (allCountries[pickCountryToInfectViaPlanes].infectivity === 0) {
                for (const regionFromInfecting in regionRestrictions) {
                    if (regionRestrictions.hasOwnProperty(regionFromInfecting)) {
                        if (allCountries[currentCountry].region === regionFromInfecting) {
                            //check ci ma krajina povodu otvorene letiska
                            if (regionRestrictions[regionFromInfecting].airports === 0) {
                                if (Math.random() < 0.008) {
                                    for (const regionToInfect in regionRestrictions) {
                                        if (regionRestrictions.hasOwnProperty(regionToInfect)) {
                                            if (allCountries[pickCountryToInfectViaPlanes].region === regionToInfect) {
                                                //check ci ma vybrana krajina na infikovanie otvorene letiska
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
                            } else if (regionRestrictions[regionFromInfecting].airports === 1) {
                                if (Math.random() < 0.001) {
                                    for (const regionToInfect in regionRestrictions) {
                                        if (regionRestrictions.hasOwnProperty(regionToInfect)) {
                                            if (allCountries[pickCountryToInfectViaPlanes].region === regionToInfect) {
                                                //check ci ma vybrana krajina na infikovanie otvorene letiska
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

        //infikovanie cez PRISTAVY
        if (allCountries[currentCountry].Infectious > allCountries[currentCountry].Population * 0.0005 || allCountries[currentCountry].Infectious > 17000) {

            //vyber krajiny na nakazanie
            const pickCountryToInfectViaShips = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
            //check ci uz nie je nakazena
            if (allCountries[pickCountryToInfectViaShips].infectivity === 0) {
                for (const regionFromInfecting in regionRestrictions) {
                    if (regionRestrictions.hasOwnProperty(regionFromInfecting)) {
                        if (allCountries[currentCountry].region === regionFromInfecting) {
                            //check ci ma krajina povodu otvorene letiska
                            if (regionRestrictions[regionFromInfecting].seaports === 0) {
                                if (Math.random() < 0.005) {
                                    for (const regionToInfect in regionRestrictions) {
                                        if (regionRestrictions.hasOwnProperty(regionToInfect)) {
                                            if (allCountries[pickCountryToInfectViaShips].region === regionToInfect) {
                                                //check ci ma vybrana krajina na infikovanie otvorene letiska
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
                            } else if (regionRestrictions[regionFromInfecting].seaports === 1) {
                                if (Math.random() < 0.001) {
                                    for (const regionToInfect in regionRestrictions) {
                                        if (regionRestrictions.hasOwnProperty(regionToInfect)) {
                                            if (allCountries[pickCountryToInfectViaShips].region === regionToInfect) {
                                                //check ci ma vybrana krajina na infikovanie otvorene letiska
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

export const gameTrustHandle = (infectiousCountriesNumber, cureMeasuresNumber, communicationMeasuresNumber,
                                infectionPreventionMeasuresNumber, tracingTestingMeasuresNumber, allTravelRestrictionMeasuresNumber,
                                vaccineMeasuresNumber, deceasedWorlWideNumber, days, lockDownMeasureState, strictMeasuresTime,
                                setStrictMeasuresTime, bordersMeasureState, airportsMeasureState, seaportsMeasureState,
                                trustValue, setGameOverState, setTrustValue, setTrustMessages) => {
    let triggerPoint = 0;
    let trustDecrease = 0;
    let messageString = "";
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

    //1 milion
    if (deceasedWorlWideNumber > 1000000 && (cureMeasuresNumber === 0 && communicationMeasuresNumber === 0 && infectionPreventionMeasuresNumber === 0
        && tracingTestingMeasuresNumber === 0 && allTravelRestrictionMeasuresNumber === 0 && vaccineMeasuresNumber === 0)) {
        trustDecrease += 3;
        triggerPoint++;
        messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí bez akéhokoľvek aktivovaného opatrenia. Aktivuj nejaké opatrenie. \n");
    }
    //2 milion
    if (deceasedWorlWideNumber > 2000000 && cureMeasuresNumber === 0) {
        trustDecrease += 3;
        triggerPoint++;
        messageString = messageString.concat(" ● Zahynulo príliš veľa ľudí, dôvera klesá z dôvodu slabej liečby. Aktivuj viacero opatrení zo sekcie Liečba. \n");
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

export const addCurrency = (infectiousWorldData, infectedBreakpoints, clickableGameCurrency, days, setClickAbleGameCurrency, setInfectedBreakpoints) => {
    //pridanie docasnej meny za kazdych 50mil infikovanych
    if (infectiousWorldData > infectedBreakpoints) {
        if (infectiousWorldData < 1000000000) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 1));
            }
            setInfectedBreakpoints(prev => (prev + 50000000))
        }
    }
    //pridanie docasnej hernej meny kazdych 20 dni
    if ((days % 20) === 0) {
        if (days > 0 && days < 100) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 4));
            }
        }
        if (days >= 100 && days < 150) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 2));
            }
        }
        if (days >= 150 && days < 225) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 2));
            }
        }
        if (days >= 225) {
            if (clickableGameCurrency < 10) {
                setClickAbleGameCurrency(prev => (prev + 3));
            }
        }
    }
}

export const infectFirstCountry = (pickFirstInfectedCountry, countryCodes, allCountries, countries, infectingNewCountry, setPickFirstInfectedCountry) => {
    //nahodne nakazenie prvej krajiny
    if (pickFirstInfectedCountry === 0) {
        const firstCountry = countryCodes[Math.floor(Math.random() * Object.keys(allCountries).length)];
        countries[firstCountry] = infectingNewCountry(firstCountry, "initial");
        setPickFirstInfectedCountry(1);
    }
}

export function getRandomNumberInRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

export const vaccineInitialization = (vaccineState, setVaccineState) => {

    //1095 dni = 3 roky, 2920 dni = 8 rokov
    const vaccineStep1Start = 1095;
    const vaccineStep1End = 2920;
    //730 dni = 2 roky, 3650 dni = 10 rokov
    const vaccineStep2Start = 730;
    const vaccineStep2End = 3650;
    //365 dni = 1 rok, 730 dni = 2 roky
    const vaccineStep3Start = 365;
    const vaccineStep3End = 730;

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
}

export const gameVaccineHandle = (vaccineState, days, setGammaParameter, setMessages, setVaccineState) => {

    vaccineInitialization(vaccineState, setVaccineState);

    if (vaccineState.vaccineDevelopmentFinished === true) {
        setGammaParameter(0.49);
    }

    let maxDevelopmentTime = vaccineState.step1Time + vaccineState.step2Time + vaccineState.step3Time;
    //prepocet casu vyvoja vakciny od zaciatku jej vyvoja
    if (vaccineState.ActivationVaccineDevelopment === 1) {
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
}

export const susceptibleCalculate = (vaccineDevelopmentFinished, S, I, N, gammaParameter, betaParameter) => {
    let newSusceptible;
    if (vaccineDevelopmentFinished === true) {
        newSusceptible = (S - Math.ceil(gammaParameter * S));
    } else {
        newSusceptible = (S - Math.ceil((betaParameter * S * I) / N));
    }

    if (newSusceptible < 0) {
        newSusceptible = 0;
    }

    return [newSusceptible];
}

export const infectiousCalculate = (S, I, N, betaParameter, gammaParameter, deltaParameter, infArrayState, vaccineDevelopmentFinished) => {
    if (vaccineDevelopmentFinished === true) {
        let newInfectious = I - Math.ceil(gammaParameter * I);
        if (newInfectious < 0) {
            newInfectious = 0;
        }
        return [newInfectious, 0, I, 0, [10, 11, 12], 0];
    }

    let newInfectious = (I + Math.ceil((betaParameter * S * I) / N)) - Math.round(gammaParameter * I) - Math.round(deltaParameter * I);

    let infectiousBiggerThanPopulation = 0;
    let infectiousUnderZero = 0;
    if (newInfectious > N) {
        newInfectious = N - Math.round(gammaParameter * N) - Math.round(deltaParameter * N);
        infectiousBiggerThanPopulation = 1;
    }//ak infekcny padnu pod nulu
    else if (newInfectious < 0) {
        infectiousUnderZero = newInfectious;
        newInfectious = 0;
    }//ak S padne pod nulu po tom co ich I ma celych zobrat
    else if ((S - Math.ceil((betaParameter * S * I) / N)) < 0) {
        newInfectious = (I + S - Math.round(gammaParameter * I) - Math.round(deltaParameter * I));
    }

    const infectiousPushToRD = I - newInfectious;
    if ((I - newInfectious) === 0) {
        //ak uz do I neprichadza nic, tak aby dokazalo vytiahnut z I do R/D (aby vynulovalo I)
        if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
            newInfectious = (I + Math.ceil((betaParameter * S * I) / N) - Math.ceil(gammaParameter * I) - Math.ceil(deltaParameter * I));

            if (newInfectious < 0) {
                infectiousUnderZero = newInfectious;
                newInfectious = 0;
            }
        }
    }

    let LoopPushToRD = 0;
    //ak S je velke cislo a I sa blizi k nule ale nikdy ju nedosiahne (pretoze do I prichadzaju cez ceil)
    //kopirovanie State pola do Local pola, pracujeme s Local polom ktore returneme a to sa nasetuje do State
    let infArrayLocal = Array.from(infArrayState);
    infArrayLocal.push(newInfectious);
    //ak je po pushnuti hodnoty infekcnych pole vacsie ako 3 tak vyhodi posledny prvok (udrziavanie pola o velkosti 3)
    if (infArrayLocal.length > 3) {
        infArrayLocal.shift();
        //check ci su hodnoty infekcnych zacyklene (napr. pomale tahanie z S do I, v pripade ked I sa blizilo k nule)
        if (infArrayLocal[0] === infArrayLocal[1] && infArrayLocal[1] === infArrayLocal[2]) {
            //check pre nulu, pretoze ta nas nezaujima
            if (infArrayLocal[0] !== 0) {
                newInfectious = newInfectious - 10;
                LoopPushToRD = 1;

                if (newInfectious < 0) {
                    infectiousUnderZero = newInfectious;
                    newInfectious = 0;
                    LoopPushToRD = 2;
                }
            }
            //check ci su hodnoty infekcnych zacyklene, a zaroven gamma a delta su schopne tahat kazdu druhu iteraciu -> cyklenie 8,9,8 / 9,8,9
        } else if (infArrayLocal[0] === infArrayLocal[2] && infArrayLocal[0] < infArrayLocal[1] && infArrayLocal[0] < 20) {
            if (infArrayLocal[0] !== 0) {
                newInfectious = newInfectious - 10;
                LoopPushToRD = 1;

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

export const recoveredCalculate = (S, I, R, N, gammaParameter, deltaParameter, infectiousUnderZero, LoopPushToRD, infectiousBiggerThanPopulation, infectiousPushToRD, vaccineDevelopmentFinished) => {
    if (vaccineDevelopmentFinished === true) {
        let newRecovered;

        let checkSusDropUnderZero = (S - Math.ceil(gammaParameter * S));
        let transferFromSus = Math.ceil(gammaParameter * S);
        if (checkSusDropUnderZero < 0) {
            transferFromSus = S;
        }

        let checkInfDropUnderZero = (I - Math.ceil(gammaParameter * I));
        let transferFromInf = Math.ceil(gammaParameter * I);
        if (checkInfDropUnderZero < 0) {
            transferFromInf = I;
        }

        newRecovered = (R + transferFromSus + transferFromInf);

        return newRecovered
    }
    //if funkcny v pripade presunu z kompartmentu I do R,
    //kde I sa dostava do zapornej hodnoty a je potrebne to vykompenzovat v R (aj v D) upravenym-znizenym pripocitanim
    if (infectiousUnderZero < 0) {
        let splitInfectiousUnderZero = infectiousUnderZero / (gammaParameter + deltaParameter);
        let recoveredReduction = Math.round(gammaParameter * splitInfectiousUnderZero);//-1
        let newRecovered = R - recoveredReduction;

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

        return newRecovered;
    }

    //(tak ako vyssie len neskocia I pod nulu) pre pripad ze presun z I do R bol vynuteny na zaklade zacyklenia z S do I
    //UPDATE: prepocet nastava len z I do D, R ostava zachovane
    if (LoopPushToRD === 1) {
        //pre pripad zacyklenia 9,9,9
        //let zotaveny=Math.round(R + gammaParameter * I)+10;
        return R;
    }

    if (infectiousBiggerThanPopulation === 1) {
        return Math.round(gammaParameter * N);
    }

    if (infectiousPushToRD === 0) {
        if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
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

    return Math.round(R + gammaParameter * I);
}

export const deceasedCalculate = (I, D, N, gammaParameter, deltaParameter, infectiousUnderZero, LoopPushToRD, infectiousBiggerThanPopulation, infectiousPushToRD, vaccineDevelopmentFinished) => {
    if (vaccineDevelopmentFinished === true) {
        return D;
    }
    //rovnake osetrenie ako vo funkcii vyssie
    if (infectiousUnderZero < 0) {
        let splitInfectiousUnderZero = infectiousUnderZero / (gammaParameter + deltaParameter);
        let deceasedReduction = Math.round(deltaParameter * splitInfectiousUnderZero);
        let newDeceased = D - deceasedReduction;

        //pre pripad ze presun z I do R bol vynuteny na zaklade zacyklenia z S do I (S=400m,I=9 a I pomaly taha z S aj ked by nemalo)
        //je to kompenzacia ked pri vynuteni ukoncenia zacyklenia I skocia pod nulu
        if (LoopPushToRD === 2) {
            return Math.round(D + deltaParameter * I) + 10 + infectiousUnderZero;
        }

        if (gammaParameter === deltaParameter) {
        }
        return newDeceased;
    }
    //(tak ako vyssie len neskocia I pod nulu) pre pripad ze presun z I do D bol vynuteny na zaklade zacyklenia z S do I
    //pre pripad zacyklenia 9,9,9 ale aj  8,9,8 / 9,8,9
    if (LoopPushToRD === 1) {
        return Math.round(D + deltaParameter * I) + 10;
    }

    if (infectiousBiggerThanPopulation === 1) {
        return Math.round(deltaParameter * N);
    }

    if (infectiousPushToRD === 0) {
        if ((Math.round(gammaParameter * I) + Math.round(deltaParameter * I)) === 0) {
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

    return Math.round(D + deltaParameter * I);
}
