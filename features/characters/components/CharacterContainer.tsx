"use client";

import { Button } from "components/ui/button";
import { CharacterCard } from "features/characters/components/CharacterCard";
import { useFetchCharacter } from "features/characters/hooks/useFetchCharacter";
import { useRouter } from "next/navigation";

type Props = {
  characterId: string;
};

/**
 * Displays an individual character with more details.
 */
export const CharacterContainer = ({ characterId }: Props) => {
  const router = useRouter();

  const { data } = useFetchCharacter(characterId);

  if (!data) return null;

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center py-4">
      <Button onClick={() => router.back()} className="my-4 mr-auto">
        Go Back
      </Button>
      <CharacterCard character={data} />
    </div>
  );
};
