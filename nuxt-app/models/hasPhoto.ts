export interface PhotoMetaData {
  MEDIUM: string;
  ORIGINAL: string;
}

export abstract class HasPhoto {
  photoMetaData?: PhotoMetaData;

  constructor(photoMetaData?: PhotoMetaData) {
    this.photoMetaData = photoMetaData;
  }

  getPhotoUrl(size: 'ORIGINAL' | 'MEDIUM' = 'MEDIUM') {
    // TODO: fix this with real database data
    return 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
  }
}
