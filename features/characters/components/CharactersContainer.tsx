"use client";

import { Button } from "components/ui/button";
import { CharacterCard } from "features/characters/components/CharacterCard";
import { useFetchCharacters } from "features/characters/hooks/useFetchCharacters";
import { Character } from "features/characters/types";

export const CharactersContainer = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    fetchPreviousPage,
    hasPreviousPage
  } = useFetchCharacters();

  console.log(data, hasPreviousPage);

  const rows = (data?.pages.flatMap(page => page?.results || []) ||
    []) as Character[];

  return (
    <div className="mx-auto w-full max-w-screen-xl">
      Characters
      <div className="grid grid-cols-3 gap-4">
        {rows.map(character => {
          return <CharacterCard key={character.id} character={character} />;
        })}
      </div>
      <Button
        className="text-lg"
        onClick={() => fetchPreviousPage()}
        disabled={!hasPreviousPage}
      >
        Prev
      </Button>
      <Button
        className="text-lg"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
      >
        Next
      </Button>
    </div>
  );
};
