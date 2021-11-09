import {User} from "./user"

export interface Comment {
    id: number;
    user: User;
    content: string;
}

export interface Card {
    id: string,
    header: string,
    datePosted: string,
    content: string,
    image: string,
    postedBy: User,
    comments: Comment[]
    categories: string[]
}