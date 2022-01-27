import { HasPhoto, PhotoMetaData } from './hasPhoto';
import { Ref } from 'vue';
import { Post } from './posts/post';
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
  userPhone: string;
  photoMetaData?: PhotoMetaData;
  groups: { [key: number]: Group };
  yearGroup: string;
  fullName: string;
  firstName: string;
  allowedCategories: {
    groups?: AllowedCategory[];
    user?: AllowedCategory[];
  };
}

export class User extends HasPhoto implements UserInterface {
  userId: number;
  userEmail: string;
  userPhone: string;
  groups: { [key: number]: Group };
  yearGroup: string;
  fullName: string;
  firstName: string;
  allowedCategories: {
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
    this.allowedCategories = user.allowedCategories;

    this.firstName = user.fullName.split(' ')[0];
    this.userPhone = '06 12345678';
    this.yearGroup = 'worstjes';
  }

  async getLastPosts(): Promise<Post[]> {
    return new Promise((resolve) => {
      return resolve([]);
    });
  }

  // Check if `id` is the same as the logged in user
  static isOwner(id?: number): boolean {
    if (!id) return false;
    const { $user } = useNuxtApp();

    return ($user as Ref<UserInterface>)?.value?.userId == id;
  }

  static getCurrentUserData() {
    const { $user } = useNuxtApp();
    if (!$user.value) return null;

    return new User($user.value);
  }

  static async getUserById(id?: string) {
    const { $user, $httpClient } = useNuxtApp();

    // TODO: add user endpoint
    // const { data } = await $httpClient(`v1/users/${id}`);
    const data = $user.value;
    return new User(data);
  }
}
