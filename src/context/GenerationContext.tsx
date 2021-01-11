import { apiFetch } from 'helpers/api'
import useAllService from "hooks/useAllService"
import { Generation, Generation_Raw } from "helpers/types"
import { capitalise, getIdFromUrl, getNames } from 'helpers/strings'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface iContextInit {
    status: 'init'
}

interface iContextLoading {
    status: 'loading'
}

interface iContextLoaded {
    status: 'loaded'
    generations: Generation[]
    current: Generation
    updateCurrent(id: number): void
}

interface iContextError {
    status: 'error'
    error: Error
}

interface iProps {
    children: React.ReactNode
}

type GenContext = | iContextInit | iContextLoading | iContextLoaded | iContextError

const GenerationContext = createContext<GenContext>({ status: 'loading' })

const useGenerationContext = () => useContext(GenerationContext)

const GenerationProvider: React.FC<iProps> = ({ children }) => {
    const allGenerationIDs = useAllService('generation')

    const [selectedID, setSelectedID] = useState(1)

    const [result, setResult] = useState<GenContext>({ status: 'loading' })

    useEffect(() => {
        if(allGenerationIDs.status === 'loaded') {
            Promise
                .all(allGenerationIDs.payload.map(({ id }) => apiFetch(`/generation/${id}`)))
                .then((response: Generation_Raw[]) => {
                    const format = (n: string) => n.split('-').map(str => capitalise(str)).join('/')
                    
                    const gens = response.map(data => ({
                        id: data.id,
                        name: data.main_region.name,
                        versions: getNames(data.version_groups, format),
                        pokemon: data.pokemon_species
                            .sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url))
                            .map(({ name, url }) => ({
                            name: name,
                            id: getIdFromUrl(url),
                        }))
                    }))
                    setResult({ 
                        status: 'loaded', 
                        generations: gens, 
                        current: gens[selectedID - 1], updateCurrent: (id: number) => setSelectedID(id) })
                })
        }
    }, [allGenerationIDs, selectedID])

    return (
        <GenerationContext.Provider value={result}>
            {children}
        </GenerationContext.Provider>
    )
}

export { GenerationContext, GenerationProvider, useGenerationContext }

