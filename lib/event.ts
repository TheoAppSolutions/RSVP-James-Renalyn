export type Venue = { label: string; name: string; address: string };

export const EVENT = {
  honoree: "James & Renalyn",
  groom: "James",
  bride: "Renalyn",
  initials: "J & R",
  dateLong: "Thursday, December 10, 2026",
  dateFooter: "December 10, 2026",
  rsvpDeadline: "November 30, 2026",
  time: "11:00 AM",
  dateISO: "2026-12-10T11:00:00+08:00",
  color: "Olive green, moss green, sage green, and off-white",
  dressCode: "Casual / Semi-formal",
  venue: { label: "Wedding venue", name: "Ritz Tower de Leye", address: "Real St., Tacloban City", city: "Tacloban City" },
};

export const VENUES = [EVENT.venue] as const;
export const EVENT_TIMESTAMP = new Date(EVENT.dateISO).getTime();

export const MEDIA = {
  hero: "/hero.webp",
  galleryPrefix: "/gallery/james-renalyn-",
};
