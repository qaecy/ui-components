export const allColors = [
  "primary",
  "secondary",
  "accent",
  "success",
  "error",
  "warning",
  "info",
  "extra-light-gray",
] as const;
export type Color = (typeof allColors)[number];

export const buttonColors = ["primary", "accent", "extra-light-gray", "secondary"];
export type ButtonColor = (typeof buttonColors)[number];

export const cardColors = ["primary", "accent", "extra-light-gray", "secondary"];
export type CardColor = (typeof buttonColors)[number];

export type TooltipColor = (typeof allColors)[number];

export const contrastColors: Map<Color, Color> = new Map<Color, Color>([
    ["primary", "extra-light-gray"],
    ["accent", "secondary"],
    ["secondary", "extra-light-gray"],
    ["info", "extra-light-gray"],
    ["error", "extra-light-gray"],
    ["success", "secondary"],
    ["warning", "secondary"],
    ["extra-light-gray", "secondary"],
]);