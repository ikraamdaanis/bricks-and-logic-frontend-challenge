"use client";

import { Button } from "components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "components/ui/table";
import { useFetchCharacter } from "features/characters/hooks/useFetchCharacter";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  characterId: string;
};

/**
 * Displays an individual character with more details.
 */
export const CharacterContainer = ({ characterId }: Props) => {
  const router = useRouter();

  const { data: character } = useFetchCharacter(characterId);

  if (!character) return null;

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center py-4">
      <Button
        onClick={() => router.back()}
        className="bg-brand2-600 hover:bg-brand2-500 my-4 mr-auto"
      >
        Back to Characters
      </Button>
      <div className="">
        <div className="mt-10 flex flex-col items-center justify-center">
          <div className="h-64 w-64">
            <Image
              alt="Character Image"
              className="rounded-full"
              height="256"
              src={character.image}
              style={{
                aspectRatio: "256/256",
                objectFit: "cover"
              }}
              priority
              width="256"
            />
          </div>
          <h2 className="mt-6 text-3xl font-bold">{character.name}</h2>
          <p className="mt-2 text-xl">Species:{character.species}</p>
          <p className="mt-2 text-xl">Status: {character.status}</p>
          <p className="mt-2 text-xl">Origin: {character.origin.name}</p>
          <p className="mt-2 text-xl">Gender: {character.gender}</p>
          <p className="mt-2 text-xl">Occupation: {character.type}</p>
        </div>
      </div>
      <h2 className="my-4 text-2xl font-semibold">
        Starred in the following episodes:
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Episode</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Air Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {character.episodes.map(episode => {
            return (
              <TableRow key={episode.id}>
                <TableCell className="font-medium">{episode.episode}</TableCell>
                <TableCell>{episode.name}</TableCell>
                <TableCell>{episode.air_date}</TableCell>
                <TableCell className="text-right">
                  {episode.characters.length}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
