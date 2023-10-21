import { RickAndMortyIcon } from "components/icons/RickAndMortyIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "components/ui/card";
import { CharactersContainer } from "features/characters/components/CharactersContainer";

export default function Home() {
  return (
    <main className="align-center flex min-h-screen flex-col items-center">
      <RickAndMortyIcon />
      <h1 className="text-6xl font-bold">The Rick and Morty API</h1>
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <CharactersContainer />
    </main>
  );
}
