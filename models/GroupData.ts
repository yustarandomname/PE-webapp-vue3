import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder';
import { Post, Query } from './Post';

export interface GroupDataInterface {
  id?: string;
  old_id: number;
  name: string;
  group_type: string;
  bio: string;
  email: string;
  created_at: string;
  last_activity: string;
  created_year: number;
  subtype_id?: number;
  has_photo: boolean;
}

export class GroupData implements GroupDataInterface {
  id?: string;
  old_id: number;
  name: string;
  group_type: string;
  bio: string;
  email: string;
  created_at: string;
  last_activity: string;
  created_year: number;
  subtype_id?: number;
  has_photo: boolean;

  endpoint: SupabaseQueryBuilder<GroupDataInterface>;

  constructor(group: GroupDataInterface) {
    this.id = group.id;
    this.old_id = group.old_id;
    this.name = group.name;
    this.group_type = group.group_type;
    this.bio = group.bio;
    this.email = group.email;
    this.created_at = group.created_at;
    this.last_activity = group.last_activity;
    this.created_year = group.created_year;
    this.subtype_id = group.subtype_id;
    this.has_photo = group.has_photo;

    this.endpoint = GroupData.getEndpoint();
  }

  static getEndpoint(): SupabaseQueryBuilder<GroupDataInterface> {
    return useSupabase().from<GroupDataInterface>('Groups');
  }

  static async getGroupById(groupId: string): Promise<GroupData> {
    if (!groupId) return null;
    const { data } = await this.getEndpoint()
      .select('*')
      .eq('id', groupId)
      .single();

    return new GroupData(data);
  }

  static async getGroupsByUserId(userId: string): Promise<GroupData[]> {
    if (!userId) return null;

    const { data: groupMemberData, error: groupMemberError } =
      await useSupabase()
        .from<GroupMemberInterface>('Group_members')
        .select('group_id')
        .eq('user_id', userId);

    if (groupMemberError || groupMemberData.length == 0) return null;

    const groupIds = groupMemberData.map((groupMember) => groupMember.group_id);

    const { data, error } = await this.getEndpoint()
      .select('*')
      .in('id', groupIds);
    if (error) return null;
    return data.map((group) => new GroupData(group));
  }

  /**
   * Get profile picture of group
   * @returns {Promise<GroupData>}
   */
  async getProfileImage(): Promise<string> {
    if (!this.id) return null;
    const storage = useStorage();
    const { signedURL, error } = await storage
      .from('profile')
      .createSignedUrl('commissies/' + this.id + '/profile', 60);

    if (error) {
      console.log(error);
      return null;
    }
    return signedURL;
  }

  async getLastPosts(amount: number = 3) {
    const query: Query = (q) => q.eq('group_author', this.id).limit(amount);
    return await Post.fetchAll(query);
  }

  /**
   * Get selected data of group with labels
   * @returns {{ label: string; value: string }[]}
   */
  getGroupInfo() {
    const groupInfo: { label: string; value: string }[] = [];

    groupInfo.push({ label: 'Bio', value: this.bio });

    return groupInfo;
  }

  /**
   * Get all members of group
   * @returns {Promise<UserData[]>}
   */
  getMembers(): Promise<GroupMember[]> {
    if (!this.id) return null;
    return GroupMember.getMembersByGroupId(this.id);
  }
}

export interface GroupMemberInterface {
  id?: number;
  member_since: string;
  user_id: string;
  group_id: string;
  functie: string;
  is_former_member: boolean;
  is_admin: boolean;
}

export class GroupMember implements GroupMemberInterface {
  id?: number;
  member_since: string;
  user_id: string;
  group_id: string;
  functie: string;
  is_former_member: boolean;
  is_admin: boolean;

  constructor(member: GroupMemberInterface) {
    this.id = member.id;
    this.member_since = member.member_since;
    this.user_id = member.user_id;
    this.group_id = member.group_id;
    this.functie = member.functie;
    this.is_former_member = member.is_former_member;
    this.is_admin = member.is_admin;
  }

  static getEndpoint(): SupabaseQueryBuilder<GroupMember> {
    return useSupabase().from<GroupMember>('Group_members');
  }

  // Get all members of a group
  // @returns Promise<GroupMember[]>
  static async getMembersByUserId(userId: string): Promise<GroupMember[]> {
    if (!userId) return null;
    const { data, error } = await this.getEndpoint()
      .select('*')
      .eq('user_id', userId);
    if (error) return null;

    return data.map((member) => new GroupMember(member));
  }

  // Get all members of a group
  // @returns Promise<GroupMember[]>
  static async getMembersByGroupId(groupId: string): Promise<GroupMember[]> {
    if (!groupId) return null;
    const { data, error } = await this.getEndpoint()
      .select('*')
      .eq('group_id', groupId);
    if (error) return null;

    return data.map((member) => new GroupMember(member));
  }
}
