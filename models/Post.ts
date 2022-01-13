import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import TableHeader from '@tiptap/extension-table-header';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import Underline from '@tiptap/extension-underline';

import { Comment } from './comment';
import { UserData, UserDataInterface } from './UserData';
import { nowDateString } from '~~/util/nowDateString';

import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { JSONContent } from '@tiptap/core';
import { SupabaseQueryBuilder } from '@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder';

export type Filter = PostgrestFilterBuilder<PostInterface>;
export type Query = (query: Filter) => Filter;

// New post without data
export const newEmptyBlog = (): PostInterface => {
  return {
    title: '',
    content: { type: 'doc', content: [{ type: 'paragraph' }] },
    news_type: 'blog', // todo: add enum of types
    has_banner: false,

    created_at: nowDateString(),
    updated_at: nowDateString(),
    publish_date: null,

    author_is_user: true,
    author_is_ope: false,
    user_author: useUser().value.id,
    group_author: null,

    kudos: [],

    comments_allowed: true,
  };
};

export interface PostInterface {
  id?: number;
  title: string;
  content: JSONContent;
  news_type: 'blog'; // todo: add enum of types
  has_banner: boolean;

  created_at: string;
  updated_at: string;
  publish_date?: string;

  author_is_user: boolean;
  author_is_ope: boolean;
  user_author?: UserDataInterface | string;
  group_author?: string;

  kudos: string[];

  comments_allowed: boolean;
}

export class Post implements PostInterface {
  id: number;
  title: string;
  content: JSONContent;
  news_type: 'blog'; // todo: add enum of types
  has_banner: boolean;

  created_at: string;
  updated_at: string;
  publish_date?: string;

  author_is_user: boolean;
  author_is_ope: boolean;
  user_author?: UserData | string;
  user_author_id: string;
  group_author?: string;

  kudos: string[];

  comments_allowed: boolean;

  htmlContent: string;
  endpoint: SupabaseQueryBuilder<PostInterface>;

  constructor(post: PostInterface) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.news_type = post.news_type;
    this.has_banner = post.has_banner;
    this.created_at = post.created_at;
    this.updated_at = post.updated_at;
    this.author_is_user = post.author_is_user;
    this.author_is_ope = post.author_is_ope;
    this.group_author = post.group_author;
    this.kudos = post.kudos;
    this.comments_allowed = post.comments_allowed;

    if (post.publish_date) {
      this.publish_date =
        post.publish_date[post.publish_date.length - 1] == 'Z'
          ? post.publish_date
          : post.publish_date + 'Z';
    }

    this.endpoint = useSupabase().from<PostInterface>('News_items');

    if (!post.user_author) this.user_author == null;
    else if (typeof post.user_author == 'string') {
      this.user_author = post.user_author;
      this.user_author_id = post.user_author;
    } else if (typeof post.user_author == 'object') {
      this.user_author = new UserData(post.user_author as UserDataInterface);
      this.user_author_id = post.user_author.id;
    }

    this.htmlContent = generateHTML(post.content, [
      StarterKit,
      Underline,
      Table,
      TableRow,
      TableHeader,
      TableCell,
    ]);
  }

  static getEndpoint(): SupabaseQueryBuilder<PostInterface> {
    return useSupabase().from<PostInterface>('News_items');
  }

  async bannerUrl(): Promise<string> {
    if (!this.has_banner) return;

    const storage = useStorage();
    const { signedURL, error } = await storage
      .from('blogs')
      .createSignedUrl(+this.id + '/banner', 60);

    if (error) return;
    return signedURL;
  }

  // TODO: @philmas wilde hier nog mooie formating maken
  static formatDate(date: string): string {
    if (!date || !new Date(date)) return 'Nog niet gepubliceerd';

    const now = new Date();
    const dateObj = new Date(date);
    const toString = dateObj.toDateString();

    if (dateObj > now) return 'Wordt gepubliceerd op ' + toString;
    return toString;
  }

  async isOwner(): Promise<boolean> {
    const user = useUser();
    if (!user?.value) return false;

    if (typeof this.user_author == 'object')
      return user.value.id == this.user_author.id;

    if (this.user_author_id == user.value.id) return true;

    if (this.group_author) {
      const { data, error } = await useSupabase()
        .rpc<string[]>('get_user_group_ids', { userid: user.value.id })
        .single();

      return data.includes(this.group_author);
    }

    return false;
  }

  async toggleKudo(): Promise<string[]> {
    if (!this.id) return [];

    const { data, error } = await useSupabase()
      .rpc<string[]>('toggle_kudos', { item_id: this.id })
      .single();

    if (error) return [];
    return data;
  }

  // Get all comments from this post
  async fetchComments(): Promise<Comment[]> {
    return Comment.fetchComments(this.id);
  }

  static async fetch(id: number, where: Query = null): Promise<Post> {
    let query = this.getEndpoint().select('*, user_author (*)').eq('id', id);

    if (where) query = where(query);

    const { data } = await query.single();
    if (!data) return null;
    return new Post(data);
  }

  // Fetch all posts AND IF where is defined => [where] is true
  static async fetchAll(where: Query = null): Promise<Post[]> {
    let query = this.getEndpoint()
      .select('*, user_author (*)')
      .order('created_at', { ascending: false });

    if (where) query = where(query);

    const { data } = await query;
    if (!data) return null;
    return data.map((post) => new Post(post));
  }

  // Get number of rows where [where] is true
  static async count(
    where: Query = null,
    type: 'exact' | 'estimated' | 'planned' = 'exact'
  ): Promise<number> {
    let query = this.getEndpoint().select('id', { count: 'exact' });

    if (where) query = where(query);
    const { count } = await query;
    return count;
  }

  // Fetch the next [amount] of posts where id > [from] IF where is defined => [where] is true
  static async fetchNext(
    amount: number,
    dateFrom: Date,
    where: Query = null,
    excludeIds: number[] = []
  ): Promise<Post[]> {
    let query = this.getEndpoint()
      .select('*, user_author (*)')
      .order('publish_date', { ascending: false });

    if (dateFrom) {
      dateFrom.setHours(dateFrom.getHours() + 1, dateFrom.getMinutes() + 1);
      query = query.lt('publish_date', dateFrom.toISOString());
    }

    // exclude posts that are already in the list
    const ids = '(' + excludeIds.toString() + ')'; // transforms Array([1,2,3]) => '(1,2,3)'
    if (ids.length > 0) query = query.not('id', 'in', ids);

    // modify query with where
    if (where) query = where(query);

    const { data } = await query.limit(amount);

    if (!data) return null;
    return data.map((post) => new Post(post));
  }
}
