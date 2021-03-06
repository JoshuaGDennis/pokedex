import * as Types from './types'

const capitalise = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

const getIdFromUrl = (url: string): number => {
  const result = new RegExp(/[/](\d+)/g).exec(url);

  return result && result.length === 2 ? +result[1] : 0;
};

const getEnglishFlavorText = (entries: Types.TextEntry[]): string => {
  const found = entries.find(({ language }) => language.name === "en");
  return found ? found.flavor_text : "";
};

const getPokemonSprite = (id: string | number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

const getNames = (items: Types.API_Item[], func?: Function) => items.map(({ name  }) => func ? func(name) : name) 

export { capitalise, getIdFromUrl, getEnglishFlavorText, getPokemonSprite, getNames };
