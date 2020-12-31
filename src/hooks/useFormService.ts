import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { Service, Form, Form_Raw } from 'helpers/types'

const useFormService = (id: number) => {
    const [result, setResult] = useState<Service<Form>>({
        status: 'loading'
    })

    useEffect(() => {
        apiFetch(`/pokemon-form/${id}`)
            .then((response: Form_Raw) => {
                setResult({
                    status: 'loaded',
                    payload: {
                        id: response.id,
                        name: response.name,
                        image: response.sprites.front_default,
                    }
                })
            })
            .catch(error => setResult({ status: 'error', error }))
    }, [id])

    return result
}

export default useFormService
