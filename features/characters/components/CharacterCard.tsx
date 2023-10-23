"use client";

import { Badge } from "components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Character } from "features/characters/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from "react";

type Props = {
  character: Character;
};

const statusVariants = {
  Alive: "alive",
  Dead: "dead",
  unknown: "default"
} as const;

/**
 * Displays information about a character such as the name,
 * status, species, last known location and origin.
 */
export const CharacterCard = memo(function CharacterCard({ character }: Props) {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/character/${character.id}`)}
      className="cursor-pointer"
    >
      <CardContent className="p-4 pb-0">
        <Image
          width={300}
          height={300}
          src={character.image}
          alt={character.name}
          className="mx-auto rounded-sm"
        />
      </CardContent>
      <CardHeader className="p-4 pb-0">
        <CardTitle>{character.name}</CardTitle>
        <div>
          <Badge
            variant={statusVariants[character.status] || "default"}
            className="capitalize"
          >
            {character.status} - {character.species}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pb-0">
        <p className="font-medium text-zinc-500">Last known location:</p>
        <p className="text-lg font-medium">{character.location.name}</p>
      </CardContent>
      <CardContent className="p-4">
        <p className="font-medium text-zinc-500">Originally from:</p>
        <p className="text-lg font-medium">{character.origin.name}</p>
      </CardContent>
    </Card>
  );
});
