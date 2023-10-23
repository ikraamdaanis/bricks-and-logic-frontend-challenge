import { RickAndMortyIcon } from "components/icons/RickAndMortyIcon";
import Link from "next/link";

/** Header that displays the logo/title and links to the homepage. */
export const Header = () => {
  return (
    <header className="sticky top-0 h-20 w-full bg-black">
      <nav className="mx-auto flex h-20 w-full max-w-screen-lg items-center px-4 xl:px-0">
        <Link href="/" className="flex items-center gap-2">
          <RickAndMortyIcon className="h-6 w-6 fill-white lg:h-8 lg:w-8" />
          <h1 className="text-3xl font-bold text-white lg:text-4xl">
            Rick and Morty
          </h1>
        </Link>
      </nav>
    </header>
  );
};
