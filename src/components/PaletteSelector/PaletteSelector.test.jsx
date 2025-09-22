import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PaletteSelector from "./PaletteSelector";
import { PaletteContext } from "../../context/PaletteContext";
import { palettes } from "../../palettes";
import userEvent from "@testing-library/user-event";
import classes from "./PaletteSelector.module.css";

const renderWithMockContext = (mockContextValue) => {
  return render(
    <PaletteContext.Provider value={mockContextValue}>
      <PaletteSelector />
    </PaletteContext.Provider>
  );
};

describe("PaletteSelector", () => {
  it("should render palettes button and content should be hidden", () => {
    const mockContext = {
      currentPalette: palettes[0],
      changePalette: vi.fn(),
    };
    renderWithMockContext(mockContext);

    const toggleButton = screen.getByRole("button", { name: /palettes/i });
    expect(toggleButton).toBeInTheDocument();

    const paletteDefault = screen.queryByText(/default/i);
    expect(paletteDefault).not.toBeInTheDocument();
  });

  it("should open the palette menu when toggle button is clicked", async () => {
    const user = userEvent.setup();
    const mockContext = {
      currentPalette: palettes[0],
      changePalette: vi.fn(),
    };
    renderWithMockContext(mockContext);

    const toggleButton = screen.getByRole("button", { name: /palettes/i });

    await user.click(toggleButton);

    const paletteDefault = screen.getByText("Default");
    const palette2bit = screen.getByText("2Bit Demiboy");

    expect(paletteDefault).toBeInTheDocument();
    expect(palette2bit).toBeInTheDocument();
  });

  it("should call changePalette with the correct id when a palette is selected", async () => {
    const user = userEvent.setup();
    const mockChangePalette = vi.fn();
    const mockContext = {
      currentPalette: palettes[0],
      changePalette: mockChangePalette,
    };
    renderWithMockContext(mockContext);

    const toggleButton = screen.getByRole("button", { name: /palettes/i });
    await user.click(toggleButton);

    const blkAquaButton = screen.getByRole("button", { name: /blk aqu4/i });
    await user.click(blkAquaButton);

    expect(mockChangePalette).toHaveBeenCalledTimes(1);
    expect(mockChangePalette).toHaveBeenCalledWith("blk_aqu4");
  });

  it("should close the menu when clicking outside the component", async () => {
    const user = userEvent.setup();
    const mockContext = {
      currentPalette: palettes[0],
      changePalette: vi.fn(),
    };

    // Render outside area
    render(
      <div>
        <div data-testid="outside-element">Other part of page</div>
        <PaletteContext.Provider value={mockContext}>
          <PaletteSelector />
        </PaletteContext.Provider>
      </div>
    );

    const toggleButton = screen.getByRole("button", { name: /palettes/i });
    await user.click(toggleButton);

    // Click on outside element
    const outsideElement = screen.getByTestId("outside-element");
    await user.click(outsideElement);

    const paletteDefault = screen.queryByText("Default");
    expect(paletteDefault).not.toBeInTheDocument();
  });

  it("should close the menu when clicking on toggle button again", async () => {
    const user = userEvent.setup();
    const mockContext = {
      currentPalette: palettes[0],
      changePalette: vi.fn(),
    };
    renderWithMockContext(mockContext);

    // First click
    const toggleButton = screen.getByRole("button", { name: /palettes/i });
    await user.click(toggleButton);

    const paletteDefault = screen.getByText("Default");
    expect(paletteDefault).toBeInTheDocument();

    // Second click
    await user.click(toggleButton);

    const paletteDefaultAfterClick = screen.queryByText("Default");
    expect(paletteDefaultAfterClick).not.toBeInTheDocument();
  });

  it("should display paletteContentButtonActive class on currentPalette", async () => {
    const user = userEvent.setup();
    const activePalette = palettes[1];
    const mockContext = {
      currentPalette: activePalette,
      changePalette: vi.fn(),
    };
    renderWithMockContext(mockContext);

    const toggleButton = screen.getByRole("button", { name: /palettes/i });
    await user.click(toggleButton);

    const activeButton = screen.getByText(activePalette.name).closest("button");

    expect(activeButton).toHaveClass(classes.paletteContentButtonActive);
  });

  it("should correctly display colors, author and name of palette", async () => {
    const activePalette = palettes[4];
    const user = userEvent.setup();
    const mockContext = {
      currentPalette: activePalette,
      changePalette: vi.fn(),
    };
    renderWithMockContext(mockContext);

    const toggleButton = screen.getByRole("button", { name: /palettes/i });
    await user.click(toggleButton);

    const name = screen.getByText(activePalette.name);
    const author = screen.getByText(activePalette.author);

    expect(name).toBeInTheDocument();
    expect(author).toBeInTheDocument();

    const paletteButton = name.closest("button");
    const colorDivs = paletteButton.querySelectorAll(
      `div[class*="${classes.paletteColor}"]`
    );

    expect(colorDivs).toHaveLength(Object.keys(activePalette.colors).length);
    colorDivs.forEach((div, index) => {
      const expectedColor = Object.values(activePalette.colors)[index];
      expect(div).toHaveStyle(`background: ${expectedColor}`);
    });
  });
});
