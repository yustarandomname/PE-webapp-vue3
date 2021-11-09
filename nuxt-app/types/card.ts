import { User } from "./user";

// A comment on a certain post
export interface Comment {
  id: number;
  user: User;
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
  postedBy: User;
  comments: Comment[];
  categories: string[];
}
