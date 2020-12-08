import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import { GenerationResponse } from "./types";
import { getAllGenerations, getGeneration } from "./api";

interface iContext {
  isLoading: boolean;
  generations: GenerationResponse[];
  currentGen: GenerationResponse | null;
  setCurrentGen: Dispatch<React.SetStateAction<GenerationResponse | null>>;
}

interface iProvider {
  children: React.ReactNode;
}

const ApiContext = createContext<iContext | null>(null);

const useGen = () => useContext(ApiContext) as iContext;

const GenProvider: React.FC<iProvider> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [generations, setGenerations] = useState<GenerationResponse[]>([]);
  const [currentGen, setCurrentGen] = useState<GenerationResponse | null>(null);

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
