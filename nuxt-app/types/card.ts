import { user } from "./user";

// A comment on a certain post
export interface Comment {
  id: number;
  user: user;
  likes: number;
  content: string;
}

// A card can be a blogpost, poll, photos etc.
export interface Card {
  id: string;
  header: string;
  datePosted: string;
  content?: string;
  images?: string[];
  image: string;
  postedBy: user;
  comments: Comment[];
  likes: number;
  categories: string[];
}
