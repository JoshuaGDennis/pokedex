import colors from "./colors";

export type colorObject = {
  primary: string;
  secondary: string;
};

export interface iTheme {
  id: "LIGHT" | "DARK";
  background: colorObject;
  card: string;
  shadow: string;
  text: string;
  transition: string;
  colors: {
    standard: {
      red: string;
      blue: string;
      green: string;
      purple: string;
    };
    pokemonTypes: {
      [key: string]: {
        primary: string;
        secondary: string;
      };
    };
  };
}

const THEME_GLOBAL = {
  transition: "0.2s all ease",
  colors: colors,
};

const THEME_LIGHT: iTheme = {
  id: "LIGHT",
  background: {
    primary: "#fafafa",
    secondary: "#e6e6e6",
  },
  card: "#fff",
  shadow: "#adadad",
  text: "#707070",
  ...THEME_GLOBAL,
};

const THEME_DARK: iTheme = {
  id: "DARK",
  background: {
    primary: "#252525",
    secondary: "#393e46",
  },
  card: "#393e46",
  shadow: "#1d1a1a",
  text: "#fff",
  ...THEME_GLOBAL,
};

export { THEME_LIGHT, THEME_DARK };
