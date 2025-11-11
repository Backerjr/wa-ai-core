import { fireEvent, render, screen } from "@testing-library/react";

import { StatusChip } from "@/components/core/status-chip";

describe("StatusChip", () => {
  it("invokes onSelect on click", () => {
    const handleSelect = vi.fn();
    render(<StatusChip value="Present" active={false} onSelect={handleSelect} />);

    fireEvent.click(screen.getByRole("radio", { name: /present/i }));
    expect(handleSelect).toHaveBeenCalledWith("Present");
  });

  it("handles keyboard activation", () => {
    const handleSelect = vi.fn();
    render(<StatusChip value="Tardy" active={false} onSelect={handleSelect} />);

    fireEvent.keyDown(screen.getByRole("radio", { name: /tardy/i }), { key: "Enter" });
    expect(handleSelect).toHaveBeenCalledWith("Tardy");
  });
});
