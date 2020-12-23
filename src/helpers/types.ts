export type API_Item = {
  url: string;
  name: string;
}

export type TextEntry = {
  language: API_Item;
  flavor_text: string;
}

export type API_Response = {
  count: number
  results: API_Item[]
  next: string | null
  previous: string | null
}

export type Generation = {
  pokemon: {
    name: string
    id: number
  }[];
  id: number;
  name: string;
  versions: string[];
}

export type Generation_Raw = {
  names: {
    language: API_Item;
    name: string;
  }[];
  id: number;
  name: string;
  moves: API_Item[];
  types: API_Item[];
  main_region: API_Item;
  version_groups: API_Item[];
  pokemon_species: API_Item[];
}

export type Species = {
  id: number;
  genera: string;
  name: string;
  color: string;
  happiness: number;
  growthRate: string;
  captureRate: number;
  description: string;
  isMythical: boolean;
  isLegendary: boolean;
  evolutionChainId: number;
}

export type Species_Raw = {
  id: number;
  name: string;
  order: number;
  shape: API_Item;
  color: API_Item;
  is_baby: boolean;
  habitat: API_Item;
  gender_rate: number;
  is_mythical: boolean;
  capture_rate: number;
  generation: API_Item;
  hatch_counter: number;
  is_legendary: boolean;
  growth_rate: API_Item;
  base_happiness: number;
  egg_groups: API_Item[];
  forms_switchable: boolean;
  form_descriptions: API_Item[];
  evolves_from_species: API_Item;
  has_gender_differences: boolean;
  flavor_text_entries: TextEntry[];
  evolution_chain: {
    url: string;
  };
  genera: {
    language: API_Item;
    genus: string;
  }[];
  names: {
    language: API_Item;
    name: string;
  }[];
  pal_park_encounters: {
    base_score: number;
    area: API_Item;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: API_Item;
  }[];
  varieties: {
    is_default: boolean;
    pokemon: API_Item;
  }[];
}

export type Sprites = {
  back_shiny: string;
  front_shiny: string;
  back_default: string;
  front_default: string;
  back_female: string | null;
  front_female: string | null;
  front_shiny_female: string | null;
  other: {
    "official-artwork": {
      front_default: string;
    };
    dream_world: {
      front_female: string | null;
      front_default: string;
    };
  };
}

export type Pokemon = {
  id: number;
  exp: number;
  name: string;
  image: string;
  sprite: string;
  height: number;
  weight: number;
  moves: string[];
  types: string[];
  abilities: string[];
  stats: {
    value: number;
    name: string;
  }[];
}

export type Pokemon_Raw = {
  abilities: {
    is_hidden: boolean;
    ability: API_Item;
    slot: number;
  }[];
  game_indices: {
    game_index: number;
    version: API_Item;
  }[];
  held_items: {
    item: API_Item;
    version_details: {
      version: API_Item;
      rarity: number;
    }[];
  }[];
  moves: {
    move: API_Item;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: API_Item;
      version_group: API_Item;
    }[];
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: API_Item;
  }[];
  types: {
    slot: number;
    type: API_Item;
  }[];
  id: number;
  name: string;
  order: number;
  weight: number;
  height: number;
  sprites: Sprites;
  species: API_Item;
  forms: API_Item[];
  is_default: boolean;
  base_experience: number;
  location_area_encounters: string;
}

export type Form = {
  id: number;
  name: string;
  image: string;
}

export type Form_Raw = {
  id: number;
  name: string;
  order: number;
  names: string[];
  is_mega: boolean;
  sprites: Sprites;
  pokemon: API_Item;
  form_name: string;
  form_order: number;
  is_default: boolean;
  form_names: string[];
  is_battle_only: boolean;
  version_group: API_Item;
}

export type Ability = {
  id: number;
  name: string;
  effect: string;
  description: string;
}

export type Ability_Raw = {
  effect_changes: {
    effect_entries: {
      language: API_Item;
      effect: string;
    }[]
    version_group: API_Item;
  }[]
  effect_entries: {
    language: API_Item;
    effect: string;
  }[]
  names: {
    language: API_Item;
    name: string;
  }[]
  pokemon: {
    is_hidden: boolean;
    pokemon: API_Item;
    slot: number;
  }[]
  id: number;
  name: string;
  generation: API_Item;
  is_main_series: boolean;
  flavor_text_entries: TextEntry[];
}

export type Type = {
  id: number;
  name: string;
  noDamageTo: string[];
  halfDamageTo: string[];
  noDamageFrom: string[];
  doubleDamageTo: string[];
  halfDamageFrom: string[];
  doubleDamageFrom: string[];
}

export type Type_Raw = {
  damage_relations: {
    double_damage_from: API_Item[];
    half_damage_from: API_Item[];
    double_damage_to: API_Item[];
    half_damage_to: API_Item[];
    no_damage_from: API_Item[];
    no_damage_to: API_Item[];
  }
  game_indices: {
    generation: API_Item;
    game_index: number;
  }[]
  names: {
    language: API_Item;
    name: string;
  }[]
  pokemon: {
    pokemon: API_Item;
    slot: number;
  }[]
  id: number;
  name: string;
  moves: API_Item[];
  generation: API_Item;
  move_damage_class: API_Item;
}

export type Evolution_Item_Raw = {
  min_level: number;
  trigger: API_Item;
  time_of_day: string;
  item: API_Item | null;
  gender: API_Item | null;
  turn_upside_down: boolean;
  min_beauty: number | null;
  location: API_Item | null;
  held_item: API_Item | null;
  known_move: API_Item | null;
  party_type: API_Item | null;
  min_affection: number | null;
  min_happiness: number | null;
  needs_overworld_rain: boolean;
  relative_physical_stats: null;
  party_species: API_Item | null;
  trade_species: API_Item | null;
  known_move_type: API_Item | null;
}

export type Evolution_Item = {
  id: number;
  name: string;
  level: number;
  trigger: string;
}

export type Evolution_Chain = {
  is_baby: boolean;
  species: API_Item;
  evolves_to: Evolution_Chain[];
  evolution_details: Evolution_Item_Raw[];
}

export type Evolution_Raw = {
  chain: {
    evolution_details: Evolution_Item_Raw[];
    evolves_to: Evolution_Chain[];
    species: API_Item;
    is_baby: boolean;
  }
  id: number;
  baby_trigger_item: API_Item | null;
}

export type Evolution = {
  id: number;
  pokemon: Evolution_Item[];
}


