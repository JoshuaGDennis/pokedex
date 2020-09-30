import {
  GenerationResource,
  PokemonResource,
  ResourceList,
} from "helpers/types";

const BASE_URL = "https://pokeapi.co/api/v2";

const getGeneration = (id: string): Promise<GenerationResource> =>
  fetch(`${BASE_URL}/generation/${id}`).then((res) => res.json());

const getGenerationList = (): Promise<ResourceList> =>
  fetch(`${BASE_URL}/generation`).then((res) => res.json());

const getPokemonResource = (id: string): Promise<PokemonResource> =>
  fetch(`${BASE_URL}/pokemon/${id}`).then((res) => res.json());

export { getGeneration, getGenerationList, getPokemonResource };
