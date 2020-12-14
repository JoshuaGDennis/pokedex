export type APIItem = {
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
  happiness: number
  captureRate: number
  growthRate: string
  genera: string
  name: string;
  color: string;
  evolutionChainId: number;
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
  exp: number;
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
  height: number
  weight: number
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
  weight: number
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

export type PokemonAbilityResponse = {
  id: number
  name: string
  description: string
  effect: string
}

export type PokemonAbilityResource = {
  effect_changes: {
    effect_entries: {
      effect: string
      language: APIItem
    }[]
    version_group: APIItem
  }[]
  effect_entries: {
    effect: string
    language: APIItem
  }[]
  flavor_text_entries: FlavorTextEntry[]
  generation: APIItem
  id: number
  is_main_series: boolean
  name: string
  names: {
    language: APIItem
    name: string
  }[]
  pokemon: {
    is_hidden: boolean
    pokemon: APIItem
    slot: number
  }[]
}

export type PokemonTypeResource = {
  damage_relations: {
    double_damage_from: APIItem[]
    double_damage_to: APIItem[]
    half_damage_from: APIItem[]
    half_damage_to: APIItem[]
    no_damage_from: APIItem[]
    no_damage_to: APIItem[]
  }
  game_indices: {
    game_index: number
    generation: APIItem
  }[]
  generation: APIItem
  id: number
  move_damage_class: APIItem
  moves: APIItem[]
  name: string
  names: {
    language: APIItem
    name: string
  }[]
  pokemon: {
    pokemon: APIItem
    slot: number
  }[]
}

export type PokemonTypeResponse = {
  id: number
  name: string
  doubleDamageFrom: string[]
  doubleDamageTo: string[]
  halfDamageFrom: string[]
  halfDamageTo: string[]
  noDamageFrom: string[]
  noDamageTo: string[]
}

type EvolutionDetail = {
  gender: APIItem | null
  held_item: APIItem | null
  item: APIItem | null
  known_move: APIItem | null
  known_move_type: APIItem | null
  location: APIItem | null
  min_affection: number | null
  min_beauty: number | null
  min_happiness: number | null
  min_level: number
  needs_overworld_rain: boolean
  party_species: APIItem | null
  party_type: APIItem | null
  relative_physical_stats: null
  time_of_day: string
  trade_species: APIItem | null
  trigger: APIItem
  turn_upside_down: boolean
}

export type PokemonEvolution = {
  name: string
  trigger: string
  level: number
}

export type EvolutionChain = {
  evolution_details: EvolutionDetail[]
  evolves_to: EvolutionChain[]
  is_baby: boolean
  species: APIItem
}

export type PokemonEvolutionResource = {
  baby_trigger_item: APIItem | null
  chain: {
    evolution_details: EvolutionDetail[]
    evolves_to: EvolutionChain[]
    is_baby: boolean
    species: APIItem
  }
  id: number
}

export type PokemonEvolutionResponse = {
  id: number
  pokemon: PokemonEvolution[]
}
