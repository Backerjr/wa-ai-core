import { test, expect } from "@playwright/test";

test("teacher dashboard happy path", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Good morning, Wiktoria", { exact: false })).toBeVisible();

  await page.getByRole("button", { name: /AI Command/i }).click();
  await page.getByText("/ask", { exact: false }).first().click();
  await expect(page.getByText(/AI Command executed/i)).toBeVisible();

  await page
    .getByRole("link", { name: /Take Attendance/i })
    .first()
    .click();
  await expect(page).toHaveURL(/attendance/);

  const tardyChip = page
    .locator('[data-student-id="s1"]')
    .getByRole("radio", { name: "Absent" });
  await tardyChip.click();

  await expect(page.getByText(/Liam Chen marked Absent/i)).toBeVisible();
});
