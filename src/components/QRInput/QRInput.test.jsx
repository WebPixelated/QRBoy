import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import QRInput from "./QRInput";
import userEvent from "@testing-library/user-event";

describe("QRInput", () => {
  it("should render correctly", () => {
    const setQuery = vi.fn();
    render(<QRInput query="" setQuery={setQuery} />);

    const header = screen.getByText("QRBoy: QR-Code Generator");
    const textarea = screen.getByPlaceholderText("Enter text here...");

    expect(header).toBeInTheDocument();
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("");
  });

  it("should the query value on user input", () => {
    const setQuery = vi.fn();
    render(<QRInput query="" setQuery={setQuery} />);

    const textarea = screen.getByPlaceholderText("Enter text here...");
    fireEvent.change(textarea, { target: { value: "Hello world!" } });

    expect(setQuery).toHaveBeenCalledWith("Hello world!");
  });

  it("should insert 2 whitespaces on tab key down in textarea", async () => {
    const user = userEvent.setup();
    const setQuery = vi.fn();
    const initialQuery = "first";
    render(<QRInput query={initialQuery} setQuery={setQuery} />);

    // Get textarea, focus and place cursor at the end
    const textarea = screen.getByPlaceholderText("Enter text here...");
    textarea.focus();
    textarea.setSelectionRange(initialQuery.length, initialQuery.length);

    // Use tab for whitespace insert
    await user.keyboard("{Tab}");

    expect(setQuery).toHaveBeenCalled("first  ");
    expect(textarea).toHaveFocus();
  });

  it("should display the initial query value passed as a prop", () => {
    const setQuery = vi.fn();
    const initialText = "Initial Value";
    render(<QRInput query={initialText} setQuery={setQuery} />);

    const textarea = screen.getByPlaceholderText("Enter text here...");
    expect(textarea).toHaveValue(initialText);
  });
});
