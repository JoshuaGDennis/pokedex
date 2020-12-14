import { 
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
    APIResource,
    GenerationResponse,
    GenerationResource,
    PokemonEvolutionResponse,
    PokemonEvolutionResource,
    EvolutionChain,
    PokemonEvolution
} from "./types"
import { capitalise, getEnglishFlavorText, getIdFromUrl, getNames } from "./strings"

const POKE_API_URL = 'https://pokeapi.co/api/v2'

const apiFetch = (url: string) => fetch(`${POKE_API_URL}${url}`).then(res => res.json())

const getPokemonSpecies = (id: string | number): Promise<SpeciesResponse> => 
    apiFetch(`/pokemon-species/${id}`).then((data: SpeciesResource) => ({
        id: data.id,
      captureRate: data.capture_rate,
      growthRate: data.growth_rate.name.replace("-", "/"),
      genera: data.genera.find((g) => g.language.name === "en")?.genus || "",
      happiness: data.base_happiness,
      name: data.name,
      color: data.color.name,
      evolutionChainId: getIdFromUrl(data.evolution_chain.url),
      description: getEnglishFlavorText(data.flavor_text_entries),
      isLegendary: data.is_legendary,
      isMythical: data.is_mythical,
    }))

const getPokemonForm = (id: string | number): Promise<PokemonFormResponse> => 
    apiFetch(`/pokemon-form/${id}`).then((data: PokemonFormResource) => ({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    }))

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
        height: data.height,
        weight: data.weight,
    }))

const getPokemonAbility = (id: string | number): Promise<PokemonAbilityResponse> =>
    apiFetch(`/ability/${id}`).then((data: PokemonAbilityResource) => {
        const effectEntry = data.effect_entries.find(e => e.language.name === "en")
        return ({
            id: data.id,
            name: data.name,
            description: getEnglishFlavorText(data.flavor_text_entries),
            effect: effectEntry ? effectEntry.effect : ''
        })
    })

const getPokemonType = (id: string | number): Promise<PokemonTypeResponse> =>
    apiFetch(`/type/${id}`).then((data: PokemonTypeResource) =>  ({
        id: data.id,
        name: data.name,
        doubleDamageFrom: getNames(data.damage_relations.double_damage_from),
        doubleDamageTo: getNames(data.damage_relations.double_damage_to),
        halfDamageFrom: getNames(data.damage_relations.half_damage_from),
        halfDamageTo: getNames(data.damage_relations.half_damage_to),
        noDamageFrom: getNames(data.damage_relations.no_damage_from),
        noDamageTo: getNames(data.damage_relations.no_damage_to)
    }));

const getPokemonEvolutions = (id: number): Promise<PokemonEvolutionResponse> => 
    apiFetch(`/evolution-chain/${id}`).then((data: PokemonEvolutionResource) => {
        const pokemon: PokemonEvolution[] = []

        const getNextEvolution = (obj: EvolutionChain) => {
            if (!obj.evolution_details.length) {
                pokemon.push({
                    name: obj.species.name,
                    trigger: '',
                    level: 1
                })
            } else {
                pokemon.push({
                    name: obj.species.name,
                    trigger: obj.evolution_details[0].trigger.name,
                    level: obj.evolution_details[0].min_level
                })
            }

            if (obj.evolves_to.length) {
                getNextEvolution(obj.evolves_to[0])
            }
        }

        getNextEvolution(data.chain)

        return {
            id: id,
            pokemon
        }
    })

const getAllGenerations = (): Promise<APIResource> =>
    apiFetch('/generation').then((data: APIResource) => data)

const getGeneration = (id: string | number): Promise<GenerationResponse> =>
    apiFetch(`/generation/${id}`).then((data: GenerationResource) => {
        const format = (n: string) => n.split('-').map(str => capitalise(str)).join('/')
        return {
            id: data.id,
            name: data.main_region.name,
            versions: getNames(data.version_groups, format),
            pokemon: data.pokemon_species
                .sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url))
                .map(({ name, url }) => ({
                name: name,
                id: getIdFromUrl(url),
                }))
        }
    })

export { getPokemonSpecies, getPokemonForm, getPokemon, getPokemonAbility, getPokemonType, getPokemonEvolutions, getAllGenerations, getGeneration }
