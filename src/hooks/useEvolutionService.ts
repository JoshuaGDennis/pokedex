import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { getIdFromUrl } from 'helpers/strings'
import { Service, Evolution, Evolution_Raw, Evolution_Chain, Evolution_Item } from 'helpers/types'

const useEvolutionService = (id: number) => {
    const [result, setResult] = useState<Service<Evolution>>({
        status: 'loading'
    })

    useEffect(() => {
        const chain: Evolution_Item[] = []

        const getNextEvolution = (obj: Evolution_Chain) => {
            if (!obj.evolution_details.length) {
                chain.push({
                    id: getIdFromUrl(obj.species.url),
                    name: obj.species.name,
                    trigger: '',
                    level: 1
                })
            } else {
                chain.push({
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

        apiFetch(`/evolution-chain/${id}`)
            .then((response: Evolution_Raw) => {
                getNextEvolution(response.chain)

                setResult({
                    status: 'loaded',
                    payload: {
                        id: id,
                        pokemon: chain
                    }
                })
            })
    }, [id])

    return result
}

export default useEvolutionService
