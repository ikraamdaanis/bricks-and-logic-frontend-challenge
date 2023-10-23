import { useQuery } from "@tanstack/react-query";
import { Character } from "features/characters/types";

// https://rickandmortyapi.com/documentation/
const API_URL = "https://rickandmortyapi.com/api/character";

/** Fetches a character from he Rick and Morty API. */
async function fetchCharacter(characterId: string) {
  const response = await fetch(`${API_URL}/${characterId}`);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as Character;

  return data;
}

/** Query hook that fetches a Rick and Morty character. */
export const useFetchCharacter = (characterId: string) => {
  return useQuery({
    queryKey: ["fetchCharacter", characterId],
    queryFn: () => fetchCharacter(characterId),
    enabled: !!characterId
  });
};
