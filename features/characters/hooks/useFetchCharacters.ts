import { useQuery } from "@tanstack/react-query";
import { RickAndMortyResponse } from "features/characters/types";

/** Fetches characters from he Rick and Morty API. */
async function fetchCharacters() {
  const response = await fetch("https://rickandmortyapi.com/api/character");

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as RickAndMortyResponse;

  return data;
}

/** Query hook that fetches Rick and Morty characters. */
export const useFetchCharacters = () => {
  return useQuery({
    queryKey: ["fetchCharacters"],
    queryFn: () => fetchCharacters()
  });
};
