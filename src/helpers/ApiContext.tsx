import * as React from 'react'
import * as helpers from 'helpers'

const { getAllGenerations, getGeneration } = helpers
const { createContext, useContext, useEffect, useState, } = React

interface iContext {
  isLoading: boolean;
  generations: helpers.GenerationResponse[];
  currentGen: helpers.GenerationResponse | null;
  setCurrentGen: React.Dispatch<React.SetStateAction<helpers.GenerationResponse | null>>;
}

interface iProvider {
  children: React.ReactNode;
}

const ApiContext = createContext<iContext | null>(null);

const useGen = () => useContext(ApiContext) as iContext;

const GenProvider: React.FC<iProvider> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [generations, setGenerations] = useState<helpers.GenerationResponse[]>([]);
  const [currentGen, setCurrentGen] = useState<helpers.GenerationResponse | null>(null);

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

export { useGen, GenProvider };
