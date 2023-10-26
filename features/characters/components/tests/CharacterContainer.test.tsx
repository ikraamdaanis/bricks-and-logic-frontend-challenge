import { render, screen } from "@testing-library/react";
import { QueryProvider } from "components/providers/QueryProvider";
import { CharacterContainer } from "features/characters/components/CharacterContainer";
import { useFetchCharacter } from "features/characters/hooks/useFetchCharacter";
import { mockCharacter } from "features/characters/mocks/mockCharacter";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {};
  }
}));

jest.mock("features/characters/hooks/useFetchCharacter");
const useFetchCharacterMock = useFetchCharacter as jest.MockedFunction<
  typeof useFetchCharacter
>;

describe("CharacterContainer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render the loader instead of the character fields when loading", async () => {
    jest.resetAllMocks();

    useFetchCharacterMock.mockImplementation(
      () =>
        ({
          data: undefined,
          isLoading: true,
          isSuccess: false
        }) as ReturnType<typeof useFetchCharacter>
    );

    render(
      <QueryProvider>
        <CharacterContainer characterId={mockCharacter.id} />
      </QueryProvider>
    );

    const loader = screen.getByTestId("character-container-loader");

    expect(loader).toBeInTheDocument();

    const characterName = screen.queryByTestId("character-name");

    expect(characterName).not.toBeInTheDocument();
  });

  it("should render the error message if there's an error", async () => {
    jest.resetAllMocks();

    useFetchCharacterMock.mockImplementation(
      () =>
        ({
          data: undefined,
          isLoading: false,
          isError: true,
          isSuccess: false
        }) as ReturnType<typeof useFetchCharacter>
    );

    render(
      <QueryProvider>
        <CharacterContainer characterId={mockCharacter.id} />
      </QueryProvider>
    );

    const loader = screen.getByText("Could not find the character.");

    expect(loader).toBeInTheDocument();

    const characterName = screen.queryByTestId("character-name");

    expect(characterName).not.toBeInTheDocument();
  });

  it("should render the character fields fields", async () => {
    jest.resetAllMocks();

    useFetchCharacterMock.mockImplementation(
      () =>
        ({
          data: mockCharacter,
          isLoading: false,
          isSuccess: true
        }) as ReturnType<typeof useFetchCharacter>
    );

    render(
      <QueryProvider>
        <CharacterContainer characterId={mockCharacter.id} />
      </QueryProvider>
    );

    const name = screen.getByText(mockCharacter.name);
    const status = screen.getByText(mockCharacter.status);
    const species = screen.getByText(mockCharacter.species);
    const gender = screen.getByText(mockCharacter.gender);
    const origin = screen.getByText(mockCharacter.origin.name);
    const lastLocation = screen.getByText(mockCharacter.location.name);
    const episode = screen.getByText((mockCharacter?.episode || [])[0].name);

    expect(name).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(species).toBeInTheDocument();
    expect(gender).toBeInTheDocument();
    expect(origin).toBeInTheDocument();
    expect(lastLocation).toBeInTheDocument();
    expect(episode).toBeInTheDocument();
  });
});
