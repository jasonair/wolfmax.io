/**
 * Cookie / analytics consent state.
 *
 * Single source of truth for what the user has agreed to. Analytics (Google
 * Analytics) is non-essential under UK PECR / GDPR, so it stays OFF until the
 * user makes an explicit, affirmative choice. We record that choice here.
 */

export const CONSENT_KEY = 'workings_consent';
export const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 12 months

/**
 * Bumped when the meaning of a stored record changes. Older records (including
 * the pre-GA `{ acknowledged: true }` format, which had no version) are treated
 * as absent, so existing visitors are re-prompted to make a real choice.
 */
export const CONSENT_VERSION = 2;

/** Fired when the stored choice changes, so the analytics loader can react. */
export const CONSENT_EVENT = 'workings:consent-changed';

/** Footer "Cookie preferences" link dispatches this to re-open the notice. */
export const COOKIE_PREFS_EVENT = 'workings:open-cookie-prefs';

export type ConsentValue = 'granted' | 'denied';

export interface ConsentRecord {
  /** Whether the user agreed to analytics cookies. */
  analytics: ConsentValue;
  /** When the choice was made (ms epoch). */
  ts: number;
  /** Record schema version. */
  v: number;
}

/**
 * Returns the current consent record, or `null` if the user has not yet made a
 * valid choice (never chosen, expired, or a stale schema version).
 */
export function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (parsed.v !== CONSENT_VERSION) return null;
    if (typeof parsed.ts !== 'number' || Date.now() - parsed.ts >= CONSENT_TTL_MS) return null;
    if (parsed.analytics !== 'granted' && parsed.analytics !== 'denied') return null;
    return { analytics: parsed.analytics, ts: parsed.ts, v: parsed.v };
  } catch {
    return null;
  }
}

/** Records the user's analytics choice and notifies listeners. */
export function setConsent(analytics: ConsentValue): void {
  if (typeof window === 'undefined') return;
  try {
    const record: ConsentRecord = { analytics, ts: Date.now(), v: CONSENT_VERSION };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    /* ignore */
  }
  if (analytics === 'denied') clearAnalyticsCookies();
  window.dispatchEvent(new CustomEvent<ConsentRecord>(CONSENT_EVENT, { detail: { analytics, ts: Date.now(), v: CONSENT_VERSION } }));
}

/** True when the user has actively granted analytics consent. */
export function analyticsAllowed(): boolean {
  return readConsent()?.analytics === 'granted';
}

/**
 * Best-effort removal of Google Analytics cookies (`_ga`, `_ga_*`, `_gid`,
 * `_gat*`) when a user withdraws consent. Clears on the current host and the
 * registrable parent domain so it works on both `workings.io` and previews.
 */
export function clearAnalyticsCookies(): void {
  if (typeof document === 'undefined') return;
  const parts = location.hostname.split('.');
  const domains = new Set<string>(['', location.hostname]);
  if (parts.length > 2) domains.add('.' + parts.slice(-2).join('.'));
  else domains.add('.' + location.hostname);

  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0]?.trim();
    if (!name || !/^_ga|^_gid|^_gat/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domain ? `; domain=${domain}` : ''}`;
    }
  }
}
