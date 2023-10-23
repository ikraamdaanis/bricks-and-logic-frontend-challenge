import { RickAndMortyIcon } from "components/icons/RickAndMortyIcon";
import Link from "next/link";

/** Header that displays the logo/title and links to the homepage. */
export const Header = () => {
  return (
    <header className="border-b-brand-500 sticky top-0 z-10 h-20 w-full border-b bg-white/70 backdrop-blur">
      <nav className="mx-auto flex h-20 w-full max-w-screen-lg items-center px-4 xl:px-0">
        <Link href="/" className="flex items-center gap-2">
          <RickAndMortyIcon className="fill-brand-600 h-6 w-6 lg:h-8 lg:w-8" />
          <h1 className="text-brand-600 text-3xl font-bold lg:text-4xl">
            Rick and Morty
          </h1>
        </Link>
      </nav>
    </header>
  );
};
