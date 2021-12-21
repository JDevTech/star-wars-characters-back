"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSpecie = exports.mapCharacter = exports.getQueryParamsFromURL = exports.mapCharacters = void 0;
const getMainCharacterProperties = (character) => {
    const { name, mass, height, gender, hair_color, skin_color, birth_year, } = character;
    return {
        name,
        mass,
        height,
        gender,
        birth_year,
        hair_color,
        skin_color,
    };
};
const getMainSpecieProperties = (specie) => {
    const { name, language, eye_colors, skin_colors, designation, hair_colors, average_height, classification, average_lifespan, } = specie;
    return {
        name,
        language,
        eye_colors,
        skin_colors,
        designation,
        hair_colors,
        average_height,
        classification,
        average_lifespan,
    };
};
const queriesToObject = (queriesArray) => {
    let keyValues = queriesArray.map((query) => query.split("="));
    let queries = keyValues.reduce((a, v) => {
        let key = v[0];
        let value = v[1];
        return Object.assign(Object.assign({}, a), { [key]: value });
    }, {});
    return queries;
};
const getQueryParamsFromURL = (url) => {
    const splittedURL = (url === null || url === void 0 ? void 0 : url.split("?")) || [];
    const [fullURL, queryParams] = splittedURL;
    const splittedQueries = queryParams && queryParams.split("&");
    const queriesObject = splittedQueries && queriesToObject(splittedQueries);
    return queriesObject || null;
};
exports.getQueryParamsFromURL = getQueryParamsFromURL;
const getIdFromURLParams = (url) => {
    const splittedURL = (url === null || url === void 0 ? void 0 : url.split("/").filter((s) => s)) || [];
    const [protocol, domain, baseURL, prefix, params] = splittedURL;
    return params || null;
};
const mapCharacter = (character) => {
    const species = character.species.map((specie) => getIdFromURLParams(specie));
    const props = getMainCharacterProperties(character);
    return Object.assign(Object.assign({}, props), { species });
};
exports.mapCharacter = mapCharacter;
const mapCharacters = (characters) => {
    const mappedCharacters = characters.map((character) => {
        const characterId = getIdFromURLParams(character.url);
        const props = getMainCharacterProperties(character);
        return Object.assign(Object.assign({}, props), { id: characterId });
    });
    return mappedCharacters;
};
exports.mapCharacters = mapCharacters;
const mapSpecie = (specie) => {
    return getMainSpecieProperties(specie);
};
exports.mapSpecie = mapSpecie;
