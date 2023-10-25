"use client";

import { Badge } from "components/ui/badge";
import { Card, CardContent, CardTitle } from "components/ui/card";
import { Character } from "features/characters/types";
import Image from "next/image";
import Link from "next/link";
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
  return (
    <Link href={`/character/${character.id}`}>
      <Card className="cursor-pointer transition hover:border-brand-500">
        <div className="relative p-4 pb-0">
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
        </div>
        <CardContent className="flex flex-col gap-4 p-4">
          <CardTitle className="line-clamp-1 leading-normal">
            {character.name}
          </CardTitle>
          <div>
            <p className="font-medium text-zinc-500">Last known location:</p>
            <p className="line-clamp-1 text-lg font-medium">
              {character.location.name}
            </p>
          </div>
          <div>
            <p className="font-medium text-zinc-500">Originally from:</p>
            <p className="line-clamp-1 text-lg font-medium">
              {character.origin.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});

/** Skeleton Loader for the Character Cards. */
export const CharacterCardLoader = () => {
  return (
    <div className="flex h-[518px] animate-pulse flex-col rounded-md bg-zinc-300">
      <div className="m-4 mb-0 h-[300px] w-[300px] animate-pulse rounded-md bg-zinc-400" />
      <div className="m-4 mb-0 h-6 w-40 animate-pulse rounded-sm bg-zinc-400"></div>
      <div className="m-4 mb-0 flex flex-col gap-2">
        <div className="h-4 w-40 animate-pulse rounded-sm bg-zinc-400"></div>
        <div className="h-6 w-40 animate-pulse rounded-sm bg-zinc-500"></div>
      </div>
      <div className="m-4 mb-0 flex flex-col gap-2">
        <div className="h-4 w-40 animate-pulse rounded-sm bg-zinc-400"></div>
        <div className="h-6 w-40 animate-pulse rounded-sm bg-zinc-500"></div>
      </div>
    </div>
  );
};
