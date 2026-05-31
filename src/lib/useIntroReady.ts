'use client';

import { useSyncExternalStore } from 'react';

/** Fired on `window` the instant the intro finishes docking the logo. */
export const INTRO_DONE_EVENT = 'intro:done';

function subscribe(onChange: () => void) {
  window.addEventListener(INTRO_DONE_EVENT, onChange);
  return () => window.removeEventListener(INTRO_DONE_EVENT, onChange);
}

// Ready unless the intro is mid-flight. The pre-paint script sets
// data-intro="play" only while it runs; IntroOverlay flips it to "done" before
// dispatching INTRO_DONE_EVENT, so anything that isn't "play" means reveal.
function getSnapshot() {
  return document.documentElement.dataset.intro !== 'play';
}

// Hidden on the server / during hydration so the markup matches; the client
// snapshot then reveals immediately when no intro is playing.
const getServerSnapshot = () => false;

/**
 * Gates page reveals on the intro animation. Returns `true` once content
 * should appear:
 *  - immediately, when the intro isn't playing (reduced motion, or the
 *    pre-paint script opted out), or
 *  - the moment the intro finishes docking the logo onto the navbar.
 *
 * Components key their reveal timelines off this single moment so the nav
 * line, nav items, hero text and wave can cascade in after the logo lands.
 */
export function useIntroReady() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
