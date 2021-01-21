import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { getEnglishFlavorText } from 'helpers/strings'
import { Service, Ability, Ability_Raw } from 'helpers/types'

const useAbilityService = (ids: number | number[], enabled: boolean = true) => {
    const [result, setResult] = useState<Service<Ability[]>>({
        status: 'loading'
    })

    useEffect(() => {
        if(enabled) {
            Promise.all(
                (Array.isArray(ids) ? ids : [ids])
                    .map(id => apiFetch(`/ability/${id}`)))
                        .then((items: Ability_Raw[]) => {
                            const findEffectEntry = (item: Ability_Raw) => {
                                const entry = item.effect_entries.find(effect => effect.language.name === "en")
                                return entry ? entry.effect : ''
                            }
    
                            setResult({
                                status: 'loaded',
                                payload: items.map(item => ({
                                    id: item.id,
                                    name: item.name,
                                    description: getEnglishFlavorText(item.flavor_text_entries),
                                    effect: findEffectEntry(item)
                                }))
                        })
            })
        }
    }, [ids, enabled])

    return result
}

export default useAbilityService