import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = typeof body?.token === "string" ? body.token.trim() : "";

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired verification link.",
        },
        { status: 400 }
      );
    }

    const isValidToken = token === "valid-token";

    if (!isValidToken) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired verification link.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired verification link.",
      },
      { status: 500 }
    );
  }
}
