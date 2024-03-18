export const filter = <T extends object>(
  array: T[],
  keyword: string,
  key: keyof T,
  alternativeKey?: keyof T,
) => {
  console.time("filter");
  const fuzzyRegex = new RegExp(keyword.split("").join(".*"), "i");
  const startingRegex = new RegExp(`^${keyword}`, "i");
  const containsRegex = new RegExp(`${keyword}`, "i");
  const word = (item: T): string => {
    if (!alternativeKey) return item[key] as unknown as string;
    return (item[key] ?? item[alternativeKey]) as unknown as string;
  };
  const weight = (item: T) => {
    const itemString = word(item);
    if (startingRegex.test(itemString)) {
      return 1;
    }
    if (containsRegex.test(itemString)) {
      return 2;
    }
    if (fuzzyRegex.test(itemString)) {
      return 3;
    }
    return 4;
  };
  const filteredArray = array
    .filter((item) => fuzzyRegex.test(word(item)))
    // sort by weight and alphabetical order
    .sort((a, b) => {
      const weightA = weight(a);
      const weightB = weight(b);
      if (weightA === weightB) {
        return word(a).localeCompare(word(b));
      }
      return weightA - weightB;
    });
  console.timeEnd("filter");
  return filteredArray;
};
