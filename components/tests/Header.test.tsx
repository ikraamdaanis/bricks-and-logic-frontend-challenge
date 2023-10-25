import { render, screen } from "@testing-library/react";
import { Header } from "components/Header";

describe("Header", () => {
  it("renders correctly", () => {
    render(<Header />);

    const heading = screen.getByText("Rick and Morty");

    expect(heading).toBeInTheDocument();
  });
});
