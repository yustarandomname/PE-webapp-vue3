import type { NuxtApp } from '#app';
import type { Card } from './../types/card';

export const loadBlogs = async (nuxtApp: NuxtApp): Promise<Card[]> => {
  const { data } = await nuxtApp.$httpClient('v1/news/items');

  if (data.status == 'ok') {
    return data.data as Card[];
  }

  return [];
};

export const loadBlog = async (
  nuxtApp: NuxtApp,
  id: number
): Promise<Card | undefined> => {
  const { data } = await nuxtApp.$httpClient(`v1/news/items/${id}`);

  console.log(data);

  if (data.status == 'ok') {
    return data.data as Card;
  }

  return;
};
