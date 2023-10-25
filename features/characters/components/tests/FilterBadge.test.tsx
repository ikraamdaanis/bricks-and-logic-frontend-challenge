import { render, screen } from "@testing-library/react";
import { FilterBadge } from "features/characters/components/FilterBadge";
import { userEvent } from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {};
  },
  usePathname() {
    return "";
  }
}));

jest.mock("hooks/useCreateQueryString", () => ({
  useCreateQueryString() {
    return () => null;
  }
}));

describe("Header", () => {
  it("renders correctly", async () => {
    render(<FilterBadge filter="test" label="Test" value="test-value" />);

    const component = screen.getByText("Test - test-value");

    expect(component).toBeInTheDocument();
  });

  it("renders the tooltip when hovered over", async () => {
    render(<FilterBadge filter="test" label="Test" value="test-value" />);

    const component = await screen.findByText("Test - test-value");

    await userEvent.hover(component);

    const tooltip = await screen.findAllByText("Click to remove this filter");

    expect(tooltip[0]).toBeInTheDocument();
  });

  it("doesn't render if there is no value", () => {
    const { container } = render(
      <FilterBadge filter="test" label="Test" value="" />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
