import { RickAndMortyIcon } from "components/icons/RickAndMortyIcon";

import { CharactersContainer } from "features/characters/components/CharactersContainer";

export default function Home() {
  return (
    <main className="align-center flex min-h-screen flex-col items-center">
      <RickAndMortyIcon />
      <h1 className="text-6xl font-bold">The Rick and Morty API</h1>
      <CharactersContainer />
    </main>
  );
}
