'use client';

import { useEffect, useRef, useState } from 'react';
import { useAnimate } from 'framer-motion';

/** The W mark — the *exact* blue path from /brand/workings-horiz.svg (the asset
 *  the navbar renders), so the big W is the same geometry as the docked one.
 *  Reordered to start at the leftmost point and wind clockwise, so the outline
 *  trace draws from far-left and travels rightward. Same shape → same fill. */
const ICON_PATH =
  'M1.496,275.08C8.375,261.135,23.151,235.188,31.15,222.085C38.87,209.439,49.713,193.073,62.596,184.369C80.42,172.326,111.581,170.57,127.143,181.419C150.763,197.886,148.575,227.192,147.661,254.282C146.97,274.761,146.098,283.535,145.549,315.775C145.481,319.753,145.74,324.228,149.78,324.228C152.936,324.228,154.411,321.687,155.245,319.589C173.091,274.69,205.141,201.395,216.031,174.058C241.56,109.976,282.328,95.472,316.651,98.585C359.363,102.459,381.597,135.15,375.811,187.672C372.32,219.358,347.86,393.194,346.51,416.143C346.285,419.954,348.352,422.206,351.361,422.206C354.37,422.206,356.348,419.786,357.642,415.796C357.642,415.796,357.643,415.795,357.643,415.795C379.344,348.884,478.932,52.732,486.358,32.994C492.882,15.653,508.885,3.57,527.362,2.195C544.057,0.952,559.643,1.357,569.971,3.402C585.258,6.429,592.262,19.651,587.686,34.547C576.158,72.072,476.775,370.178,452.74,437.77C424.002,518.59,377.169,542.44,331.506,539.801C293.997,537.633,245.469,509.778,258.163,412.558C270.857,315.337,293.687,202.599,294.39,199.096C295.572,193.202,288.014,192.213,286.131,197.059C283.643,203.462,237.588,315.249,216.857,362.642C190.394,423.138,126.807,408.288,111.462,397.711C96.811,387.612,79.443,373.443,79.966,330.535C80.438,291.816,83.178,257.829,84.392,240.797C84.495,239.35,84.145,237.723,82.096,237.617C80.278,237.523,79.062,238.94,78.188,240.42C71.937,251.005,62.1,266.033,56.517,274.591C51.983,281.541,44.298,288.508,37.061,290.253C28.928,292.214,15.407,292.897,7.001,290.532C-0.69,288.368,-1.231,280.608,1.496,275.08Z';

/** Tight bounding box of ICON_PATH (measured via getBBox) — used as the W
 *  svg's viewBox so it fills its box undistorted, and as the dock target. */
const ICON_BBOX = { x: 0, y: 1.49, w: 589.07, h: 538.5 };

/** Pen thickness for the outline trace, in ICON_PATH units (~2.4px on screen).
 *  Only sets how fine the drawing line looks; the filled mark uses the path. */
const OUTLINE_WIDTH = 7.5;
const DRAW_MS = 1500;

/** Layout of /brand/workings-horiz.svg (viewBox 1920×542), measured via
 *  getBBox — used to land the W and wordmark exactly on the navbar logo. */
const HORIZ = {
  icon: ICON_BBOX,
  word: { x: 595.83, y: 145.14, w: 1324.17, h: 287.25 },
  vbW: 1920,
  vbH: 542,
};

/** Right edge of each glyph in "workings" as a fraction of the wordmark width
 *  (measured from the SVG), so it reveals one letter at a time. */
const TYPE_STOPS = [0.203, 0.341, 0.435, 0.562, 0.614, 0.743, 0.891, 1];
const TYPE_STEP_MS = 80; // per keystroke

// Guards against React StrictMode double-invocation in dev.
let hasStarted = false;

export function IntroOverlay() {
  const [scope, animate] = useAnimate();
  const [hidden, setHidden] = useState(false);
  const drawRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);
  const wRef = useRef<SVGSVGElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const wordImgRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== 'play' || hasStarted) return;
    hasStarted = true;

    const finish = () => {
      root.dataset.intro = 'done'; // navbar logo fades in (see globals.css)
    };

    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const smooth = (t: number) => t * t * (3 - 2 * t); // easeInOut

    // Tween a path's stroke-dashoffset from 1→0 each frame so the line draws
    // itself on (the classic self-drawing-stroke technique).
    const drawW = (dur: number) =>
      new Promise<void>((resolve) => {
        const path = drawRef.current;
        if (!path) return resolve();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          path.style.strokeDashoffset = String(1 - smooth(p));
          if (p < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });

    // Fade an element's opacity via rAF (reliable on inner SVG paths).
    const fade = (el: SVGElement | null, from: number, to: number, dur: number) =>
      new Promise<void>((resolve) => {
        if (!el) return resolve();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          el.style.opacity = String(from + (to - from) * smooth(p));
          if (p < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });

    // Type the wordmark out left-to-right, revealing it one glyph at a time.
    const typeWord = async () => {
      const img = wordImgRef.current;
      if (!img) return;
      await wait(160); // brief beat after the mark fills in
      for (const f of TYPE_STOPS) {
        img.style.clipPath = `inset(0 ${((1 - f) * 100).toFixed(2)}% 0 0)`;
        await wait(TYPE_STEP_MS);
      }
      img.style.clipPath = 'inset(0 0 0 0)';
      await wait(450); // hold the finished lockup before docking
    };

    const run = async () => {
      // 1. Trace the W's outline as a self-drawing stroke.
      await drawW(DRAW_MS);

      // 2. The traced outline fills in to the solid mark.
      await Promise.all([
        fade(fillRef.current, 0, 1, 380),
        fade(drawRef.current, 1, 0, 380),
      ]);

      // 3. "workings" is typed out beneath the W, terminal-style.
      await typeWord();

      // 4. Shrink + dock onto the navbar logo, rearranging to horizontal.
      const navLogo = document.getElementById('nav-logo');
      const wEl = wRef.current;
      const wordEl = wordRef.current;

      if (navLogo && wEl && wordEl) {
        const R = navLogo.getBoundingClientRect();
        const kx = R.width / HORIZ.vbW;
        const ky = R.height / HORIZ.vbH;
        const target = (b: { x: number; y: number; w: number; h: number }) => ({
          left: R.left + b.x * kx,
          top: R.top + b.y * ky,
          w: b.w * kx,
          h: b.h * ky,
        });
        const flip = (el: Element, t: ReturnType<typeof target>) => {
          const s = el.getBoundingClientRect();
          return {
            x: t.left - s.left,
            y: t.top - s.top,
            scaleX: t.w / s.width,
            scaleY: t.h / s.height,
          };
        };

        const dockOpts = { duration: 0.85, ease: [0.6, 0, 0.2, 1] as const };
        if (bgRef.current) {
          animate(bgRef.current, { opacity: [1, 0] }, { duration: 0.6, ease: 'easeOut' });
        }
        await Promise.all([
          animate(wEl, flip(wEl, target(HORIZ.icon)), dockOpts),
          animate(wordEl, flip(wordEl, target(HORIZ.word)), dockOpts),
        ]);
      } else if (bgRef.current) {
        await animate(bgRef.current, { opacity: 0 }, { duration: 0.4 });
      }

      // 5. Hand off to the real navbar logo.
      finish();
      await Promise.all([
        wEl && animate(wEl, { opacity: 0 }, { duration: 0.25 }),
        wordEl && animate(wordEl, { opacity: 0 }, { duration: 0.25 }),
      ]);
      setHidden(true);
    };

    run();
  }, [animate]);

  if (hidden) return null;

  return (
    <div
      ref={scope}
      id="intro-overlay"
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
    >
      <div ref={bgRef} id="intro-bg" className="absolute inset-0 bg-cream" />

      <div className="relative flex flex-col items-center gap-7">
        <svg
          ref={wRef}
          id="intro-w"
          viewBox={`${ICON_BBOX.x} ${ICON_BBOX.y} ${ICON_BBOX.w} ${ICON_BBOX.h}`}
          className="w-[160px] h-[146px] sm:w-[190px] sm:h-[174px]"
          style={{ transformOrigin: '0 0', willChange: 'transform', overflow: 'visible' }}
          fill="none"
        >
          {/* the filled mark — hidden until the outline has drawn */}
          <path ref={fillRef} d={ICON_PATH} fill="#0048ff" style={{ opacity: 0 }} />
          {/* the self-drawing outline of that same mark */}
          <path
            ref={drawRef}
            d={ICON_PATH}
            fill="none"
            stroke="#0048ff"
            strokeWidth={OUTLINE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            style={{ strokeDashoffset: 1 }}
          />
        </svg>

        <div
          ref={wordRef}
          id="intro-word"
          className="w-[230px] sm:w-[280px]"
          style={{ transformOrigin: '0 0', willChange: 'transform' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={wordImgRef}
            src="/brand/workings-word.svg"
            alt=""
            className="block w-full h-auto"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          />
        </div>
      </div>
    </div>
  );
}
