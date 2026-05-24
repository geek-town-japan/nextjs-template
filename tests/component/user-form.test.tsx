import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UserApiError } from "@/components/users/user-api";
import { UserForm } from "@/components/users/user-form";

describe("UserForm", () => {
  it("shows client validation errors before submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<UserForm mode="create" onSubmit={onSubmit} />);
    await user.click(screen.getByRole("button", { name: /登録/ }));

    expect(await screen.findByText("名前を入力してください。")).toBeVisible();
    expect(
      screen.getByText("有効なメールアドレスを入力してください。"),
    ).toBeVisible();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits normalized values", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<UserForm mode="create" onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText("名前"), "  Taro Yamada  ");
    await user.type(
      screen.getByLabelText("メールアドレス"),
      "  TARO@EXAMPLE.COM  ",
    );
    await user.click(screen.getByRole("button", { name: /登録/ }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Taro Yamada",
      email: "taro@example.com",
    });
  });

  it("shows API field errors", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(async () => {
      throw new UserApiError("Validation failed", 409, {
        fieldErrors: {
          email: ["このメールアドレスはすでに登録されています。"],
        },
      });
    });

    render(
      <UserForm
        mode="update"
        defaultValues={{ name: "Taro", email: "taro@example.com" }}
        onSubmit={onSubmit}
      />,
    );
    await user.click(screen.getByRole("button", { name: /更新/ }));

    const errors = await screen.findAllByText(
      "このメールアドレスはすでに登録されています。",
    );
    expect(errors[0]).toBeVisible();
  });
});
