import { CharacterContainer } from "features/characters/components/CharacterContainer";

type Props = {
  params: { characterId: string };
};

export default function CharacterPage({ params: { characterId } }: Props) {
  return (
    <main className="align-center flex flex-col items-center">
      <CharacterContainer characterId={characterId} />
    </main>
  );
}
