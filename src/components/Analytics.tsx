'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { analyticsAllowed, CONSENT_EVENT } from '@/lib/consent';

/**
 * Google Analytics, gated on consent. Renders nothing — and so loads no Google
 * scripts and sets no cookies — until the user has explicitly granted analytics
 * consent. Re-evaluates whenever the stored choice changes (accept / reject /
 * withdraw via the footer "Cookie preferences" link).
 */
export function Analytics({ gaId }: { gaId: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(analyticsAllowed());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
