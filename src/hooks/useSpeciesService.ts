import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { Service, Species, Species_Raw } from 'helpers/types'
import { getIdFromUrl, getEnglishFlavorText } from 'helpers/strings'

const useSpeciesService = (id: number, enabled: boolean = true) => {
    const [result, setResult] = useState<Service<Species>>({
        status: 'loading'
    })

    useEffect(() => {
        if(enabled) {
            setResult({ status: 'loading' })
            apiFetch(`/pokemon-species/${id}`)
                .then((response: Species_Raw) => {
                    setResult({
                        status: 'loaded',
                        payload: {
                            id: response.id,
                            captureRate: response.capture_rate,
                            growthRate: response.growth_rate.name.replace("-", "/"),
                            genera: response.genera.find((g) => g.language.name === "en")?.genus || "",
                            happiness: response.base_happiness,
                            name: response.name,
                            color: response.color.name,
                            evolutionChainId: getIdFromUrl(response.evolution_chain.url),
                            description: getEnglishFlavorText(response.flavor_text_entries).replace(/[^a-zA-Z0-9. :]/gm, " "),
                            isLegendary: response.is_legendary,
                            isMythical: response.is_mythical,
                        }
                    })
                })
                .catch(error => setResult({ status: 'error', error }))
        }
    }, [id, enabled])

    return result
}

export default useSpeciesService
