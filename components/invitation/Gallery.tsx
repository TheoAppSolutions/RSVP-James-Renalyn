"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { requestMusicPlayback } from "@/lib/music";

// Landscape frames punctuate the portraits; each frame keeps its image's ratio.
const photos = [
  { name: "warm-embrace-portrait", width: 1067, height: 1600, alt: "James and Renalyn smiling in a warm embrace" },
  { name: "uniform-smiles-portrait", width: 1067, height: 1600, alt: "James and Renalyn sharing a playful smile in uniform" },
  { name: "seated-embrace-portrait", width: 1067, height: 1600, alt: "Renalyn embracing a seated James in camouflage" },
  { name: "dress-uniform-portrait", width: 1067, height: 1600, alt: "James standing in dress uniform beside a seated Renalyn" },
  { name: "playful-moment-landscape", width: 1600, height: 1067, alt: "James pointing toward Renalyn as she smiles across the frame" },
  { name: "close-together-portrait", width: 1057, height: 1600, alt: "James and Renalyn leaning close together" },
  { name: "standing-together-portrait", width: 1067, height: 1600, alt: "James in camouflage standing beside Renalyn on a stool" },
  { name: "seated-uniform-portrait", width: 1067, height: 1600, alt: "Renalyn standing beside a seated James in camouflage and a beret" },
  { name: "playful-embrace-portrait", width: 1067, height: 1600, alt: "Renalyn hugging James from behind with one foot lifted" },
  { name: "seated-together-landscape", width: 1600, height: 1067, alt: "James and Renalyn sitting together on a stool and a white block" },
  { name: "gentle-kiss-portrait", width: 1067, height: 1600, alt: "James giving Renalyn a gentle kiss on the side of her head" },
  { name: "side-by-side-portrait", width: 1067, height: 1600, alt: "James and Renalyn posing side by side on stools" },
  { name: "shared-glance-landscape", width: 1600, height: 1067, alt: "James and Renalyn exchanging a smile across a table" },
];

export default function Gallery() {
  const viewport = useRef<HTMLDivElement>(null);
  const primaryGroup = useRef<HTMLUListElement>(null);
  const lightbox = useRef<HTMLDialogElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof photos)[number] | null>(null);
  const selectedPhotoIndex = selectedPhoto ? photos.indexOf(selectedPhoto) : -1;
  const lightboxOpen = selectedPhoto !== null;
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  function navigatePhoto(direction: number) {
    requestMusicPlayback();
    setSelectedPhoto((photo) => photo
      ? photos[Math.max(0, Math.min(photos.length - 1, photos.indexOf(photo) + direction))]
      : null);
  }

  useEffect(() => {
    const scroller = viewport.current;
    const group = primaryGroup.current;
    if (!scroller || !group) return;

    let loopWidth = 0;

    const wrapScroll = () => {
      if (loopWidth <= 0) return;
      const position = scroller.scrollLeft;
      // Keep manual scrolling in the middle copy, with matching photos on both sides.
      if (position < loopWidth || position >= loopWidth * 2) {
        scroller.scrollLeft = loopWidth + ((position - loopWidth) % loopWidth + loopWidth) % loopWidth;
      }
    };

    const resize = () => {
      const width = group.getBoundingClientRect().width;
      if (width <= 0) return;
      const progress = loopWidth > 0
        ? ((scroller.scrollLeft - loopWidth) % loopWidth + loopWidth) % loopWidth / loopWidth
        : 0;
      loopWidth = width;
      scroller.scrollLeft = loopWidth * (1 + progress);
    };

    resize();
    scroller.addEventListener("scroll", wrapScroll, { passive: true });
    const observer = new ResizeObserver(resize);
    observer.observe(group);

    return () => {
      scroller.removeEventListener("scroll", wrapScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const dialog = lightbox.current;
    if (!dialog || !lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const scroller = viewport.current;
    const group = primaryGroup.current;
    if (!scroller || !group || lightboxOpen || paused || hovered || focused || touching || reducedMotion
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number;
    let previousTime: number | undefined;

    function advance(time: number) {
      if (previousTime !== undefined && scroller && group) {
        // Cap the delta so returning to a background tab never jumps ahead.
        const loopWidth = group.getBoundingClientRect().width;
        if (loopWidth > 0) {
          const position = scroller.scrollLeft + Math.min(time - previousTime, 64) * 0.032;
          scroller.scrollLeft = loopWidth + ((position - loopWidth) % loopWidth + loopWidth) % loopWidth;
        }
      }
      previousTime = time;
      frame = window.requestAnimationFrame(advance);
    }

    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, [lightboxOpen, paused, hovered, focused, touching, reducedMotion]);

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
      <p id="gallery-help" className="sr-only">Scroll or swipe to explore all {photos.length} photos. Select a photo to view it full size. Auto-scroll pauses while you hover, touch, or use the keyboard inside the gallery.</p>
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
          {[0, 1, 2].map((copy) => (
            <ul key={copy} className="gallery-group" ref={copy === 1 ? primaryGroup : undefined} aria-hidden={copy !== 1 || undefined}>
              {photos.map((photo) => (
                <li key={photo.name} className="gallery-frame" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                  <button
                    type="button"
                    className="gallery-photo"
                    aria-label={`Enlarge photo: ${photo.alt}`}
                    aria-haspopup="dialog"
                    tabIndex={copy !== 1 ? -1 : undefined}
                    onClick={() => {
                      requestMusicPlayback();
                      setSelectedPhoto(photo);
                    }}
                  >
                    <Image
                      src={`/gallery/james-renalyn-${photo.name}.webp`}
                      alt={copy !== 1 ? "" : photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes={photo.width > photo.height ? "(max-width: 560px) 420px, (max-width: 800px) 540px, 660px" : "(max-width: 560px) 187px, (max-width: 800px) 240px, 294px"}
                      draggable={false}
                    />
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <p className="gallery-note">Little moments. A love for a lifetime.</p>
      <dialog
        ref={lightbox}
        className="gallery-lightbox"
        aria-label="Full-size gallery photo"
        onCancel={(event) => {
          event.preventDefault();
          setSelectedPhoto(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            navigatePhoto(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedPhoto(null);
        }}
      >
        {selectedPhoto && (
          <>
            <div className="gallery-lightbox-toolbar">
              <span className="gallery-lightbox-counter">{selectedPhotoIndex + 1} / {photos.length}</span>
              <button type="button" autoFocus aria-label="Close photo" onClick={() => setSelectedPhoto(null)}>
                Close <span aria-hidden="true">×</span>
              </button>
            </div>
            <div
              className="gallery-lightbox-stage"
              onClick={(event) => {
                if (event.target === event.currentTarget) setSelectedPhoto(null);
              }}
            >
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-prev"
                aria-label="Previous photo"
                disabled={selectedPhotoIndex === 0}
                onClick={() => navigatePhoto(-1)}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                className="gallery-lightbox-photo"
                aria-label={`Play wedding music: ${selectedPhoto.alt}`}
                onClick={requestMusicPlayback}
              >
                <Image
                  key={selectedPhoto.name}
                  src={`/gallery/james-renalyn-${selectedPhoto.name}.webp`}
                  alt={selectedPhoto.alt}
                  width={selectedPhoto.width}
                  height={selectedPhoto.height}
                  unoptimized
                  draggable={false}
                />
              </button>
              <button
                type="button"
                className="gallery-lightbox-nav gallery-lightbox-next"
                aria-label="Next photo"
                disabled={selectedPhotoIndex === photos.length - 1}
                onClick={() => navigatePhoto(1)}
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
