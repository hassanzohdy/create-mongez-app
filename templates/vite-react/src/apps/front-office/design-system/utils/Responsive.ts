export const breakpoints = {
  xs: 500,
  sm: 800,
  md: 1000,
  lg: 1200,
  xl: 1400,
};
export const media = {
  maxMedia: "@media (max-width",
  minMedia: "@media (min-width",
};

export type ResponsiveProps = {
  breakpoints: number;
  media: string;
};
