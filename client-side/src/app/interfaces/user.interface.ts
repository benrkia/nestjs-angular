import { ITweet } from './tweet.interface';

export interface IUser {

    id: number;
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    tweets: ITweet[];
    likedTweets: ITweet[];

}
