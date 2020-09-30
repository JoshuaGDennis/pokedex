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
