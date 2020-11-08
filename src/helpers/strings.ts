const capitalise = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const formatGeneration = (str: string): string => {
  const split = str.split('-')

  if (!split.length) return str
  if (split.length === 2) return `${capitalise(split[0])} ${split[1].toUpperCase()}`
  else return str
}

const getIdFromUrl = (url: string): string => {
  const exp = new RegExp(/\/(\d+)\//g).exec(url);

  if (exp && exp.length >= 2) {
    return exp[1];
  }

  return "0";
};

const getShortStat = (stat: string): string => {
  const short: { [key: string]: string } = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    special_attack: "SP ATK",
    special_defense: "SP DEF",
    speed: "SPD",
  };

  return short[stat.replace("-", "_")] || "";
};

export { capitalise, getIdFromUrl, getShortStat, formatGeneration };
