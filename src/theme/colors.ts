import { colorObject } from "./Theme";

const colors = {
  red: "#FF5252",
  green: "#1BBC9B",
  blue: "#00ABD8",
  purple: "#9C27B0",
};

const pokemonTypes: { [key: string]: colorObject } = {
  grass: {
    primary: "#67cc8e",
    secondary: "#91d9ad",
  },
  bug: {
    primary: "#a8c545",
    secondary: "#c3d680",
  },
  fire: {
    primary: "#FF7070",
    secondary: "#ff9f9f",
  },
  water: {
    primary: "#7ecefd",
    secondary: "#b5d9ee",
  },
  electric: {
    primary: "#ffdc00",
    secondary: "#ffec77",
  },
  poison: {
    primary: "#9c27b0",
    secondary: "#af6cbb",
  },
  psychic: {
    primary: "#e391c0",
    secondary: "#e2bad1",
  },
  dark: {
    primary: "#374140",
    secondary: "#808080",
  },
  fighting: {
    primary: "#d57e7e",
    secondary: "#d2a6a6",
  },
  flying: {
    primary: "#59d8e6",
    secondary: "#c8eaee",
  },
  ground: {
    primary: "#f0c755",
    secondary: "#f1dda8",
  },
  ghost: {
    primary: "#c09dec",
    secondary: "#d7c5ee",
  },
  fairy: {
    primary: "#f6bae7",
    secondary: "#f6d5ee",
  },
  steel: {
    primary: "#dcdcdc",
    secondary: "#f6f6f6",
  },
  ice: {
    primary: "#acf0f2",
    secondary: "#d8fbfc",
  },
  rock: {
    primary: "#e6a14d",
    secondary: "#e2be92",
  },
  dragon: {
    primary: "#8a76ff",
    secondary: "#ad9ffc",
  },
  normal: {
    primary: "#f7deb2",
    secondary: "#ffeccb",
  },
};

export { colors, pokemonTypes };
