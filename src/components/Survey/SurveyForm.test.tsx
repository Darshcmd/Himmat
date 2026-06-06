import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { act } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SurveyForm from "./SurveyForm";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("SurveyForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    push.mockReset();
    vi.mocked(useRouter).mockReturnValue({
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
      push,
      refresh: vi.fn(),
      replace: vi.fn(),
    } as ReturnType<typeof useRouter>);
  });

  it("walks through the Indian student check-in and redirects to the dashboard", async () => {
    render(<SurveyForm />);

    expect(screen.getByText("How rested do you feel after last night's sleep?")).toBeInTheDocument();

    for (let index = 0; index < 5; index += 1) {
      fireEvent.click(screen.getByRole("button", { name: "Answer 4 out of 5" }));
      act(() => {
        vi.advanceTimersByTime(200);
      });
    }

    act(() => {
      fireEvent.click(screen.getByRole("button", { name: "Answer 4 out of 5" }));
    });

    expect(screen.getByText("Check-in saved")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(950);
    });

    expect(push).toHaveBeenCalledWith("/dashboard");
  });

  it("uses accessible answer button names", () => {
    render(<SurveyForm />);

    expect(screen.getByRole("button", { name: "Answer 1 out of 5" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Answer 5 out of 5" })).toBeInTheDocument();
  });
});
