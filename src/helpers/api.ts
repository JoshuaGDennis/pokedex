import { FlavorTextEntry, GenerationResource, GenerationResponse, SpeciesResource, SpeciesResponse } from "types"

const POKE_API = 'https://pokeapi.co/api/v2'

const getIdFromUrl = (url: string): number => {
    const result = new RegExp(/[/](\d+)/g).exec(url)

    return (result && result.length === 2) ? +result[1] : 0
}

const getEnglishFlavorText = (entries: FlavorTextEntry[]): string => {
    const found = entries.find(({ language }) => language.name === 'en')
    return found ? found.flavor_text : ''
}

const getGeneration = (id: string | number): Promise<GenerationResponse> => 
    fetch(`${POKE_API}/generation/${id}`)
        .then(res => res.json())
        .then((data: GenerationResource) =>  ({
                id: data.id,
                name: data.main_region.name,
                versions: data.version_groups.map(({ name }) => name),
                pokemon: data.pokemon_species
                    .sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url))
                    .map(({ name }) => name)
            }))

const getSpecies = (id: string | number): Promise<SpeciesResponse> => 
    fetch(`${POKE_API}/pokemon-species/${id}`)
        .then(res => res.json())
        .then((data: SpeciesResource) => ({
                id: data.id,
                name: data.name,
                color: data.color.name,
                evolution: data.evolution_chain.url,
                description: getEnglishFlavorText(data.flavor_text_entries),
                isLegendary: data.is_legendary,
                isMythical: data.is_mythical
            }))

export { getGeneration, getSpecies }