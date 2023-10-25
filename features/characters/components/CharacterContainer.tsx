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

  const {
    data: character,
    isLoading,
    isError
  } = useFetchCharacter(characterId);

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center px-4 py-4 xl:px-0">
      <Button
        onClick={() => router.push("/")}
        className="my-0 mr-auto bg-brand2-600 hover:bg-brand2-500"
      >
        Back to Characters
      </Button>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className="mt-10 w-full rounded-md border border-rose-700 bg-rose-100 p-4">
          Could not find the character.
        </div>
      ) : (
        character && (
          <div className="w-full">
            <div className="mt-10 flex w-full flex-col items-center justify-start gap-4 md:flex-row md:items-start">
              <div className="relative h-[400px] w-full min-w-[300px] max-w-full overflow-hidden md:h-[300px] md:w-[300px]">
                <Image
                  alt="Character Image"
                  className="h-full w-full overflow-hidden rounded-md"
                  fill
                  src={character.image}
                  style={{
                    objectFit: "cover"
                  }}
                  sizes="300px"
                  priority
                />
              </div>
              <div className="flex w-full flex-col items-start">
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
                    {character.episode.map(episode => {
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
        )
      )}
    </div>
  );
};

/** Skeleton loader for the Character Container. */
const Loader = () => {
  return (
    <div className="w-full">
      <div className="mt-10 flex w-full flex-col items-center justify-start gap-4 md:flex-row md:items-start">
        <div className="relative h-[400px] w-full min-w-[300px] max-w-full animate-pulse overflow-hidden rounded-md bg-zinc-300 md:h-[300px] md:w-[300px]"></div>
        <div className="flex w-full flex-col items-start">
          <div>
            <div className="mb-2 h-9 w-[300px] animate-pulse rounded-md bg-zinc-300" />
            <p className="flex">
              <b className="inline-block w-20 font-semibold">Status: </b>
              <span className="inline-block h-5 w-[50px] animate-pulse rounded-md bg-zinc-300" />
            </p>
            <p className="flex">
              <b className="inline-block w-20 font-semibold">Species:</b>
              <span className="inline-block h-5 w-[60px] animate-pulse rounded-md bg-zinc-300" />
            </p>
            <p className="flex">
              <b className="inline-block w-20 font-semibold">Gender:</b>
              <span className="inline-block h-5 w-[50px] animate-pulse rounded-md bg-zinc-300" />
            </p>
            <p className="flex">
              <b className="inline-block w-20 font-semibold">Origin:</b>
              <span className="inline-block h-5 w-[70px] animate-pulse rounded-md bg-zinc-300" />
            </p>
            <p className="flex">
              <b className="inline-block w-20 font-semibold">Location:</b>
              <span className="inline-block h-5 w-[150px] animate-pulse rounded-md bg-zinc-300" />
            </p>
          </div>
          <h2 className="my-4 text-xl font-semibold">
            Starred in the following episodes:
          </h2>
          <div className="h-[200px] w-full animate-pulse rounded-sm bg-zinc-300" />
        </div>
      </div>
    </div>
  );
};
