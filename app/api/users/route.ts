import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isPrismaErrorCode } from "@/lib/prisma-errors";
import { userCreateSchema } from "@/lib/validations/user";

export const dynamic = "force-dynamic";

export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = userCreateSchema.safeParse(body);

  if (!parsed.success) {
    const validation = parsed.error.flatten();

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
    const user = await prisma.user.create({ data: parsed.data });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (isPrismaErrorCode(error, "P2002")) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 },
      );
    }

    throw error;
  }
}
