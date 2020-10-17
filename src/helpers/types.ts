export type KeyValue = {
  name: string;
  url: string;
};

export type InternationalKeyValue = {
  language: KeyValue;
  name: string;
};

export type GenusKeyValue = {
  genus: string;
  language: KeyValue;
};

export type FlavourText = {
  flavor_text: string;
  language: KeyValue;
  version: KeyValue;
};

export type AltFlavourText = {
  flavor_text: string;
  language: KeyValue;
  version_group: KeyValue;
}

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
  abilities: {
    ability: KeyValue;
    is_hidden: boolean;
    slot: number;
  }[];
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

export type PokemonSpeciesResource = {
  base_happiness: number;
  capture_rate: number;
  color: KeyValue;
  egg_groups: KeyValue[];
  evolution_chain: string | null;
  evolves_from_species: KeyValue | null;
  flavor_text_entries: FlavourText[];
  form_descriptions: KeyValue[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: GenusKeyValue[];
  generation: KeyValue;
  growth_rate: KeyValue;
  habitat: KeyValue;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: InternationalKeyValue[];
  order: number;
  pal_park_encounters: {
    area: KeyValue;
    base_score: number;
    rate: number;
  }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: KeyValue;
  }[];
  shape: KeyValue;
  varieties: {
    isDefault: boolean;
    pokemon: KeyValue;
  }[];
};

export type PokemonAbilityResource = {
  effect_changes: string[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: KeyValue;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: KeyValue;
    version_group: KeyValue;
  }[];
  generation: KeyValue;
  id: number;
  is_main_series: boolean;
  name: string;
  names: InternationalKeyValue[];
  pokemon: {
    is_hidden: boolean;
    pokemon: KeyValue;
    slot: number;
  }[];
};

export type PokemonTypeResource = {
  damage_relations: {
    double_damage_from: KeyValue[]
    double_damage_to: KeyValue[]
    half_damage_from: KeyValue[]
    half_damage_to: KeyValue[]
    no_damage_from: KeyValue[]
    no_damage_to: KeyValue[]
  }
  game_indices: {
    game_index: number
    generation: KeyValue
  }[]
  generation: KeyValue
  id: number
  move_damage_class: KeyValue
  moves: KeyValue[]
  name: string
  names: InternationalKeyValue[]
  pokemon: {
    pokemon: KeyValue
    slot: number
  }[]
}
