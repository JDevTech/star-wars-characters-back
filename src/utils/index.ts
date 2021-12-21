import { Gender, Character, Specie } from "./@types";

type QueryParams = { page?: string };
type URLType = string | null | undefined;
type SpeciesType = string | null | undefined;

interface IParsedCharacter {
  id?: URLType;
  name: string;
  mass: string;
  height: string;
  gender: Gender;
  hair_color: string;
  skin_color: string;
  birth_year: string;
  species?: SpeciesType[];
}

interface IParsedSpecie {
  name: string;
  language: string;
  eye_colors: string;
  skin_colors: string;
  designation: string;
  hair_colors: string;
  average_height: string;
  classification: string;
  average_lifespan: string;
}

const getMainCharacterProperties = (character: Character): IParsedCharacter => {
  const {
    name,
    mass,
    height,
    gender,
    hair_color,
    skin_color,
    birth_year,
  }: IParsedCharacter = character;
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

const getMainSpecieProperties = (specie: Specie): IParsedSpecie => {
  const {
    name,
    language,
    eye_colors,
    skin_colors,
    designation,
    hair_colors,
    average_height,
    classification,
    average_lifespan,
  }: IParsedSpecie = specie;
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

const queriesToObject = (queriesArray: string[]): QueryParams => {
  let keyValues: string[][] = queriesArray.map((query) => query.split("="));
  let queries: QueryParams = keyValues.reduce<QueryParams>((a, v) => {
    let key = v[0];
    let value = v[1];
    return { ...a, [key]: value };
  }, {});
  return queries;
};

const getQueryParamsFromURL = (url: URLType): QueryParams | null => {
  const splittedURL = url?.split("?") || [];
  const [fullURL, queryParams] = splittedURL;
  const splittedQueries = queryParams && queryParams.split("&");
  const queriesObject = splittedQueries && queriesToObject(splittedQueries);
  return queriesObject || null;
};

const getIdFromURLParams = (url: URLType): URLType => {
  const splittedURL = url?.split("/").filter((s) => s) || [];
  const [protocol, domain, baseURL, prefix, params] = splittedURL;
  return params || null;
};

const mapCharacter = (character: Character): IParsedCharacter => {
  const species = character.species.map((specie) => getIdFromURLParams(specie));
  const props = getMainCharacterProperties(character);
  return { ...props, species };
};

const mapCharacters = (characters: Character[]): IParsedCharacter[] => {
  const mappedCharacters = characters.map<IParsedCharacter>((character) => {
    const characterId = getIdFromURLParams(character.url);
    const props = getMainCharacterProperties(character);
    return { ...props, id: characterId };
  });

  return mappedCharacters;
};

const mapSpecie = (specie: Specie): IParsedSpecie => {
  return getMainSpecieProperties(specie);
};

export { mapCharacters, getQueryParamsFromURL, mapCharacter, mapSpecie };
