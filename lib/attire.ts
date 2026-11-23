export type ColorPalette = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;

const SWATCH_DEFINITIONS = [
  { name: "Off-white", shade: 50 },
  { name: "Sage green", shade: 300 },
  { name: "Olive green", shade: 400 },
  { name: "Moss green", shade: 500 },
] as const;

export function createSwatches(colors: ColorPalette) {
  return SWATCH_DEFINITIONS.map(({ name, shade }) => ({ name, color: colors[shade] }));
}

export const ATTIRE = [
  {
    label: "Gentlemen",
    note: "A collared shirt or barong with trousers; a lightweight jacket is optional.",
    image: "/attire-men.webp",
    alt: "Three examples of semi-formal menswear, including a barong Tagalog",
  },
  {
    label: "Ladies",
    note: "A relaxed dress or coordinated separates with comfortable shoes.",
    image: "/attire-women.webp",
    alt: "Three examples of semi-formal dresses",
  },
] as const;
