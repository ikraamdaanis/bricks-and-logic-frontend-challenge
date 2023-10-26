import { render, screen } from "@testing-library/react";
import { QueryProvider } from "components/providers/QueryProvider";
import { CharactersContainer } from "features/characters/components/CharactersContainer";
import { useFetchCharacters } from "features/characters/hooks/useFetchCharacters";
import { mockCharacter } from "features/characters/mocks/mockCharacter";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {};
  },
  useSearchParams() {
    return {
      get: () => {}
    };
  },
  usePathname() {
    return "";
  }
}));

jest.mock("hooks/useDebounce", () => ({
  useDebounce() {
    return {};
  }
}));

jest.mock("features/characters/hooks/useFetchCharacters");
const useFetchCharactersMock = useFetchCharacters as jest.MockedFunction<
  typeof useFetchCharacters
>;

describe("CharactersContainer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the loading cards when loading", async () => {
    useFetchCharactersMock.mockImplementation(
      () =>
        ({
          data: undefined,
          isLoading: true,
          isSuccess: false,
          isFetching: true
        }) as ReturnType<typeof useFetchCharacters>
    );

    render(
      <QueryProvider>
        <CharactersContainer />
      </QueryProvider>
    );

    const loader = screen.getAllByTestId("character-card-loader");

    loader.forEach(loader => {
      expect(loader).toBeInTheDocument();
    });
  });

  it("should render the error is there is one", async () => {
    useFetchCharactersMock.mockImplementation(
      () =>
        ({
          data: undefined,
          isLoading: false,
          isSuccess: false,
          isFetching: false,
          isError: true
        }) as ReturnType<typeof useFetchCharacters>
    );

    render(
      <QueryProvider>
        <CharactersContainer />
      </QueryProvider>
    );

    const error = screen.getByText("No more results");

    expect(error).toBeInTheDocument();
  });

  it("should render loaded character", () => {
    useFetchCharactersMock.mockImplementation(
      () =>
        ({
          data: {
            pageParams: [1],
            pages: [
              {
                results: [mockCharacter]
              }
            ]
          },
          isLoading: false,
          isSuccess: true,
          isFetching: false
        }) as ReturnType<typeof useFetchCharacters>
    );

    render(
      <QueryProvider>
        <CharactersContainer />
      </QueryProvider>
    );

    const statusBadge = screen.queryByText("Dead - Human");
    const name = screen.getByText(mockCharacter.name);
    const lastLocation = screen.getByText(mockCharacter.location.name);
    const origin = screen.getByText(mockCharacter.origin.name);

    expect(statusBadge).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(lastLocation).toBeInTheDocument();
    expect(origin).toBeInTheDocument();
  });
});
