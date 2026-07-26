import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: true,
      data: {
        token: "mock-refreshed-session-token",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        user: {
          id: "user_001",
          email: "user@example.com",
          username: "smguser",
          fullName: "SMG User",
          role: "student",
          emailVerified: true,
          onChainVerified: false,
          authProvider: "email",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    },
    { status: 200 }
  );
}
