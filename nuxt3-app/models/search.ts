export interface Item<T> {
  description: string;
  type: string;
  keys?: string[];
  append?: string;
  entries?: T[];
  distictEntries?: { [key: string]: number };
  sortedDistintEntries?: { key: string; count: number }[];
  distinctEntySize?: number;
  name?: string;
}

export type SearchItem<T> = {
  [key in keyof Partial<T>]: Item<T>;
};

export const filterItems = (
  item: string | number | boolean,
  searchQuery: string
) => {
  const x = (item || '').toString().toLowerCase();
  return x.includes(searchQuery.toLowerCase());
};

export const setKeyAsValue = (key: string, value: Item<any>) =>
  (value.name = key);

export const findEntries = (
  key: string,
  value: Item<any>,
  data: object[],
  searchQuery: string
) => {
  value.entries = data.filter((item) => {
    if (value.type != 'object') return filterItems(item[key], searchQuery);

    const objectFilter = value.keys.filter((k) =>
      filterItems(item[key][k], searchQuery)
    );
    return objectFilter.length > 0;
  });
};

export const findDistinctValues = (key: string, value: Item<any>) => {
  value.distictEntries = {};

  value.entries.forEach((entry) => {
    const k = value.type != 'object' ? entry[key] : entry[key][value.keys[0]];

    if (value.distictEntries[k]) value.distictEntries[k]++;
    else value.distictEntries[k] = 1;
  });

  value.sortedDistintEntries = Object.entries(value.distictEntries)
    .sort((a, b) => b[1] - a[1])
    .map((a) => {
      return { key: a[0], count: a[1] };
    });

  value.distinctEntySize = Object.keys(value.distictEntries).length;
};

export const getDescription = (
  description: object | string | number,
  keys: string[]
) => {
  if (typeof description === 'string') {
    return description;
  }
  const result = keys.reduce((acc, key) => {
    if (description[key]) {
      return `${acc} ${description[key]}`;
    }
    return acc;
  }, '');
  return result;
};

export const sortedSuggestions = (
  searchItems: SearchItem<any>,
  maxSuggestions: number
): Item<any>[] => {
  let sortedSuggestions = Object.values(searchItems);
  sortedSuggestions = sortedSuggestions.filter((s) => s.distinctEntySize);
  sortedSuggestions = sortedSuggestions.sort(
    (a, b) => b.distinctEntySize - a.distinctEntySize
  );

  limitSearchItems(sortedSuggestions, maxSuggestions);

  return sortedSuggestions;
};

export const limitSearchItems = (
  sortedSuggestions: Item<any>[],
  maxSuggestions: number
) => {
  const totalDistictValues = sortedSuggestions.reduce(
    (acc, cur) => acc + cur.distinctEntySize,
    0
  );

  if (totalDistictValues > maxSuggestions) {
    const suggestionCount = maxSuggestions / totalDistictValues;
    sortedSuggestions.forEach((suggestion) => {
      suggestion.sortedDistintEntries.length = Math.round(
        suggestion.distinctEntySize * suggestionCount
      );
    });
  }
};
