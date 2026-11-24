"use client";

import Image from "next/image";
import { EVENT, MEDIA } from "@/lib/event";

export default function Hero() {
  const groom = EVENT.groom.split(" ")[0];
  const bride = EVENT.bride.split(" ")[0];

  function goToRsvp() {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header id="top" className="hero">
      <Image src={MEDIA.hero} alt={EVENT.honoree} fill priority quality={90} sizes="100vw" className="hero-image" />
      <div className="hero-shade" aria-hidden="true" />

      <nav className="site-nav" aria-label="Main navigation">
        <a href="#top" className="nav-brand" aria-label={`${EVENT.honoree}, top of page`}>{EVENT.initials}</a>
        <div className="nav-links">
          <a href="#venues">The day</a>
          <a href="#attire">Dress code</a>
          <a href="#gallery">Gallery</a>
          <a href="#good-to-know">Good to know</a>
          <a href="#rsvp">RSVP</a>
        </div>
        <button type="button" onClick={goToRsvp} className="nav-rsvp">Responses <span aria-hidden="true">↗</span></button>
      </nav>

      <div className="hero-content">
        <div className="hero-copy">
          <h1 aria-label={EVENT.honoree}>
            <span>{groom}</span>
            <i aria-hidden="true">&amp;</i>
            <span>{bride}</span>
          </h1>
          <p className="hero-invite">
            “When the time is right, I, the Lord, will make it happen.”
            <cite>Isaiah 60:22</cite>
          </p>
        </div>
        <div className="hero-action-row">
          <button type="button" onClick={goToRsvp} className="primary-link">View guest responses <span aria-hidden="true">↗</span></button>
        </div>
      </div>

      <div className="hero-bottom">
        <a href="#venues">Discover the celebration <span aria-hidden="true">↓</span></a>
      </div>
    </header>
  );
}
