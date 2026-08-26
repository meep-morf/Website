import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/security";
import { siteConfig } from "@/content/site";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, 5, 60_000);

  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid form data.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const data = parsed.data;

  // Honeypot triggered — pretend success
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json({
      ok: true,
      fallback: true,
      message: `Email provider not configured. Please contact ${siteConfig.email}.`,
    });
  }

  try {
    const resend = new Resend(apiKey);
    const companyLine = data.company ? `\nCompany: ${data.company}` : "";
    const result = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `NomadLabz inquiry from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}${companyLine}\n\n${data.message}`,
    });

    if (result.error) {
      return NextResponse.json(
        {
          ok: false,
          error: `Unable to send right now. Please email ${siteConfig.email}.`,
          fallback: true,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: `Unable to send right now. Please email ${siteConfig.email}.`,
        fallback: true,
      },
      { status: 502 },
    );
  }
}
