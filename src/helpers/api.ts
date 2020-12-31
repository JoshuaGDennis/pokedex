import * as Types from './types'
import * as Strings from './strings'

const { capitalise, getEnglishFlavorText, getIdFromUrl, getNames } = Strings

const POKE_API_URL = 'https://pokeapi.co/api/v2'

const apiFetch = (url: string) => fetch(`${POKE_API_URL}${url}`).then(res => res.json())

const getAllPokemon = (): Promise<{id: number, name: string}[]> => 
    apiFetch(`/pokemon?limit=9999`).then((data: Types.API_Response) => {
        return data.results.map(({ name, url }) => ({
            id: getIdFromUrl(url),
            name: name
        }))
    })

const getPokemonSpecies = (id: string | number): Promise<Types.Species> => 
    apiFetch(`/pokemon-species/${id}`).then((data: Types.Species_Raw) => ({
        id: data.id,
      captureRate: data.capture_rate,
      growthRate: data.growth_rate.name.replace("-", "/"),
      genera: data.genera.find((g) => g.language.name === "en")?.genus || "",
      happiness: data.base_happiness,
      name: data.name,
      color: data.color.name,
      evolutionChainId: getIdFromUrl(data.evolution_chain.url),
      description: getEnglishFlavorText(data.flavor_text_entries).replace(/[^a-zA-Z0-9. :]/gm, " "),
      isLegendary: data.is_legendary,
      isMythical: data.is_mythical,
    }))

const getPokemonForm = (id: string | number): Promise<Types.Form> => 
    apiFetch(`/pokemon-form/${id}`).then((data: Types.Form_Raw) => ({
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
    }))

const getPokemon = (id: string | number): Promise<Types.Pokemon> =>
    apiFetch(`/pokemon/${id}`).then((data: Types.Pokemon_Raw) => ({
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

const getPokemonAbility = (id: string | number): Promise<Types.Ability> =>
    apiFetch(`/ability/${id}`).then((data: Types.Ability_Raw) => {
        const effectEntry = data.effect_entries.find(e => e.language.name === "en")
        return ({
            id: data.id,
            name: data.name,
            description: getEnglishFlavorText(data.flavor_text_entries),
            effect: effectEntry ? effectEntry.effect : ''
        })
    })

const getPokemonType = (id: string | number): Promise<Types.Type> =>
    apiFetch(`/type/${id}`).then((data: Types.Type_Raw) =>  ({
        id: data.id,
        name: data.name,
        doubleDamageFrom: getNames(data.damage_relations.double_damage_from),
        doubleDamageTo: getNames(data.damage_relations.double_damage_to),
        halfDamageFrom: getNames(data.damage_relations.half_damage_from),
        halfDamageTo: getNames(data.damage_relations.half_damage_to),
        noDamageFrom: getNames(data.damage_relations.no_damage_from),
        noDamageTo: getNames(data.damage_relations.no_damage_to)
    }));

const getPokemonEvolutions = (id: number): Promise<Types.Evolution> => 
    apiFetch(`/evolution-chain/${id}`).then((data: Types.Evolution_Raw) => {
        const pokemon: Types.Evolution_Item[] = []

        const getNextEvolution = (obj: Types.Evolution_Chain) => {
            if (!obj.evolution_details.length) {
                pokemon.push({
                    id: getIdFromUrl(obj.species.url),
                    name: obj.species.name,
                    trigger: '',
                    level: 1
                })
            } else {
                pokemon.push({
                    id: getIdFromUrl(obj.species.url),
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

const getAllGenerations = (): Promise<Types.API_Response> =>
    apiFetch('/generation').then((data: Types.API_Response) => data)

const getGeneration = (id: string | number): Promise<Types.Generation> =>
    apiFetch(`/generation/${id}`).then((data: Types.Generation_Raw) => {
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

export { apiFetch, getAllPokemon, getPokemonSpecies, getPokemonForm, getPokemon, getPokemonAbility, getPokemonType, getPokemonEvolutions, getAllGenerations, getGeneration }
