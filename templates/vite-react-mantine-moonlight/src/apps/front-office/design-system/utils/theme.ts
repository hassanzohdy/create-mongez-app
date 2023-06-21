import { currentLocaleCode } from "@mongez/moonlight";

export const theme = {
  colors: {
    red: {
      main: "#f44336",
      light: "#ff7961",
      dark: "#ba000d",
    },
    green: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#087f23",
    },
    blue: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#0d47a1",
    },
  },
  fontFamily: {
    ar: {
      primary: "Cairo",
    },
    en: {
      primary: undefined,
    },
  },
};

export function getPrimaryFont() {
  return theme.fontFamily[currentLocaleCode()].primary;
}
