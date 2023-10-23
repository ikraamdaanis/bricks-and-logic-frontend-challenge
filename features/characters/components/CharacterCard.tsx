"use client";

import { Badge } from "components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { CharacterResponse } from "features/characters/types";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type Props = {
  character: CharacterResponse;
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
  return (
    <Link href={`/character/${character.id}`}>
      <Card className="hover:border-brand-500 cursor-pointer transition">
        <CardContent className="relative p-4 pb-0">
          <Image
            width={300}
            height={300}
            src={character.image}
            alt={character.name}
            className="mx-auto rounded-sm"
            priority
          />
          <div className="absolute right-6 top-6">
            <Badge
              variant={statusVariants[character.status] || "default"}
              className="capitalize"
            >
              {character.status} - {character.species}
            </Badge>
          </div>
        </CardContent>
        <CardHeader className="p-4 pb-0">
          <CardTitle>{character.name}</CardTitle>
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
    </Link>
  );
});
