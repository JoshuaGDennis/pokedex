type APIItem = {
  name: string;
  url: string;
};

type PokemonSprites = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string;
      front_female: string | null;
    };
    "official-artwork": {
      front_default: string;
    };
  };
}

export type FlavorTextEntry = {
  flavor_text: string;
  language: APIItem;
};

export type APIResource = {
  count: number
  next: string | null
  previous: string | null
  results: APIItem[]
}

export type GenerationResponse = {
  id: number;
  name: string;
  versions: string[];
  pokemon: {
    name: string
    id: number
  }[];
};

export type GenerationResource = {
  id: number;
  main_region: APIItem;
  moves: APIItem[];
  name: string;
  names: {
    language: APIItem;
    name: string;
  }[];
  pokemon_species: APIItem[];
  types: APIItem[];
  version_groups: APIItem[];
};

export type SpeciesResponse = {
  id: number;
  name: string;
  color: string;
  evolution: string;
  description: string;
  isLegendary: boolean;
  isMythical: boolean;
};

export type SpeciesResource = {
  base_happiness: number;
  capture_rate: number;
  color: APIItem;
  egg_groups: APIItem[];
  evolution_chain: {
    url: string;
  };
  evolves_from_species: APIItem;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: APIItem[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: {
    genus: string;
    language: APIItem;
  }[];
  generation: APIItem;
  growth_rate: APIItem;
  habitat: APIItem;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: {
    language: APIItem;
    name: string;
  }[];
  order: number;
  pal_park_encounters: {
    area: APIItem;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: APIItem;
  }[];
  shape: APIItem;
  varieties: {
    is_default: boolean;
    pokemon: APIItem;
  }[];
};

export type PokemonResponse = {
  abilities: string[];
  id: number;
  name: string;
  moves: string[];
  sprite: string;
  image: string;
  stats: {
    name: string;
    value: number;
  }[];
  types: string[];
};

export type PokemonResource = {
  abilities: {
    ability: APIItem;
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: APIItem[];
  game_indices: {
    game_index: number;
    version: APIItem;
  }[];
  height: number;
  held_items: {
    item: APIItem;
    version_details: {
      rarity: number;
      version: APIItem;
    }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: APIItem;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: APIItem;
      version_group: APIItem;
    }[];
  }[];
  name: string;
  order: number;
  species: APIItem;
  sprites: PokemonSprites
  stats: {
    base_stat: number;
    effort: number;
    stat: APIItem;
  }[];
  types: {
    slot: number;
    type: APIItem;
  }[];
};

export type PokemonFormResponse = {
  id: number
  name: string
  image: string
}

export type PokemonFormResource = {
  form_name: string
  form_names: string[]
  form_order: number
  id: number
  is_battle_only: boolean
  is_default: boolean
  is_mega: boolean
  name: string
  names: string[]
  order: number
  pokemon: APIItem
  sprites: PokemonSprites
  version_group: APIItem
}
