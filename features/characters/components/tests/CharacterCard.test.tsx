import { render, screen } from "@testing-library/react";
import { CharacterCard } from "features/characters/components/CharacterCard";
import { mockCharacter } from "features/characters/mocks/mockCharacter";

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
