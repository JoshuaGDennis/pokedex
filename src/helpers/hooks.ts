import * as React from 'react'
import * as Context from 'context'
import * as API from 'helpers/api'

const { getAllPokemon } = API
const { ApiContext } = Context
const { useContext, useEffect, useState } = React

export const useGeneration = () => useContext(ApiContext) as Context.iGenerationContext;

export const useSearch = (searchValue: string) => {
  const [matches, setMatches] = useState<{id: number, name: string}[]>([]) 
  const [allPokemon, setAllPokemon] = useState<{id: number, name: string}[]>([])

  useEffect(() => {
    getAllPokemon().then(setAllPokemon)
  }, [])

  useEffect(() => {
    if(!!allPokemon.length) {
      setMatches(allPokemon.filter(({ name }) => name.indexOf(searchValue) > -1 && name.indexOf('-') === -1))
    }
  }, [allPokemon, searchValue])

  return matches
}

export const useVisibility = (ref: React.RefObject<HTMLDivElement>, options?: {fn?: () => any, once?: boolean}) => {
    const [inView, setInView] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio === 1) {
            setInView(true);
            options && options.fn && options.fn()
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1.0,
        }
      );
  
      if (ref.current) {
        if(!inView) {
          observer.observe(ref.current);
        } else {
          if (options && options.once) {
            observer.disconnect()
          }
        }
      }
    }, [ref, options, inView]);
  
    return inView;
  };
  

