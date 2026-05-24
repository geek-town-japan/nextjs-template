import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPrismaErrorCode } from "@/lib/prisma-errors";
import { userIdSchema, userPatchSchema } from "@/lib/validations/user";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

async function parseUserId(params: RouteContext["params"]) {
  const { id } = await params;
  return userIdSchema.safeParse(id);
}

export async function GET(_request: Request, { params }: RouteContext) {
  const parsedId = await parseUserId(params);

  if (!parsedId.success) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: parsedId.data },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const parsedId = await parseUserId(params);

  if (!parsedId.success) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const parsedBody = userPatchSchema.safeParse(body);

  if (!parsedBody.success) {
    const validation = parsedBody.error.flatten();

    return NextResponse.json(
      {
        error: "Validation failed",
        fieldErrors: validation.fieldErrors,
        formErrors: validation.formErrors,
      },
      { status: 400 },
    );
  }

  try {
    const user = await prisma.user.update({
      where: { id: parsedId.data },
      data: parsedBody.data,
    });

    return NextResponse.json({ user });
  } catch (error) {
    if (isPrismaErrorCode(error, "P2025")) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (isPrismaErrorCode(error, "P2002")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }

    throw error;
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const parsedId = await parseUserId(params);

  if (!parsedId.success) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  try {
    await prisma.user.delete({
      where: { id: parsedId.data },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    if (isPrismaErrorCode(error, "P2025")) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    throw error;
  }
}
