import { capitalise, getEnglishFlavorText, getIdFromUrl } from "./strings";
import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  APIResource,
  GenerationResource,
  GenerationResponse,
  PokemonAbilityResource,
  PokemonAbilityResponse,
  PokemonFormResource,
  PokemonFormResponse,
  PokemonResource,
  PokemonResponse,
  PokemonTypeResource,
  PokemonTypeResponse,
  SpeciesResource,
  SpeciesResponse,
} from "./types";

interface iContext {
  generations: GenerationResponse[];
  isLoading: boolean;
  currentGen: GenerationResponse | null;
  setCurrentGen: Dispatch<React.SetStateAction<GenerationResponse | null>>;
  getSpecies(id: string | number): Promise<SpeciesResponse>;
  getForm(id: string | number): Promise<PokemonFormResponse>;
  getPokemon(id: string | number): Promise<PokemonResponse>;
  getAbility(id: string | number): Promise<PokemonAbilityResponse>;
  getType(id: string | number): Promise<PokemonTypeResponse>;
}

interface iProvider {
  children: React.ReactNode;
}

const ApiContext = createContext<iContext | null>(null);

const useApi = () => useContext(ApiContext) as iContext;

const ApiProvider: React.FC<iProvider> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [generations, setGenerations] = useState<GenerationResponse[]>([]);
  const [currentGen, setCurrentGen] = useState<GenerationResponse | null>(null);

  const apiFetch = (url: string) =>
    fetch(`https://pokeapi.co/api/v2${url}`).then((res) => res.json());

  const getSpecies = (id: string | number): Promise<SpeciesResponse> =>
    apiFetch(`/pokemon-species/${id}`).then((data: SpeciesResource) => ({
      id: data.id,
      captureRate: data.capture_rate,
      growthRate: data.growth_rate.name.replace("-", "/"),
      genera: data.genera.find((g) => g.language.name === "en")?.genus || "",
      happiness: data.base_happiness,
      name: data.name,
      color: data.color.name,
      evolution: data.evolution_chain.url,
      description: getEnglishFlavorText(data.flavor_text_entries),
      isLegendary: data.is_legendary,
      isMythical: data.is_mythical,
    }));

  const getForm = (id: string | number): Promise<PokemonFormResponse> =>
    apiFetch(`/pokemon-form/${id}`).then((data: PokemonFormResource) => ({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    }));

  const getPokemon = (id: string | number): Promise<PokemonResponse> =>
    apiFetch(`/pokemon/${id}`).then((data: PokemonResource) => ({
      id: data.id,
      abilities: data.abilities.map(({ ability }) => ability.name),
      exp: data.base_experience,
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

  const getAbility = (id: string | number): Promise<PokemonAbilityResponse> =>
    apiFetch(`/ability/${id}`).then((data: PokemonAbilityResource) => ({
      id: data.id,
      name: data.name,
      description: getEnglishFlavorText(data.flavor_text_entries),
      effect:
        data.effect_entries.find((entry) => entry.language.name === "en")
          ?.effect || "",
    }));

  const getType = (id: string | number): Promise<PokemonTypeResponse> =>
    apiFetch(`/type/${id}`).then((data: PokemonTypeResource) => ({
      id: data.id,
      name: data.name,
      doubleDamageFrom: data.damage_relations.double_damage_from.map(
        ({ name }) => name
      ),
      doubleDamageTo: data.damage_relations.double_damage_to.map(
        ({ name }) => name
      ),
      halfDamageFrom: data.damage_relations.half_damage_from.map(
        ({ name }) => name
      ),
      halfDamageTo: data.damage_relations.half_damage_to.map(
        ({ name }) => name
      ),
      noDamageFrom: data.damage_relations.no_damage_from.map(
        ({ name }) => name
      ),
      noDamageTo: data.damage_relations.no_damage_to.map(({ name }) => name),
    }));

  // Get all generations
  useEffect(() => {
    setIsLoading(true);

    apiFetch(`/generation`).then((data: APIResource) => {
      Promise.all(
        data.results.map((_, i) =>
          apiFetch(`/generation/${i + 1}`).then((gen: GenerationResource) => ({
            id: gen.id,
            name: gen.main_region.name,
            versions: gen.version_groups.map(({ name }) =>
              capitalise(
                name
                  .split("-")
                  .map((str) => capitalise(str))
                  .join("/")
              )
            ),
            pokemon: gen.pokemon_species
              .sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url))
              .map(({ name, url }) => ({
                name: name,
                id: getIdFromUrl(url),
              })),
          }))
        )
      ).then((data) => {
        setGenerations(data);
        setCurrentGen(data[0]);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <ApiContext.Provider
      value={{
        generations,
        isLoading,
        currentGen,
        setCurrentGen,
        getSpecies,
        getForm,
        getPokemon,
        getAbility,
        getType,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export { useApi, ApiProvider };
