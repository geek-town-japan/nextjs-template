import { describe, expect, it } from "vitest";
import {
  userCreateSchema,
  userPatchSchema,
} from "@/lib/validations/user";

describe("user validation", () => {
  it("normalizes valid create input", () => {
    const parsed = userCreateSchema.parse({
      name: "  Taro Yamada  ",
      email: "  TARO@EXAMPLE.COM  ",
    });

    expect(parsed).toEqual({
      name: "Taro Yamada",
      email: "taro@example.com",
    });
  });

  it("rejects malformed create input", () => {
    const parsed = userCreateSchema.safeParse({
      name: "",
      email: "not-an-email",
    });

    expect(parsed.success).toBe(false);
    expect(parsed.error?.flatten().fieldErrors.name?.[0]).toBe(
      "名前を入力してください。",
    );
    expect(parsed.error?.flatten().fieldErrors.email?.[0]).toBe(
      "有効なメールアドレスを入力してください。",
    );
  });

  it("rejects unknown fields that could overwrite server-owned columns", () => {
    const parsed = userCreateSchema.safeParse({
      id: 999,
      name: "Attacker",
      email: "attacker@example.com",
      createdAt: "2000-01-01T00:00:00.000Z",
      updatedAt: "2000-01-01T00:00:00.000Z",
    });

    expect(parsed.success).toBe(false);
    expect(parsed.error?.flatten().formErrors.join(" ")).toContain(
      "Unrecognized",
    );
  });

  it("requires at least one patch field and rejects unknown patch fields", () => {
    expect(userPatchSchema.safeParse({}).success).toBe(false);

    const maliciousPatch = userPatchSchema.safeParse({
      id: 1,
      email: "safe@example.com",
    });

    expect(maliciousPatch.success).toBe(false);
    expect(maliciousPatch.error?.flatten().formErrors.join(" ")).toContain(
      "Unrecognized",
    );
  });
});
