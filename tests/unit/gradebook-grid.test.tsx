import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import { GradebookGrid } from "@/components/views/gradebook-grid";

const mockRows = [
  {
    id: "s1",
    name: "Liam",
    assignment: 90,
    project: 90,
    assessment: 90,
    aiInsight: "Consistent"
  }
];

describe("GradebookGrid", () => {
  it("updates final grade when a cell changes", async () => {
    render(
      <GradebookGrid
        classNameLabel="Test"
        classId="s1-class"
        rows={mockRows}
        classOptions={[{ id: "s1-class", title: "Test" }]}
      />
    );

    const assignmentInput = screen.getByLabelText(/Liam assignment/i);
    await userEvent.clear(assignmentInput);
    await userEvent.type(assignmentInput, "80");

    expect(screen.getByText(/86%/i)).toBeInTheDocument();
  });
});
