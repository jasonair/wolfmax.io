// One-off migration: creates the waitlist `signups` table. Idempotent.
// Run: node --env-file=.env.local scripts/migrate.mjs   (or it reads .env.local itself)
import { readFileSync } from 'node:fs';
import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  const line = readFileSync('.env.local', 'utf8').split('\n').find((l) => l.startsWith('DATABASE_URL='));
  if (line) process.env.DATABASE_URL = line.slice('DATABASE_URL='.length).trim().replace(/^["']|["']$/g, '');
}

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS signups (
    id                  bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email               text NOT NULL UNIQUE,
    country             text NOT NULL,
    user_personas       jsonb NOT NULL DEFAULT '[]'::jsonb,
    user_personas_other text,
    use_cases           jsonb NOT NULL DEFAULT '[]'::jsonb,
    use_cases_other     text,
    consent             boolean NOT NULL DEFAULT false,
    source              text NOT NULL DEFAULT 'waitlist-modal',
    created_at          timestamptz NOT NULL DEFAULT now()
  )
`;

const cols = await sql`
  SELECT column_name, data_type FROM information_schema.columns
  WHERE table_name = 'signups' ORDER BY ordinal_position
`;
console.log('signups table ready. Columns:');
cols.forEach((c) => console.log(`  - ${c.column_name} (${c.data_type})`));
