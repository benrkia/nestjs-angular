import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/users/user.entity";
import { ITweet } from "src/interfaces/tweet.interface";

@Entity()
export class Tweet implements ITweet {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    title: string;

    @Column("text")
    content: string;

    @Column("datetime")
    creationDate: Date;

    @ManyToOne(type => User, user => user.tweets)
    user: User;

    @ManyToMany(type => User, user => user.likedTweets)
    likes: User[];

}
