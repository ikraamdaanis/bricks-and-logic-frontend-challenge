import { useQuery } from "@tanstack/react-query";
import { characterQuery } from "features/characters/graphql/queries";
import {
  Character,
  CharacterQueryArgs,
  CharacterResponse,
  RICK_AND_MORTY_GRAPHQL_URI
} from "features/characters/types";
import { request } from "graphql-request";

/** Fetches a character from he Rick and Morty GraphQL API. */
async function fetchCharacter(characterId: string): Promise<Character> {
  const response = await request<CharacterResponse, CharacterQueryArgs>(
    RICK_AND_MORTY_GRAPHQL_URI,
    characterQuery,
    {
      characterId
    }
  );

  if (!response.character) throw new Error();

  return response.character;
}

/** Query hook that fetches a Rick and Morty character. */
export const useFetchCharacter = (characterId: string) => {
  return useQuery({
    queryKey: ["fetchCharacter", characterId],
    queryFn: () => fetchCharacter(characterId),
    enabled: !!characterId,
    retry: 0
  });
};
