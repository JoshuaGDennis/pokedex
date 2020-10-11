import {
  GenerationResource,
  PokemonResource,
  ResourceList,
  PokemonSpeciesResource,
  PokemonAbilityResource,
  PokemonTypeResource,
} from "helpers/types";

const BASE_URL = "https://pokeapi.co/api/v2";

type args = {
    ids: string[]
}

const fetchIds = (ids: string[], key: string) => 
  ids.map(id => fetch(`${BASE_URL}/${key}/${id}`).then(res => res.json()))

const getGeneration = (id: string): Promise<GenerationResource> =>
  fetch(`${BASE_URL}/generation/${id}`).then((res) => res.json());

const getGenerationList = (): Promise<ResourceList> =>
  fetch(`${BASE_URL}/generation`).then((res) => res.json());

const getPokemonResource = (id: string): Promise<PokemonResource> =>
  fetch(`${BASE_URL}/pokemon/${id}`).then((res) => res.json());

const getPokemonSpecies = (id: string): Promise<PokemonSpeciesResource> =>
  fetch(`${BASE_URL}/pokemon-species/${id}`).then((res) => res.json());

const getAbilityData = (key: string, { ids }: args): Promise<PokemonAbilityResource[]> =>
  Promise.all(fetchIds(ids, 'ability'))


const getTypeData = (key: string, { ids }: args): Promise<PokemonTypeResource[]> =>
    Promise.all(fetchIds(ids, 'type'))

export {
  getGeneration,
  getGenerationList,
  getPokemonResource,
  getPokemonSpecies,
  getAbilityData,
  getTypeData
};
