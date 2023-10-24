import { useQuery } from "@tanstack/react-query";
import {
  Character,
  CharacterResponse,
  Episode
} from "features/characters/types";

// https://rickandmortyapi.com/documentation/
const CHARACTER_URL = "https://rickandmortyapi.com/api/character";
const EPISODE_URL = "https://rickandmortyapi.com/api/episode";

/** Fetches a character from he Rick and Morty API. */
async function fetchCharacter(characterId: string): Promise<CharacterResponse> {
  const responseCharacter = await fetch(`${CHARACTER_URL}/${characterId}`);

  if (responseCharacter.status !== 200) {
    throw new Error(responseCharacter.statusText);
  }

  const dataCharacter = (await responseCharacter.json()) as Character;

  const episodeNumbers = dataCharacter.episode.map(episode => {
    // "https://rickandmortyapi.com/api/episode/5" => 5
    return episode.split("https://rickandmortyapi.com/api/episode/")[1];
  });

  const responseEpisodes = await fetch(
    `${EPISODE_URL}/${episodeNumbers.join(",")}`
  );

  if (responseEpisodes.status !== 200) {
    throw new Error(responseCharacter.statusText);
  }

  let dataEpisodes = await responseEpisodes.json();

  // It's possible there may just be 1 episode which would be an object
  // so we'll put that in an array to match the response type
  if (!Array.isArray(dataEpisodes)) {
    dataEpisodes = [dataEpisodes];
  }

  return { ...dataCharacter, episodes: dataEpisodes as Episode[] };
}

/** Query hook that fetches a Rick and Morty character. */
export const useFetchCharacter = (characterId: string) => {
  return useQuery({
    queryKey: ["fetchCharacter", characterId],
    queryFn: () => fetchCharacter(characterId),
    enabled: !!characterId
  });
};
