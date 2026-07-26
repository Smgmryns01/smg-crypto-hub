import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Email and password are required.",
        },
        { status: 400 }
      );
    }

    // Temporary Mock Authentication
    // This will be replaced with ICP Internet Identity in a future sprint.

    return NextResponse.json(
      {
        success: true,
        data: {
          token: "mock-session-token",
          expiresAt: new Date(
            Date.now() + 1000 * 60 * 60 * 24
          ).toISOString(),
          user: {
            id: "user_001",
            name: "SMG User",
            email,
            role: "student",
          },
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request.",
      },
      { status: 400 }
    );
  }
}