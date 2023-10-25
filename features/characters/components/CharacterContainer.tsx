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
 * Displays an individual character with more details such as
 * name, status, species, gender, origin, location and a list
 * of episodes the character has appeared in.
 */
export const CharacterContainer = ({ characterId }: Props) => {
  const router = useRouter();

  const { data: character } = useFetchCharacter(characterId);

  if (!character) return null;

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center px-4 py-4 xl:px-0">
      <Button
        onClick={() => router.back()}
        className="my-4 mr-auto bg-brand2-600 hover:bg-brand2-500"
      >
        Back to Characters
      </Button>
      <div className="w-full">
        <div className="mt-10 flex w-full flex-col items-center justify-start gap-4 lg:flex-row lg:items-start">
          <div className="h-[300px] w-[300px] min-w-[300px]">
            <Image
              alt="Character Image"
              className="rounded-md"
              height="300"
              width="300"
              src={character.image}
              priority
            />
          </div>
          <div className="flex w-full flex-col items-center lg:items-start">
            <div>
              <h2 className="mb-2 text-3xl font-bold">{character.name}</h2>
              <p>
                <b className="inline-block w-20 font-semibold">Status:</b>
                {character.status}
              </p>
              <p>
                <b className="inline-block w-20 font-semibold">Species:</b>
                {character.species}
              </p>
              <p>
                <b className="inline-block w-20 font-semibold">Gender:</b>
                {character.gender}
              </p>
              <p>
                <b className="inline-block w-20 font-semibold">Origin:</b>
                {character.origin.name}
              </p>
              <p>
                <b className="inline-block w-20 font-semibold">Location:</b>
                {character.location.name}
              </p>
            </div>
            <h2 className="my-4 text-xl font-semibold">
              Starred in the following episodes:
            </h2>
            <Table className="border border-zinc-200">
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
                      <TableCell className="font-medium">
                        {episode.episode}
                      </TableCell>
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
        </div>
      </div>
    </div>
  );
};
