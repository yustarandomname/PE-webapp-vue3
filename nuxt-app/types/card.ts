import { user } from './user';

// A comment on a certain post
export interface Comment {
  id: number;
  user: user;
  likes: number;
  content: string;
}

export interface Poster {
  userId: number;
  fullName: string;
  photoMetaData: {
    MEDIUM: string;
    ORIGINAL: string;
  };
}

// A card can be a blogpost, poll, photos etc.
export interface Card {
  id: string;
  title: string;
  poster: Poster;
  content: string;
  posterType: 'user' | 'group';
  category: { id: number; name: string };
  comments: Comment[];
  likedBy: user[];
  photoMetaData: {
    MEDIUM: string;
    ORIGINAL: string;
  };
  createdAt: string;
  updatedAt: string;
}
