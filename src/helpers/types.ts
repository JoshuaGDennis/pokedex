export type KeyValue = {
  name: string;
  url: string;
};

export type InternationalKeyValue = {
  language: KeyValue;
  name: string;
};

export type ResourceList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: KeyValue[];
};

export type GenerationResource = {
  abilities: KeyValue[];
  id: number;
  main_region: KeyValue;
  moves: KeyValue[];
  name: string;
  names: InternationalKeyValue[];
  pokemon_species: KeyValue[];
  types: KeyValue[];
  version_groups: KeyValue[];
};

export type PokemonResource = {
  abilities: KeyValue[];
  base_experience: number;
  forms: KeyValue[];
  game_indices: {
    game_index: number;
    version: KeyValue;
  }[];
  height: number;
  held_items: {
    item: KeyValue;
    version_details: {
      rarity: number;
      version: KeyValue;
    };
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: KeyValue[];
  name: string;
  order: number;
  species: KeyValue;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string;
    front_female: string | null;
    front_shiny: string;
    front_shiny_female: string | null;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: KeyValue;
  }[];
  types: {
    slot: number;
    type: KeyValue;
  }[];
  weight: number;
};
