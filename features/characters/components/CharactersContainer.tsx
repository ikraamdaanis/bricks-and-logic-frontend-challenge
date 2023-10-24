"use client";

import { InfiniteScroller } from "components/InfiniteScroller";
import { Input } from "components/ui/input";
import {
  CharacterCard,
  CharacterCardLoader
} from "features/characters/components/CharacterCard";
import { useFetchCharacters } from "features/characters/hooks/useFetchCharacters";
import { CharacterResponse } from "features/characters/types";
import { useDebounce } from "hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * A container component for displaying a list of characters fetched
 * from the Rick and Morty API. Uses an infinite query so users can
 * keep scrolling and load more characters.
 */
export const CharactersContainer = () => {
  const router = useRouter();

  const params = useSearchParams();
  const nameSearchQuery = params.get("name") || "";
  const debouncedSearchQuery = useDebounce(params.toString());

  const {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useFetchCharacters(debouncedSearchQuery);

  const isFetchingMore = isFetching || isFetchingNextPage;

  const rows = (data?.pages.flatMap(page => page?.results || []) ||
    []) as CharacterResponse[];

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center gap-4 py-4">
      <div className="w-full">
        <Input
          placeholder="Search for a Character"
          className=""
          defaultValue={nameSearchQuery}
          onChange={({ target }) => {
            if (!target.value) return router.replace("/");
            router.replace(`/?name=${target.value}`);
          }}
        />
      </div>
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
