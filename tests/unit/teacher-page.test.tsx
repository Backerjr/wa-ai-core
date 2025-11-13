
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TeacherPage from "@/app/(dashboard)/dashboard/teacher/page";

// Mock the TeacherDashboard component
vi.mock("@/components/views/teacher-dashboard", () => ({
  TeacherDashboard: () => <div data-testid="teacher-dashboard">Mock Teacher Dashboard</div>,
}));

describe("TeacherPage", () => {
  it("should render the TeacherDashboard component", () => {
    render(<TeacherPage />);

    // Check if the mocked TeacherDashboard component is rendered
    const teacherDashboard = screen.getByTestId("teacher-dashboard");
    expect(teacherDashboard).toBeInTheDocument();
    expect(teacherDashboard).toHaveTextContent("Mock Teacher Dashboard");
  });
});
