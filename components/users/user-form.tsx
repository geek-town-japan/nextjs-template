"use client";

import { Save, X } from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserApiError } from "@/components/users/user-api";
import {
  userCreateSchema,
  type UserCreateInput,
} from "@/lib/validations/user";

type FieldErrors = Record<string, string[] | undefined>;

export type UserFormValues = UserCreateInput;

export type UserFormProps = {
  defaultValues?: Partial<UserFormValues>;
  mode: "create" | "update";
  pending?: boolean;
  onSubmit: (values: UserFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

const emptyValues: UserFormValues = {
  name: "",
  email: "",
};

function firstError(errors: FieldErrors, field: keyof UserFormValues) {
  return errors[field]?.[0];
}

export function UserForm({
  defaultValues,
  mode,
  pending = false,
  onSubmit,
  onCancel,
}: UserFormProps) {
  const initialValues = useMemo(
    () => ({
      ...emptyValues,
      ...defaultValues,
    }),
    [defaultValues],
  );
  const [values, setValues] = useState<UserFormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);

    const parsed = userCreateSchema.safeParse(values);

    if (!parsed.success) {
      const validation = parsed.error.flatten();
      setFieldErrors(validation.fieldErrors);
      setFormError(validation.formErrors[0] ?? null);
      return;
    }

    try {
      await onSubmit(parsed.data);

      if (mode === "create") {
        setValues(emptyValues);
      }
    } catch (error) {
      if (error instanceof UserApiError) {
        const hasFieldErrors = Object.values(error.fieldErrors).some(
          (messages) => messages && messages.length > 0,
        );

        setFieldErrors(error.fieldErrors);
        setFormError(
          error.formErrors[0] ??
            (!hasFieldErrors && error.status === 409
              ? "このメールアドレスはすでに登録されています。"
              : !hasFieldErrors
                ? error.message
                : null),
        );
        return;
      }

      if (error instanceof z.ZodError) {
        const validation = error.flatten();
        setFieldErrors(validation.fieldErrors);
        setFormError(validation.formErrors[0] ?? null);
        return;
      }

      setFormError("保存に失敗しました。");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr_1.2fr_auto]">
      <div className="grid gap-2">
        <Label htmlFor={`${mode}-user-name`}>名前</Label>
        <Input
          id={`${mode}-user-name`}
          name="name"
          value={values.name}
          onChange={(event) =>
            setValues((current) => ({ ...current, name: event.target.value }))
          }
          autoComplete="name"
          aria-invalid={Boolean(firstError(fieldErrors, "name"))}
        />
        {firstError(fieldErrors, "name") ? (
          <p className="text-xs text-destructive">
            {firstError(fieldErrors, "name")}
          </p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor={`${mode}-user-email`}>メールアドレス</Label>
        <Input
          id={`${mode}-user-email`}
          name="email"
          type="email"
          value={values.email}
          onChange={(event) =>
            setValues((current) => ({ ...current, email: event.target.value }))
          }
          autoComplete="email"
          aria-invalid={Boolean(firstError(fieldErrors, "email"))}
        />
        {firstError(fieldErrors, "email") ? (
          <p className="text-xs text-destructive">
            {firstError(fieldErrors, "email")}
          </p>
        ) : null}
      </div>
      <div className="flex items-end gap-2">
        <Button type="submit" disabled={pending}>
          <Save aria-hidden="true" className="h-4 w-4" />
          {pending ? "保存中" : mode === "create" ? "登録" : "更新"}
        </Button>
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            <X aria-hidden="true" className="h-4 w-4" />
            取消
          </Button>
        ) : null}
      </div>
      {formError ? (
        <p className="text-sm text-destructive md:col-span-3">{formError}</p>
      ) : null}
    </form>
  );
}
