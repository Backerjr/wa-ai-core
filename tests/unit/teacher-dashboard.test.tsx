import { render, screen } from "@testing-library/react";

import { TeacherDashboard } from "@/components/views/teacher-dashboard";

describe("TeacherDashboard", () => {
  it("shows quick actions", () => {
    render(<TeacherDashboard />);
    expect(screen.getByText(/Quick Actions/i)).toBeInTheDocument();
    expect(screen.getByText(/Take Attendance/i)).toBeInTheDocument();
  });
});
