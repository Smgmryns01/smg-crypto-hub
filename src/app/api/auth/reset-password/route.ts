import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.password || typeof body.password !== "string") {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    if (!body?.confirmPassword || typeof body.confirmPassword !== "string") {
      return NextResponse.json(
        { error: "Confirm password is required." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Password reset successful.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to process request." },
      { status: 500 }
    );
  }
}
