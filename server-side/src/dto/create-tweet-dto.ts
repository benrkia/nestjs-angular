import { IUser } from "src/interfaces/user.interface";

export class CreateTweetDto {

    readonly id: number;
    readonly title: string;
    readonly content: string;
    readonly creationDate: Date;
    readonly user: IUser;
    readonly likes: IUser[];

}