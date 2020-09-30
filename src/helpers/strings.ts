const captialise = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

const getIdFromUrl = (url: string): string => {
  const exp = new RegExp(/\/(\d+)\//g).exec(url);

  if (exp && exp.length >= 2) {
    return exp[1];
  }

  return "0";
};

export { captialise, getIdFromUrl };
