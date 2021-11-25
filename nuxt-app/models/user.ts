import { HasPhoto, PhotoMetaData } from './hasPhoto';

export interface Group {
  groupId: number;
  groupName: string;
}

export interface AllowedCategory {
  id: number;
  name: string;
}

export interface UserInterface {
  userId: number;
  userEmail: string;
  photoMetaData: PhotoMetaData;
  groups: { [key: number]: Group };
  fullName: string;
  firstName: string;
  alowedCategories: {
    groups?: AllowedCategory[];
    user?: AllowedCategory[];
  };
}

export class User extends HasPhoto implements UserInterface {
  userId: number;
  userEmail: string;
  photoMetaData: {
    MEDIUM: string;
    ORIGINAL: string;
  };
  groups: { [key: number]: Group };
  fullName: string;
  firstName: string;
  alowedCategories: {
    groups?: AllowedCategory[];
    user?: AllowedCategory[];
  };

  constructor(user: UserInterface) {
    super(user.photoMetaData);
    this.userId = user.userId;
    this.userEmail = user.userEmail;
    this.photoMetaData = user.photoMetaData;
    this.groups = user.groups;
    this.fullName = user.fullName;
    this.alowedCategories = user.alowedCategories;

    this.firstName = user.fullName.split(' ')[0];
  }
}
