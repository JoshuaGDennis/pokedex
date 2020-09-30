import { ResourceList } from "helpers/types";

const BASE_URL = "https://pokeapi.co/api/v2";

const getGenerations = (): Promise<ResourceList> =>
  fetch(`${BASE_URL}/generation`).then((res) => res.json());

export { getGenerations };
