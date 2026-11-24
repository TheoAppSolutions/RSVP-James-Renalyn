"use client";

import { useState } from "react";
import { EVENT, VENUES } from "@/lib/event";
import { getVenueDirectionsUrl, getVenueMapSource } from "@/lib/maps";

export default function MapSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVenue = VENUES[activeIndex];
  const mapSource = getVenueMapSource(activeVenue);

  return (
    <section id="venues" className="venue-section section-pad" aria-labelledby="venues-title">
      <div className="section-wrap">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">01 / The celebration</span><h2 id="venues-title" className="display-heading">Where our story <em>continues</em></h2></div>
          <p>One beautiful day together in {EVENT.venue.city}.</p>
        </div>
        <div className="venue-layout">
          <div className="venue-list" role="tablist" aria-label="Wedding venue">
            {VENUES.map((venue, index) => (
              <button key={venue.label} id={`venue-tab-${index}`} type="button" role="tab" aria-selected={index === activeIndex} aria-controls="venue-map" onClick={() => setActiveIndex(index)} className={`venue-card ${index === activeIndex ? "active" : ""}`}>
                <span className="venue-number">0{index + 1}</span>
                <span className="venue-card-content"><span className="eyebrow">{venue.label} <span aria-hidden="true">·</span> {EVENT.time}</span><strong>{venue.name}</strong><span>{venue.address}</span><em>{index === activeIndex ? "Showing on map" : "View on map"} <span aria-hidden="true">↗</span></em></span>
              </button>
            ))}
            <p className="venue-note">Please arrive a little early to be seated before the celebration begins.</p>
          </div>
          <div id="venue-map" role="tabpanel" aria-labelledby={`venue-tab-${activeIndex}`} className="venue-map">
            <iframe key={mapSource} title={`Map showing ${activeVenue.name}`} src={mapSource} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
            <a href={getVenueDirectionsUrl(activeVenue)} target="_blank" rel="noopener noreferrer" className="map-directions">Get directions <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
