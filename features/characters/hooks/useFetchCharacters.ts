import { useInfiniteQuery } from "@tanstack/react-query";
import { CharactersResponse } from "features/characters/types";

// https://rickandmortyapi.com/documentation/
const API_URL = "https://rickandmortyapi.com/api/character/?page=1";

/** Fetches characters from he Rick and Morty API. */
async function fetchCharacters(pageParam: string) {
  const response = await fetch(pageParam || API_URL);

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as CharactersResponse;

  return data;
}

/** Query hook that fetches Rick and Morty characters. */
export const useFetchCharacters = () => {
  return useInfiniteQuery({
    queryKey: ["fetchCharacters"],
    queryFn: data => fetchCharacters(data.pageParam),
    initialPageParam: API_URL,
    getNextPageParam: data => data.info.next || null,
    getPreviousPageParam: data => data.info.prev || null
  });
};
