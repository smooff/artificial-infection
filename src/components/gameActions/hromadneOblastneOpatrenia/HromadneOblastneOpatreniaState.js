import {atom} from "recoil";


export const HromadneOblastneOpatreniaState = atom({
    key: 'hromadneOpatrenia',
    default: {
        Europe: {
            bordersPrice:5,
            airportsPrice:5,
            seaportsPrice:5,
            borders: 0,
            airports: 0,
            seaports:0,
        },
        Asia: {
            bordersPrice:5,
            airportsPrice:5,
            seaportsPrice:5,
            borders: 0,
            airports: 0,
            seaports:0,
        },
        Africa: {
            bordersPrice:5,
            airportsPrice:5,
            seaportsPrice:5,
            borders: 0,
            airports: 0,
            seaports:0,
        },
        Americas: {
            bordersPrice:5,
            airportsPrice:5,
            seaportsPrice:5,
            borders: 0,
            airports: 0,
            seaports:0,
        },
        Oceania: {
            bordersPrice:5,
            airportsPrice:5,
            seaportsPrice:5,
            borders: 0,
            airports: 0,
            seaports:0,
        },
        Antarctic: {
            bordersPrice:5,
            airportsPrice:5,
            seaportsPrice:5,
            borders: 0,
            airports: 0,
            seaports:0,
        }
    },
});