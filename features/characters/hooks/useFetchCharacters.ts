import { useInfiniteQuery } from "@tanstack/react-query";
import { charactersQuery } from "features/characters/graphql/queries";
import {
  Characters,
  CharactersQueryArgs,
  CharactersResponse,
  FilterCharacter,
  RICK_AND_MORTY_GRAPHQL_URI
} from "features/characters/types";
import { request } from "graphql-request";

/** Fetches characters from he Rick and Morty GraphQL API. */
async function fetchCharacters(
  pageParam: number,
  filter: FilterCharacter
): Promise<Characters> {
  const responses = (await request<CharactersResponse, CharactersQueryArgs>(
    RICK_AND_MORTY_GRAPHQL_URI,
    charactersQuery,
    { page: pageParam, filter }
  )) as CharactersResponse;

  if (!responses?.characters?.info?.count) {
    throw new Error();
  }

  return responses.characters;
}

/**
 * Query hook that fetches Rick and Morty characters and/or
 * searches for them with several fields and filters.
 */
export const useFetchCharacters = (
  searchQuery: string,
  filter: FilterCharacter
) => {
  return useInfiniteQuery({
    queryKey: ["fetchCharacters", searchQuery],
    queryFn: data => fetchCharacters(data.pageParam, filter),
    initialPageParam: 1,
    getNextPageParam: data => data.info.next || null,
    getPreviousPageParam: data => data.info.prev || null,
    retry: 0
  });
};
