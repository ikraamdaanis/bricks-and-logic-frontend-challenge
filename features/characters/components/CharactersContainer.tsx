"use client";

import { InfiniteScroller } from "components/InfiniteScroller";
import { CharacterCard } from "features/characters/components/CharacterCard";
import { useFetchCharacters } from "features/characters/hooks/useFetchCharacters";
import { Character } from "features/characters/types";
import { Loader2 } from "lucide-react";

/**
 * A container component for displaying a list of characters fetched
 * from the Rick and Morty API. Uses an infinite query so users can
 * keep scrolling and load more characters.
 */
export const CharactersContainer = () => {
  const { data, fetchNextPage, hasNextPage } = useFetchCharacters();

  console.log(data);

  const rows = (data?.pages.flatMap(page => page?.results || []) ||
    []) as Character[];

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center py-4">
      <InfiniteScroller
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage || false}
        loadingMessage={
          <Loader2 className="my-4 h-6 w-6 animate-spin text-zinc-500" />
        }
        className="scroller mx-auto flex flex-1 flex-col items-center overflow-auto"
      >
        <div className="mx-auto grid w-full grid-cols-[repeat(3,minmax(0,340px))] gap-4">
          {rows.map(character => {
            return <CharacterCard key={character.id} character={character} />;
          })}
        </div>
      </InfiniteScroller>
    </div>
  );
};
