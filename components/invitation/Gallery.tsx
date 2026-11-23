"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Landscape frames punctuate the portraits; each frame keeps its image's ratio.
const photos = [
  { name: "warm-embrace-portrait", width: 1067, height: 1600, alt: "James and Renalyn smiling in a warm embrace" },
  { name: "uniform-smiles-portrait", width: 1067, height: 1600, alt: "James and Renalyn sharing a playful smile in uniform" },
  { name: "seated-embrace-portrait", width: 1067, height: 1600, alt: "Renalyn embracing James as he sits" },
  { name: "dress-uniform-portrait", width: 1067, height: 1600, alt: "James standing in dress uniform beside a seated Renalyn" },
  { name: "close-together-portrait", width: 1057, height: 1600, alt: "James and Renalyn leaning close together" },
  { name: "playful-moment-landscape", width: 1600, height: 1067, alt: "James pointing toward Renalyn as she smiles across the frame" },
  { name: "standing-together-portrait", width: 1067, height: 1600, alt: "James in camouflage standing beside Renalyn on a stool" },
  { name: "playful-embrace-portrait", width: 1067, height: 1600, alt: "Renalyn hugging James from behind with one foot lifted" },
  { name: "gentle-kiss-portrait", width: 1067, height: 1600, alt: "James giving Renalyn a gentle kiss on the side of her head" },
  { name: "side-by-side-portrait", width: 1067, height: 1600, alt: "James and Renalyn posing side by side on stools" },
  { name: "shoulder-embrace-portrait", width: 1067, height: 1600, alt: "Renalyn resting her arms around James's shoulders" },
  { name: "shared-glance-landscape", width: 1600, height: 1067, alt: "James and Renalyn exchanging a smile across a table" },
];

export default function Gallery() {
  const viewport = useRef<HTMLDivElement>(null);
  const firstGroup = useRef<HTMLUListElement>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const scroller = viewport.current;
    const group = firstGroup.current;
    if (!scroller || !group || paused || hovered || focused || touching || reducedMotion
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number;
    let previousTime: number | undefined;
    let position = scroller.scrollLeft;

    function advance(time: number) {
      if (previousTime !== undefined && scroller && group) {
        // Cap the delta so returning to a background tab never jumps ahead.
        position += Math.min(time - previousTime, 64) * 0.032;
        const loopWidth = group.getBoundingClientRect().width;
        if (loopWidth > 0) position %= loopWidth;
        scroller.scrollLeft = position;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(advance);
    }

    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, [paused, hovered, focused, touching, reducedMotion]);

  return (
    <section id="gallery" className="gallery-section section-pad" aria-labelledby="gallery-title">
      <div className="section-wrap gallery-heading">
        <div>
          <span className="eyebrow">Our moments together</span>
          <h2 id="gallery-title" className="display-heading">A little of <em>our story</em></h2>
          <p>A few favorite moments, and a lifetime more to come.</p>
        </div>
        <button
          type="button"
          className="gallery-toggle"
          aria-controls="gallery-carousel"
          aria-pressed={paused}
          disabled={reducedMotion}
          onClick={() => setPaused((value) => !value)}
        >
          <span aria-hidden="true">{paused || reducedMotion ? "▷" : "Ⅱ"}</span>
          {reducedMotion ? "Auto-scroll off" : paused ? "Play gallery" : "Pause gallery"}
        </button>
      </div>
      <p id="gallery-help" className="sr-only">Scroll or swipe to explore all twelve photos. Auto-scroll pauses while you hover, touch, or use the keyboard inside the gallery.</p>
      <div
        id="gallery-carousel"
        className="gallery-viewport"
        ref={viewport}
        role="region"
        aria-label="James and Renalyn photo gallery"
        aria-describedby="gallery-help"
        tabIndex={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onTouchStart={() => setTouching(true)}
        onTouchEnd={() => setTouching(false)}
        onTouchCancel={() => setTouching(false)}
      >
        <div className="gallery-track">
          {[false, true].map((duplicate) => (
            <ul key={String(duplicate)} className="gallery-group" ref={duplicate ? undefined : firstGroup} aria-hidden={duplicate || undefined}>
              {photos.map((photo) => (
                <li key={photo.name} className="gallery-frame" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                  <Image
                    src={`/gallery/james-renalyn-${photo.name}.webp`}
                    alt={duplicate ? "" : photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes={photo.width > photo.height ? "(max-width: 560px) 420px, (max-width: 800px) 540px, 660px" : "(max-width: 560px) 187px, (max-width: 800px) 240px, 294px"}
                    draggable={false}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className="gallery-note">Little moments. A love for a lifetime.</p>
    </section>
  );
}
