import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { Service, Pokemon, Pokemon_Raw } from 'helpers/types'
import { useGenerationContext } from "context/GenerationContext"

const usePokemonService = (id: number | string, enabled: boolean = true) => {
    const generations = useGenerationContext()
    
    const [result, setResult] = useState<Service<Pokemon>>({
        status: 'loading'
    })

    useEffect(() => {
        if(enabled && generations.status === 'loaded') {
            setResult({ status: 'loading' })
            
            apiFetch(`/pokemon/${id}`)
                .then((response: Pokemon_Raw) => {
                    const currentGenLength = generations.current.pokemon.length
                    
                    setResult({
                        status: 'loaded',
                        payload: {
                            id: response.id,
                            nextID: (response.id === currentGenLength) ? 1 : response.id + 1,
                            previousID: (response.id === 1) ? currentGenLength : response.id - 1,
                            abilities: response.abilities.map(({ ability }) => ability.name),
                            exp: response.base_experience,
                            name: response.name,
                            moves: response.moves.map(({ move }) => move.name),
                            sprite: response.sprites.front_default,
                            image: response.sprites.other["official-artwork"].front_default,
                            stats: response.stats.map((item) => ({
                                name: item.stat.name,
                                value: item.base_stat,
                            })),
                            types: response.types.map(({ type }) => type.name),
                            height: response.height,
                            weight: response.weight, 
                        }
                    })
                })
                .catch(error => {
                    setResult({ status: 'error', error })
                })
        }
    }, [enabled, generations, id])

    return result
}

export default usePokemonService


