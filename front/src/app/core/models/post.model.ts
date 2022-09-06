import { Commentaire } from "./commentaire.model";

export class Post {
    _id!: string;
    name!: string;
    description?: string;
    likes!: number;
    imageURL!: string;
    date!: Date;
    com!: Commentaire[];
    userId!: string;
    usersLiked?: string[];
}