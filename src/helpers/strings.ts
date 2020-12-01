import { FlavorTextEntry } from "./types";

const capitalise = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const getIdFromUrl = (url: string): number => {
  const result = new RegExp(/[/](\d+)/g).exec(url);

  return result && result.length === 2 ? +result[1] : 0;
};

const getEnglishFlavorText = (entries: FlavorTextEntry[]): string => {
  const found = entries.find(({ language }) => language.name === "en");
  return found ? found.flavor_text : "";
};

const getPokemonSprite = (id: string | number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

export { capitalise, getIdFromUrl, getEnglishFlavorText, getPokemonSprite };
