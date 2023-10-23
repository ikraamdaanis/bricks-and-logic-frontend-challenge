import { RickAndMortyIcon } from "components/icons/RickAndMortyIcon";
import { CharacterContainer } from "features/characters/components/CharacterContainer";

type Props = {
  params: { characterId: string };
};

export default function CharacterPage({ params: { characterId } }: Props) {
  return (
    <main className="align-center flex min-h-screen flex-col items-center">
      <RickAndMortyIcon />
      <h1 className="text-6xl font-bold">The Rick and Morty API</h1>
      <CharacterContainer characterId={characterId} />
    </main>
  );
}
