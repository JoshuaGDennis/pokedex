type colorObject = {
  primary: string;
  secondary: string;
};

interface iTheme {
  id: string;
  background: colorObject;
  card: string;
  shadow: string;
  text: string;
}

const THEME_LIGHT: iTheme = {
  id: "LIGHT",
  background: {
    primary: "#fafafa",
    secondary: "#e6e6e6",
  },
  card: "#fff",
  shadow: "#adadad",
  text: "#707070",
};

const THEME_DARK: iTheme = {
  id: "LIGHT",
  background: {
    primary: "#252525",
    secondary: "#393e46",
  },
  card: "#393e46",
  shadow: "#1d1a1a",
  text: "#fff",
};

export { THEME_LIGHT, THEME_DARK };
