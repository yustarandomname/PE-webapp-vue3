import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder';
import { GroupData } from './GroupData';
import { Post, Query } from './Post';

export interface UserDataInterface {
  id: string;
  email: string;
  name_first: string;
  name_insertion: string;
  name_last: string;
  name_initials: string;
  iban?: string;
  payment_method: string;
  phonenumber: string;
  student_number: string;
  year_group: string;
  bio: string;
  has_photo: boolean;
}

export class UserData implements UserData {
  id: string;
  email: string;
  name_first: string;
  name_insertion: string;
  name_last: string;
  name_initials: string;
  iban: string;
  payment_method: string;
  phonenumber: string;
  student_number: string;
  year_group: string;
  bio: string;
  has_photo: boolean;

  fullName: string;

  constructor(user: UserDataInterface) {
    this.id = user.id;
    this.email = user.email;
    this.name_first = user.name_first;
    this.name_insertion = user.name_insertion;
    this.name_last = user.name_last;
    this.name_initials = user.name_initials;
    this.iban = user.iban;
    this.payment_method = user.payment_method;
    this.phonenumber = user.phonenumber;
    this.student_number = user.student_number;
    this.year_group = user.year_group;
    this.bio = user.bio;
    this.has_photo = user.has_photo;

    let name = this.name_first;
    name += this.name_insertion ? ` ${this.name_insertion}` : '';
    name += ' ' + this.name_last;
    this.fullName = name;
  }

  static getEndpoint(): SupabaseQueryBuilder<UserDataInterface> {
    return useSupabase().from<UserDataInterface>('User');
  }

  /**
   * Fetch user by id or the currently logged in user
   * @param id optional user id | by __default__ the currently logged in user
   * @returns {Promise<UserData>}
   */
  static async getUserById(id?: string): Promise<UserData> {
    const userid = id || useUser().value?.id;
    if (!userid) return;

    const { data } = await this.getEndpoint()
      .select('*')
      .eq('id', userid)
      .single();
    if (!data) return;

    return new UserData(data);
  }

  /**
   * Get profile picture of group
   * @returns {Promise<GroupData>}
   */
  async getProfileImage(): Promise<string> {
    if (!this.id || !this.has_photo) return null;
    const storage = useStorage();
    const { signedURL, error } = await storage
      .from('profile')
      .createSignedUrl('gebruikers/' + this.id + '/profile', 60);

    if (error) {
      console.log(error);
      return null;
    }
    return signedURL;
  }

  /**
   * Get all important user data to display in profile
   * @returns {Promise<GroupData[]>}
   */
  getUserInfo() {
    if (!this.id || !useUser().value?.id) return;
    const userInfo: { label: string; value: string }[] = [];

    userInfo.push({ label: 'Email', value: this.email });

    if (useUser().value.id == this.id) {
      userInfo.push({ label: 'Telefoon', value: this.phonenumber });
      userInfo.push({ label: 'Iban', value: this.iban });
      userInfo.push({ label: 'Betaalmethode', value: this.payment_method });
    }

    userInfo.push({ label: 'Bio', value: this.bio });

    return userInfo;
  }

  async getLastPosts(amount: number = 3) {
    const query: Query = (q) => q.eq('user_author', this.id).limit(amount);
    return await Post.fetchAll(query);
  }

  async getGroups() {
    return GroupData.getGroupsByUserId(this.id);
  }
}
