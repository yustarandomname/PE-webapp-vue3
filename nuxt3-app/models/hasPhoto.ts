import { useNuxtApp } from 'nuxt3';

export interface PhotoMetaData {
  MEDIUM: string;
  ORIGINAL: string;
}

export abstract class HasPhoto {
  photoMetaData?: PhotoMetaData;

  constructor(photoMetaData?: PhotoMetaData) {
    this.photoMetaData = photoMetaData;
  }

  getPhotoUrl(size: 'ORIGINAL' | 'MEDIUM' = 'MEDIUM'): string {
    if (!this.photoMetaData) return null;

    // TODO: fix this with real database data
    return 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
  }

  async uploadImage(image: File) {
    const { $httpClient } = useNuxtApp();
    const formData = new FormData();
    formData.append('photo', image);

    const { data } = await $httpClient('v1/upload-photo', {
      method: 'POST',
      headers: { 'content-type': 'multipart/form-data' },
      data: formData,
    });

    if (data.status == 'ok') return { id: data.data.id, hash: data.data.hash };
    return { id: null, hash: null };
  }
}
