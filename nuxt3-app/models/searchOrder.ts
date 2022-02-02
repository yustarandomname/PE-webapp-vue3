/**
 * @Key string
 * @Type 'string' | 'number' | 'boolean' | 'date'
 * @Description (optional) string
 * @Entries (optional) array
 * @Size (optional) number
 * @Append (optional) string
 */
export interface SearchOrder<T> {
  key: keyof T;
  type: 'string' | 'number' | 'date' | 'boolean';
  description?: string;
  entries?: T[];
  size?: number;
  append?: string;
}
