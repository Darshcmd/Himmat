import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PanicMode } from "./PanicMode";

describe("PanicMode", () => {
  it("focuses the close action and closes on Escape", () => {
    const onClose = vi.fn();
    render(<PanicMode open onClose={onClose} />);

    expect(screen.getByRole("dialog", { name: "60-second reset" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "I am ready for one small next step" })).toHaveFocus();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders nothing when closed", () => {
    render(<PanicMode open={false} onClose={vi.fn()} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
