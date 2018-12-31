import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable, Unique } from "typeorm";
import { Tweet } from "src/tweets/tweet.entity";
import { IUser } from "src/interfaces/user.interface";

@Entity()
export class User implements IUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    firstName: string;

    @Column({ length: 20 })
    lastName: string;

    @Column({ length: 50 , unique: true})
    email: string;
    
    @Column("text", {select:false})
    password: string;

    @Column("text")
    avatar: string;

    @OneToMany(type => Tweet, tweet => tweet.user)
    tweets: Tweet[];

    @ManyToMany(type => Tweet, tweet => tweet.likes)
    @JoinTable()
    likedTweets: Tweet[];

}
