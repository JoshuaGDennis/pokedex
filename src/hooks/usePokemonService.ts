import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { Service, Pokemon, Pokemon_Raw } from 'helpers/types'

const usePokemonService = (id: number | string) => {
    const [result, setResult] = useState<Service<Pokemon>>({
        status: 'loading'
    })

    useEffect(() => {
        apiFetch(`/pokemon/${id}`)
            .then((response: Pokemon_Raw) => {
                setResult({
                    status: 'loaded',
                    payload: {
                        id: response.id,
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
            .catch(error => setResult({ status: 'error', error }))
    }, [id])

    return result
}

export default usePokemonService


