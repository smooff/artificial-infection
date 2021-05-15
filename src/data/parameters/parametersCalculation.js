//prepocitanie sily parametrov pre jednotlive opatrenia

const betaMax = 0.941;
const betaMin = 0.0504;
const betaDiff = betaMax - betaMin;
export const betaPerMeasurementStrength = Math.round((betaDiff / 5.24) * 10000) / 10000;

const deltaMax = 0.0959;
const deltaMin = 0.0099;
const deltaDiff = deltaMax - deltaMin;
export const deltaPerMeasurementStrength = Math.round((deltaDiff / 2.78) * 10000) / 10000;

