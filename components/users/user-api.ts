import {
  userCreateSchema,
  userPatchSchema,
  type UserCreateInput,
  type UserPatchInput,
} from "@/lib/validations/user";

export type UserDto = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type ApiValidationErrors = {
  fieldErrors?: Record<string, string[] | undefined>;
  formErrors?: string[];
};

export class UserApiError extends Error {
  status: number;
  fieldErrors: Record<string, string[] | undefined>;
  formErrors: string[];

  constructor(
    message: string,
    status: number,
    validationErrors: ApiValidationErrors = {},
  ) {
    super(message);
    this.name = "UserApiError";
    this.status = status;
    this.fieldErrors = validationErrors.fieldErrors ?? {};
    this.formErrors = validationErrors.formErrors ?? [];
  }
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const body = json as {
      error?: string;
      fieldErrors?: Record<string, string[] | undefined>;
      formErrors?: string[];
    };

    throw new UserApiError(
      body.error ?? "API request failed",
      response.status,
      {
        fieldErrors: body.fieldErrors,
        formErrors: body.formErrors,
      },
    );
  }

  return json as T;
}

export async function listUsers() {
  const response = await fetch("/api/users", {
    headers: { accept: "application/json" },
  });
  const data = await parseJsonResponse<{ users: UserDto[] }>(response);

  return data.users;
}

export async function createUser(input: UserCreateInput) {
  const data = userCreateSchema.parse(input);
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseJsonResponse<{ user: UserDto }>(response);
}

export async function updateUser(id: number, input: UserPatchInput) {
  const data = userPatchSchema.parse(input);
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseJsonResponse<{ user: UserDto }>(response);
}

export async function deleteUser(id: number) {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    await parseJsonResponse<never>(response);
  }
}
