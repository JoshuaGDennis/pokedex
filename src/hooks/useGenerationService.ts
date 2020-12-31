import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { Service, Generation, Generation_Raw } from 'helpers/types'
import { getIdFromUrl, getNames, capitalise } from 'helpers/strings'

const useGenerationService = (id: number | string) => {
    const [result, setResult] = useState<Service<Generation>>({
        status: 'loading'
    }) 
    
    useEffect(() => {
        const format = (n: string) => n.split('-').map(str => capitalise(str)).join('/')

        apiFetch(`/generation/${id}`)
            .then((response: Generation_Raw) => {
                setResult({
                    status: 'loaded',
                    payload: {
                        id: response.id,
                        name: response.main_region.name,
                        versions: getNames(response.version_groups, format),
                        pokemon: response.pokemon_species
                            .sort((a, b) => getIdFromUrl(a.url) - getIdFromUrl(b.url))
                            .map(({ name, url }) => ({
                            name: name,
                            id: getIdFromUrl(url),
                        }))
                    } 
                })
            })
    }, [id])

    return result
}

export default useGenerationService
