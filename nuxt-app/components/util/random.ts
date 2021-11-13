// get random string of length n
// @param len - length of string
export const randomId = (prefix: string, len: number = 9): string => {
  return prefix + "-" + Math.random().toString(36).substring(2, len);
};
