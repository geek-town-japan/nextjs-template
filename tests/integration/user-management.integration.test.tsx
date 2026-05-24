import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { Providers } from "@/app/providers";
import { UserManagement } from "@/components/users/user-management";
import { useUserUiStore } from "@/components/users/user-store";

type MockUser = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

const initialUsers: MockUser[] = [
  {
    id: 1,
    name: "Taro Yamada",
    email: "taro@example.com",
    createdAt: "2026-05-24T07:28:38.988Z",
    updatedAt: "2026-05-24T07:28:38.988Z",
  },
];

function jsonResponse(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json",
      ...init?.headers,
    },
  });
}

describe("UserManagement integration", () => {
  let users: MockUser[];

  beforeEach(() => {
    users = [...initialUsers];
    useUserUiStore.getState().reset();
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        const url = typeof input === "string" ? input : input.toString();
        const method = init?.method ?? "GET";

        if (url === "/api/users" && method === "GET") {
          return jsonResponse({ users });
        }

        if (url === "/api/users" && method === "POST") {
          const body = JSON.parse(String(init?.body));

          if (users.some((user) => user.email === body.email)) {
            return jsonResponse(
              {
                error: "Email already exists",
                fieldErrors: {
                  email: ["このメールアドレスはすでに登録されています。"],
                },
              },
              { status: 409 },
            );
          }

          const nextUser = {
            id: users.length + 1,
            name: body.name,
            email: body.email,
            createdAt: "2026-05-24T08:00:00.000Z",
            updatedAt: "2026-05-24T08:00:00.000Z",
          };
          users = [nextUser, ...users];
          return jsonResponse({ user: nextUser }, { status: 201 });
        }

        const userRoute = url.match(/^\/api\/users\/(\d+)$/);

        if (userRoute && method === "PATCH") {
          const id = Number(userRoute[1]);
          const body = JSON.parse(String(init?.body));
          users = users.map((user) =>
            user.id === id
              ? { ...user, ...body, updatedAt: "2026-05-24T09:00:00.000Z" }
              : user,
          );
          return jsonResponse({ user: users.find((user) => user.id === id) });
        }

        if (userRoute && method === "DELETE") {
          const id = Number(userRoute[1]);
          users = users.filter((user) => user.id !== id);
          return new Response(null, { status: 204 });
        }

        return jsonResponse({ error: "Unhandled mock request" }, { status: 500 });
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("creates, updates, and deletes a user through TanStack Query and Zustand state", async () => {
    const user = userEvent.setup();

    render(
      <Providers>
        <UserManagement />
      </Providers>,
    );

    expect(await screen.findByText("Taro Yamada")).toBeVisible();

    await user.type(screen.getByLabelText("名前"), "New User");
    await user.type(screen.getByLabelText("メールアドレス"), "new@example.com");
    await user.click(screen.getByRole("button", { name: /登録/ }));

    expect(await screen.findByText("ユーザーを登録しました。")).toBeVisible();
    expect(screen.getByText("new@example.com")).toBeVisible();

    const newUserRow = screen.getByRole("row", { name: /New User/ });
    await user.click(within(newUserRow).getByRole("button", { name: /編集/ }));
    const nameInput = screen.getByDisplayValue("New User");
    await user.clear(nameInput);
    await user.type(nameInput, "Updated User");
    await user.click(screen.getByRole("button", { name: /更新/ }));

    expect(await screen.findByText("ユーザーを更新しました。")).toBeVisible();
    expect(screen.getByText("Updated User")).toBeVisible();

    const updatedRow = screen.getByRole("row", { name: /Updated User/ });
    await user.click(within(updatedRow).getByRole("button", { name: /削除/ }));

    await waitFor(() => {
      expect(screen.queryByText("Updated User")).not.toBeInTheDocument();
    });
    expect(screen.getByText("ユーザーを削除しました。")).toBeVisible();
  });
});
