import { render, screen } from "@testing-library/react";
import { StudentSpotlight } from "@/components/views/student-spotlight";

describe("StudentSpotlight", () => {
  it("renders the student spotlight section", () => {
    render(<StudentSpotlight />);
    expect(screen.getByText("Student Spotlight 🌟")).toBeInTheDocument();
  });
});
