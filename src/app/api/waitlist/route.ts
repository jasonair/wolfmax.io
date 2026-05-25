import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function isStringArray(v: unknown, max: number): v is string[] {
  return Array.isArray(v) && v.length >= 1 && v.length <= max && v.every((x) => typeof x === 'string' && x.length <= 40);
}

function optText(v: unknown, max: number): string | null {
  if (v == null) return null;
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t ? t.slice(0, max) : null;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const country = typeof body.country === 'string' ? body.country.trim() : '';

  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (country.length < 2 || country.length > 8) {
    return NextResponse.json({ error: 'A country is required.' }, { status: 400 });
  }
  if (!isStringArray(body.user_personas, 20) || !isStringArray(body.use_cases, 20)) {
    return NextResponse.json({ error: 'Pick at least one option in each list.' }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ error: 'Consent is required.' }, { status: 400 });
  }

  const userPersonasOther = body.user_personas.includes('other') ? optText(body.user_personas_other, 80) : null;
  const useCasesOther = body.use_cases.includes('other') ? optText(body.use_cases_other, 120) : null;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    // ON CONFLICT keeps signups idempotent — a repeat email is a no-op success.
    await sql`
      INSERT INTO signups
        (email, country, user_personas, user_personas_other, use_cases, use_cases_other, consent, source)
      VALUES
        (${email}, ${country}, ${JSON.stringify(body.user_personas)}::jsonb, ${userPersonasOther},
         ${JSON.stringify(body.use_cases)}::jsonb, ${useCasesOther}, true, 'waitlist-modal')
      ON CONFLICT (email) DO NOTHING
    `;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Waitlist insert failed:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
