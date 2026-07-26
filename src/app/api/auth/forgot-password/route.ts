import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.email || typeof body.email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Mock API response for development.
    return NextResponse.json(
      {
        message: "Password reset link sent.",
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
