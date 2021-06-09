import {atom} from "recoil";

/**
 * Represents global state value for game trust, which determines if player wont lose the game - after hitting value 0.
 * Default value is 100 - game starts with 100 game trust.
 */
export const GameTrustState = atom({
    key: 'GameTrustState',
    default: 100,
});
