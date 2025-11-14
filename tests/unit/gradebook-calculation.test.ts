import { calculateFinalGrade } from "@/components/views/gradebook-grid";

describe("calculateFinalGrade", () => {
  it("applies weighted formula", () => {
    const result = calculateFinalGrade({
      id: "s1",
      name: "Test Student",
      assignment: 90,
      project: 80,
      assessment: 70,
      aiInsight: "",
    });

    // 90*.4 + 80*.3 + 70*.3 = 81
    expect(result).toBe(81);
  });
});
