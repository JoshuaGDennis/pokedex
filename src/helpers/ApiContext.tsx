import { capitalise, getEnglishFlavorText, getIdFromUrl } from "./strings";
import React, { createContext, useContext, useEffect, useState } from "react";
import { APIResource, GenerationResource, GenerationResponse, PokemonResource, PokemonResponse, SpeciesResource, SpeciesResponse } from "./types";

interface iContext {
    generations: GenerationResponse[]
    isLoading: boolean
    getSpecies(id: string | number): Promise<SpeciesResponse>
    getPokemon(id: string | number): Promise<PokemonResponse>
}

interface iProvider {
    children: React.ReactNode
}

const ApiContext = createContext<iContext | null>(null)

const useApi = () => useContext(ApiContext) as iContext

const ApiProvider: React.FC<iProvider> = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(true)
    const [ generations, setGenerations ] = useState<GenerationResponse[]>([])

    const apiFetch = (url: string) => 
        fetch(`https://pokeapi.co/api/v2${url}`)
            .then(res => res.json())

    const getSpecies = (id: string | number): Promise<SpeciesResponse> => 
        apiFetch(`/pokemon-species/${id}`)
            .then((data: SpeciesResource) => ({
                id: data.id,
                name: data.name,
                color: data.color.name,
                evolution: data.evolution_chain.url,
                description: getEnglishFlavorText(data.flavor_text_entries),
                isLegendary: data.is_legendary,
                isMythical: data.is_mythical,
            }))

    const getPokemon = (id: string | number): Promise<PokemonResponse> => 
        apiFetch(`/pokemon/${id}`)
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
                types: data.types.map(({ type }) => type.name)
            }))

    // Get all generations
    useEffect(() => {
        setIsLoading(true)

        apiFetch(`/generation`).then((data: APIResource) => {
            Promise.all(data.results.map((_, i) => 
                apiFetch(`/generation/${i + 1}`)
                    .then((gen: GenerationResource) => ({
                    id: gen.id,
                    name: gen.main_region.name,
                    versions: gen.version_groups.map(({ name }) => capitalise(name.split('-').map(str => capitalise(str)).join("/"))),
                    pokemon: gen.pokemon_species
                        .sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url))
                        .map(({ name, url }) => ({
                            name: name,
                            id: getIdFromUrl(url)
                            })
                        ),
                    })
                ))
            ).then(data => {
                setGenerations(data)
                setIsLoading(false)
            })
        })
    }, [])

    return (
        <ApiContext.Provider value={{
            generations,
            isLoading,
            getSpecies,
            getPokemon
        }}>
            {children}
        </ApiContext.Provider>
    )
    
}

export { useApi, ApiProvider }
