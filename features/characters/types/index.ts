/** https://rickandmortyapi.com/documentation/ */
export const RICK_AND_MORTY_GRAPHQL_URI = "https://rickandmortyapi.com/graphql";

export type CharacterResponse = {
  character: Character;
};

export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode?: Episode[];
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

export type CharactersResponse = {
  characters: Characters;
};

export type CharacterQueryArgs = {
  characterId: string;
};

export type Characters = {
  info: {
    count: number | null;
    pages: number | null;
    next: number | null;
    prev: number | null;
  };
  results: Character[];
};

export type CharactersQueryArgs = {
  page: number;
  filter: FilterCharacter;
};

export type FilterCharacter = {
  gender?: string;
  name?: string;
  species?: string;
  status?: string;
  type?: string;
};

export type Location = {
  id: number;
  name: string;
};
