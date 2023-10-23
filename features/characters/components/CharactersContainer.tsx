"use client";

import { InfiniteScroller } from "components/InfiniteScroller";
import {
  CharacterCard,
  CharacterCardLoader
} from "features/characters/components/CharacterCard";
import { useFetchCharacters } from "features/characters/hooks/useFetchCharacters";
import { CharacterResponse } from "features/characters/types";

/**
 * A container component for displaying a list of characters fetched
 * from the Rick and Morty API. Uses an infinite query so users can
 * keep scrolling and load more characters.
 */
export const CharactersContainer = () => {
  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useFetchCharacters();

  const isFetchingMore = isFetching || isFetchingNextPage;

  const rows = (data?.pages.flatMap(page => page?.results || []) ||
    []) as CharacterResponse[];

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center py-4">
      <InfiniteScroller
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage || false}
        loadingMessage={null}
        className="scroller mx-auto flex flex-1 flex-col items-center overflow-auto"
      >
        <div className="mx-auto grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,340px))]">
          {isLoading
            ? Array.from(Array(30)).map((_, i) => {
                return <CharacterCardLoader key={i} />;
              })
            : rows.map(character => {
                return (
                  <CharacterCard key={character.id} character={character} />
                );
              })}

          {isFetchingMore && (
            <>
              {Array.from(Array(30)).map((_, i) => {
                return <CharacterCardLoader key={i} />;
              })}
            </>
          )}
        </div>
      </InfiniteScroller>
    </div>
  );
};
