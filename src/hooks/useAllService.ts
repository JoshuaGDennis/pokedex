import { apiFetch } from "helpers/api"
import { useEffect, useState } from 'react'
import { getIdFromUrl } from 'helpers/strings'
import { Service, API_Response } from 'helpers/types'

const useAllService = (name: 'pokemon' | 'generation') => {
    const [result, setResult] = useState<Service<{id: number, name: string}[]>>({
        status: 'loading'
    })

    const url = name === 'pokemon' ? '/pokemon?limit=9999' : '/generation'
    
    useEffect(() => {
        apiFetch(url)
            .then((response: API_Response) => {
                setResult({
                    status: 'loaded',
                    payload: response.results.map(res => ({
                        id: getIdFromUrl(res.url),
                        name: res.name
                    }))
                })
            })
            .catch(error => setResult({ status: 'error' , error }))
    }, [url])

    return result
}

export default useAllService