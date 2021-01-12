import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { Service, Form, Form_Raw } from 'helpers/types'

const useFormService = (id: number, enabled: boolean = true) => {
    const [result, setResult] = useState<Service<Form>>({
        status: 'loading'
    })

    useEffect(() => {
        if(enabled) {
            setResult({ status: 'loading' })
            
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
        }
    }, [id, enabled])

    return result
}

export default useFormService
