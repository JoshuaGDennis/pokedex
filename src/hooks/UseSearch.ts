import { useEffect, useState } from 'react'
import useAllService from './useAllService'

const useSearch = (searchValue: string) => {
    const allPokemon = useAllService('pokemon')

    const [matches, setMatches] = useState<{id: number, name: string}[]>([])

    useEffect(() => {
        if(allPokemon.status === 'loaded') {
            setMatches(
                allPokemon.payload
                    .filter(({ name }) => name.indexOf(searchValue) > -1 && name.indexOf('-') === 1)
            )
        } else {
            setMatches([])
        }
    }, [allPokemon, searchValue])

    return matches
}

export default useSearch