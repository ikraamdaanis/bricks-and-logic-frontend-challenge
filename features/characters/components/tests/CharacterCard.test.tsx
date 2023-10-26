import { render, screen } from "@testing-library/react";
import { CharacterCard } from "features/characters/components/CharacterCard";
import { Character } from "features/characters/types";

const mockCharacter: Character = {
  gender: "Male",
  id: 12,
  location: {
    id: 5,
    name: "Anatomy Park"
  },
  name: "Alexander",
  image: "https://rickandmortyapi.com/api/character/avatar/12.jpeg",
  origin: {
    id: 1,
    name: "Earth (C-137)"
  },
  species: "Human",
  status: "Dead",
  type: ""
};

describe("CharacterCard", () => {
  it("renders correctly with the fields", () => {
    render(<CharacterCard character={mockCharacter} />);

    const statusBadge = screen.getByText("Dead - Human");
    const name = screen.getByText(mockCharacter.name);
    const lastLocation = screen.getByText(mockCharacter.location.name);
    const origin = screen.getByText(mockCharacter.origin.name);

    expect(statusBadge).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(lastLocation).toBeInTheDocument();
    expect(origin).toBeInTheDocument();
  });
});
