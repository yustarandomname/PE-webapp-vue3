import {User} from "./user"

export interface Card {
    id: string,
    header: string,
    datePosted: string,
    content: string,
    image: string,
    postedBy: User,
    categories: string[]
}