import { useInfiniteQuery } from "@tanstack/react-query";
import { CharactersResponse } from "features/characters/types";

// https://rickandmortyapi.com/documentation/
const API_URL = "https://rickandmortyapi.com/api/character/?page=1";

/** Fetches characters from he Rick and Morty API. */
async function fetchCharacters(
  pageParam: string,
  searchQuery: string
): Promise<CharactersResponse> {
  const response = await fetch(
    `${pageParam || API_URL}${searchQuery && `&${searchQuery}`}`
  );

  if (response.status !== 200) {
    throw new Error("Could not fetch any data.");
  }

  const data = (await response.json()) as CharactersResponse;

  return data;
}

/**
 * Query hook that fetches Rick and Morty characters and/or
 * searches for them with several fields and filters.
 */
export const useFetchCharacters = (searchQuery: string) => {
  return useInfiniteQuery({
    queryKey: ["fetchCharacters", searchQuery],
    queryFn: data => fetchCharacters(data.pageParam, searchQuery),
    initialPageParam: API_URL,
    getNextPageParam: data => data.info.next || null,
    getPreviousPageParam: data => data.info.prev || null,
    retry: 0
  });
};
