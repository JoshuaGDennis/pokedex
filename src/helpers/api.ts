import {
  GenerationResource,
  GenerationResponse,
  SpeciesResource,
  SpeciesResponse,
  PokemonResponse,
  PokemonResource,
  APIResource,
  PokemonFormResponse,
  PokemonFormResource,
} from "./types";
import { getIdFromUrl, getEnglishFlavorText } from "./strings";

const POKE_API = "https://pokeapi.co/api/v2";

const getAllGenerations = (): Promise<number[]> => 
  fetch(`${POKE_API}/generation`)
    .then(res => res.json())
    .then((data: APIResource) => data.results.map((_, i) => i + 1))

const getGeneration = (id: string | number): Promise<GenerationResponse> =>
  fetch(`${POKE_API}/generation/${id}`)
    .then((res) => res.json())
    .then((data: GenerationResource) => ({
      id: data.id,
      name: data.main_region.name,
      versions: data.version_groups.map(({ name }) => name),
      pokemon: data.pokemon_species
        .sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url))
        .map(({ name }) => name),
    }));

const getSpecies = (id: string | number): Promise<SpeciesResponse> =>
  fetch(`${POKE_API}/pokemon-species/${id}`)
    .then((res) => res.json())
    .then((data: SpeciesResource) => ({
      id: data.id,
      name: data.name,
      color: data.color.name,
      evolution: data.evolution_chain.url,
      description: getEnglishFlavorText(data.flavor_text_entries),
      isLegendary: data.is_legendary,
      isMythical: data.is_mythical,
    }));

const getPokemon = (id: string | number): Promise<PokemonResponse> =>
  fetch(`${POKE_API}/pokemon/${id}`)
    .then((res) => res.json())
    .then((data: PokemonResource) => ({
      id: data.id,
      abilities: data.abilities.map(({ ability }) => ability.name),
      name: data.name,
      moves: data.moves.map(({ move }) => move.name),
      sprite: data.sprites.front_default,
      image: data.sprites.other["official-artwork"].front_default,
      stats: data.stats.map((item) => ({
        name: item.stat.name,
        value: item.base_stat,
      })),
      types: data.types.map(({ type }) => type.name),
    }));

  const getPokemonForm = (id: string | number): Promise<PokemonFormResponse> => 
    fetch(`${POKE_API}/pokemon-form/${id}`)
      .then(res => res.json())
      .then((data: PokemonFormResource) => ({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default
      }))

export { getAllGenerations, getGeneration, getSpecies, getPokemon, getPokemonForm };
