import { apiFetch } from "helpers/api"
import { getNames } from 'helpers/strings'
import { useEffect, useState } from 'react'
import { Service, Type, Type_Raw } from 'helpers/types'

const useTypeService = (id: number | string) => {
    const [result, setResult] = useState<Service<Type>>({
        status: 'loading'
    })

    useEffect(() => {
        apiFetch(`/type/${id}`)
            .then((response: Type_Raw) =>  {
                setResult({
                    status: 'loaded',
                    payload: {
                        id: response.id,
                        name: response.name,
                        doubleDamageFrom: getNames(response.damage_relations.double_damage_from),
                        doubleDamageTo: getNames(response.damage_relations.double_damage_to),
                        halfDamageFrom: getNames(response.damage_relations.half_damage_from),
                        halfDamageTo: getNames(response.damage_relations.half_damage_to),
                        noDamageFrom: getNames(response.damage_relations.no_damage_from),
                        noDamageTo: getNames(response.damage_relations.no_damage_to)
                    }
                })
            });
    }, [id])

    return result
}

export default useTypeService 