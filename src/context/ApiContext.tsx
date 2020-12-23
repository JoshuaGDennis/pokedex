import * as React from 'react'
import * as API from 'helpers/api'
import * as Types from 'helpers/types'

const { getAllGenerations, getGeneration } = API
const { createContext, useEffect, useState, } = React

export interface iGenerationContext {
  isLoading: boolean;
  generations: Types.Generation[];
  currentGen: Types.Generation | null;
  setCurrentGen: React.Dispatch<React.SetStateAction<Types.Generation | null>>;
}

interface iProvider {
  children: React.ReactNode;
}

export const ApiContext = createContext<iGenerationContext | null>(null);

export const GenProvider: React.FC<iProvider> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [generations, setGenerations] = useState<Types.Generation[]>([]);
  const [currentGen, setCurrentGen] = useState<Types.Generation | null>(null);

  useEffect(() => {
    setIsLoading(true)

    getAllGenerations().then(data => {
      Promise.all(data.results.map((_, i) => getGeneration(i + 1))).then(gens => {
        setGenerations(gens)
        setCurrentGen(gens[0])
        setIsLoading(false)
      })
    })
  }, [])

  return (
    <ApiContext.Provider
      value={{
        isLoading,
        generations,
        currentGen,
        setCurrentGen
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};