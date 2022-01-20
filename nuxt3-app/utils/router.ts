/**
 * Open a blog on a new route
 * @param id - blog id
 * @param callback - callback function runs after the route is changed
 */
export const openBlog = (id: number, callback?: () => void) => {
  useNuxtApp().$router.push('/blogs/?id=' + id);
  callback?.();
};
