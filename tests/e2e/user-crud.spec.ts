import { expect, test } from "@playwright/test";

test("user CRUD flow validates input and persists through API", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "ユーザー管理" })).toBeVisible();
  await expect(page.getByRole("button", { name: /再読込/ })).toBeEnabled();

  await page.getByRole("button", { name: /登録/ }).click();
  await expect(page.getByText("名前を入力してください。")).toBeVisible();
  await expect(
    page.getByText("有効なメールアドレスを入力してください。"),
  ).toBeVisible();

  const suffix = Date.now();
  const email = `e2e-${suffix}@example.com`;
  const updatedEmail = `e2e-updated-${suffix}@example.com`;

  await page.getByLabel("名前").fill("E2E User");
  await page.getByLabel("メールアドレス").fill(email);
  await page.getByRole("button", { name: /登録/ }).click();

  await expect(page.getByText("ユーザーを登録しました。")).toBeVisible();
  await expect(page.getByText(email)).toBeVisible();

  const createdRow = page.getByRole("row").filter({ hasText: email });
  await createdRow.getByRole("button", { name: /編集/ }).click();
  await page.locator("#update-user-name").fill("E2E Updated User");
  await page.locator("#update-user-email").fill(updatedEmail);
  await page.getByRole("button", { name: /更新/ }).click();

  await expect(page.getByText("ユーザーを更新しました。")).toBeVisible();
  await expect(page.getByText(updatedEmail)).toBeVisible();

  const updatedRow = page.getByRole("row").filter({ hasText: updatedEmail });
  await updatedRow.getByRole("button", { name: /削除/ }).click();

  await expect(page.getByText("ユーザーを削除しました。")).toBeVisible();
  await expect(page.getByText(updatedEmail)).toHaveCount(0);
});
