import { z } from "zod";

export const userNameSchema = z
  .string()
  .trim()
  .min(1, "名前を入力してください。")
  .max(80, "名前は80文字以内で入力してください。");

export const userEmailSchema = z
  .string()
  .trim()
  .email("有効なメールアドレスを入力してください。")
  .max(255, "メールアドレスは255文字以内で入力してください。")
  .transform((email) => email.toLowerCase());

export const userIdSchema = z.coerce
  .number()
  .int("IDが不正です。")
  .positive("IDが不正です。");

export const userCreateSchema = z
  .object({
    name: userNameSchema,
    email: userEmailSchema,
  })
  .strict();

export const userUpdateSchema = userCreateSchema;

export const userPatchSchema = z
  .object({
    name: userNameSchema.optional(),
    email: userEmailSchema.optional(),
  })
  .strict()
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "更新する項目を指定してください。",
  });

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserPatchInput = z.infer<typeof userPatchSchema>;
