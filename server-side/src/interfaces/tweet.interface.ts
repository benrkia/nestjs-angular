import { IUser } from "./user.interface";

export interface ITweet {

    id: number;
    title: string;
    content: string;
    creationDate: Date;
    user: IUser;
    likes: IUser[];

}
