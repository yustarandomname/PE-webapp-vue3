export const dateISOString = (date?: Date) => {
  return date ? date.toISOString() : new Date().toISOString();
};
