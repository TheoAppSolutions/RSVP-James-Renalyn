export type ColorPalette = Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;

const SWATCH_DEFINITIONS = [
  { name: "Off-white", shade: 50, variant: "off-white" },
  { name: "Sage green", shade: 300, variant: "sage" },
  { name: "Olive green", shade: 400, variant: "olive" },
  { name: "Moss green", shade: 500, variant: "moss" },
] as const;

export function createSwatches(colors: ColorPalette) {
  return SWATCH_DEFINITIONS.map(({ name, shade, variant }) => ({ name, color: colors[shade], variant }));
}

export const ATTIRE = [
  {
    label: "Gentlemen",
    note: "A collared shirt or barong with trousers; a lightweight jacket is optional.",
    images: {
      "off-white": "/attire-men-off-white.webp",
      sage: "/attire-men.webp?v=sage-artwork",
      olive: "/attire-men-olive.webp",
      moss: "/attire-men-moss.webp",
    },
    alt: "Four examples of casual and semi-formal menswear, including a barong Tagalog",
  },
  {
    label: "Ladies",
    note: "A relaxed dress or coordinated separates with comfortable shoes.",
    images: {
      "off-white": "/attire-women-off-white.webp",
      sage: "/attire-women.webp?v=sage-artwork",
      olive: "/attire-women-olive.webp",
      moss: "/attire-women-moss.webp",
    },
    alt: "Four examples of casual and semi-formal dresses and separates",
  },
] as const;
