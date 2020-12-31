import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { getEnglishFlavorText } from 'helpers/strings'
import { Service, Ability, Ability_Raw } from 'helpers/types'

const useAbilityService = (id: number | string) => {
    const [result, setResult] = useState<Service<Ability>>({
        status: 'loading'
    }) 

    useEffect(() => {
        apiFetch(`/ability/${id}`)
            .then((response: Ability_Raw) => {
                const effectEntry = response.effect_entries.find(effect => effect.language.name === "en")

                setResult({
                    status: 'loaded',
                    payload: {
                        id: response.id,
                        name: response.name,
                        description: getEnglishFlavorText(response.flavor_text_entries),
                        effect: effectEntry ? effectEntry.effect : ''
                    }
                })
            })
    }, [id])

    return result
}

export default useAbilityService