import { ITweet } from "src/interfaces/tweet.interface";

export class CreateUserDto {

    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly avatar: string;
    readonly tweets: ITweet[];
    readonly likedTweets: ITweet[];

}