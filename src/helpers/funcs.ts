import { getIdFromUrl } from "./strings";
import { KeyValue, FlavourText } from "./types";

const sortListByIds = (list: KeyValue[]) =>
  list.sort((a, b) => +getIdFromUrl(a.url) - +getIdFromUrl(b.url));

const getEnglishEntry = (list: FlavourText[]): string => {
  if (!list) {
    return "";
  }

  const found = list.find((item) => item.language.name === "en");

  return found ? found.flavor_text.replace(/[^a-zA-Zé. ]/g, " ") : "";
};

export { sortListByIds, getEnglishEntry };
