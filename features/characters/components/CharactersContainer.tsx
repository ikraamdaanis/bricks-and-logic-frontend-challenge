"use client";

import { InfiniteScroller } from "components/InfiniteScroller";
import {
  CharacterCard,
  CharacterCardLoader
} from "features/characters/components/CharacterCard";
import { CharacterFilter } from "features/characters/components/CharacterFilter";
import { useFetchCharacters } from "features/characters/hooks/useFetchCharacters";
import { CharacterResponse } from "features/characters/types";
import { useDebounce } from "hooks/useDebounce";
import { useSearchParams } from "next/navigation";

/**
 * A container component for displaying a list of characters fetched
 * from the Rick and Morty API. Uses an infinite query so users can
 * keep scrolling and load more characters.
 */
export const CharactersContainer = () => {
  const searchParams = useSearchParams();

  const debouncedSearchQuery = useDebounce(searchParams.toString());

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError
  } = useFetchCharacters(debouncedSearchQuery);

  const isFetchingMore = isFetching || isFetchingNextPage;

  const rows = (data?.pages.flatMap(page => page?.results || []) ||
    []) as CharacterResponse[];

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center gap-4 px-4 py-4 xl:px-0">
      <CharacterFilter />
      {isError && (
        <p className="mt-4 font-semibold text-zinc-800">No more results</p>
      )}
      <InfiniteScroller
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage || false}
        loadingMessage={null}
        className="scroller mx-auto flex flex-1 flex-col items-center overflow-auto"
        isDisabled={isError}
      >
        <div className="mx-auto grid w-full grid-cols-[minmax(0,340px)] gap-4 md:grid-cols-[repeat(2,minmax(0,340px))] lg:grid-cols-[repeat(3,minmax(0,340px))]">
          {isLoading && rows.length
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
              {Array.from(Array(4)).map((_, i) => {
                return <CharacterCardLoader key={i} />;
              })}
            </>
          )}
        </div>
      </InfiniteScroller>
    </div>
  );
};
