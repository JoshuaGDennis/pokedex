import { KeyValue } from "./types";
import { getIdFromUrl } from "./strings";

const sortListByIds = (list: KeyValue[]) =>
  list.sort((a, b) => +getIdFromUrl(a.url) - +getIdFromUrl(b.url));

export { sortListByIds };
