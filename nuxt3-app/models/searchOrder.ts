interface Item<T> {
  description: string;
  type: string;
  keys?: string[];
  append?: string;
  entries?: T[];
  distictEntries?: { [key: string]: number };
  distinctEntySize?: number;
}

export type SearchItem<T> = {
  [key in keyof Partial<T>]: Item<T>;
};
