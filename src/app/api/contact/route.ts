import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  category: z.enum(["general", "partnership", "support", "press", "other"]),
  subject: z.string().min(5).max(120),
  message: z.string().min(20).max(2000),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = ContactSchema.parse(body);

    // Email sending activates at Milestone 6 when Resend/SMTP is configured.
    // For now, log the submission server-side for review.
    console.info("[Contact Form]", {
      name: data.name,
      email: data.email,
      category: data.category,
      subject: data.subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Message received. We will respond within 48 hours." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.flatten() },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
