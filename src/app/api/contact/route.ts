import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name too short").max(80),
  email: z.string().email("Invalid email"),
  subject: z.string().min(2).max(120).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(4000),
  // honeypot
  company: z.string().max(0, "spam").optional().or(z.literal("")),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  // In a production setup this would dispatch an email via SMTP/Resend/etc.
  // Here we log to the server and acknowledge.
   
  console.log("[contact] new message", { name, email, subject, message });

  return NextResponse.json({
    ok: true,
    message: `Thanks ${name}! Your message has been received.`,
  });
}
