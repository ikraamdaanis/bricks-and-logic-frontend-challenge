"use client";

import { useFetchCharacters } from "features/characters/hooks/useFetchCharacters";
import React from "react";

export const CharactersContainer = () => {
  const { data } = useFetchCharacters();

  console.log(data);

  return (
    <div>
      Characters
      <ul>
        {data?.results.map(character => {
          return <li key={character.id}>{character.name}</li>;
        })}
      </ul>
    </div>
  );
};
