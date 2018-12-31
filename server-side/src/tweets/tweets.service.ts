import { Injectable } from '@nestjs/common';
import { ITweet } from 'src/interfaces/tweet.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Tweet } from './tweet.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetsService {
    
    constructor(
        @InjectRepository(Tweet)
        private readonly tweetRepository: Repository<Tweet>,
        private readonly usersService: UsersService
    ) {}

    async add(tweet: ITweet): Promise<void> {
        await this.tweetRepository.save(tweet);
    }

    async getAll(): Promise<ITweet[]> {
        const tweets = await this.tweetRepository.find({ relations: ["user", "likes"] });
        return tweets;
    }

    async getOne(id: number): Promise<ITweet> {
        const tweet = await this.tweetRepository.findOne(Number(id), { relations: ["user", "likes"] });
        return tweet;
    }

    async getByUserId(user: number): Promise<Tweet[]> {
        const tweets = await this.tweetRepository.find({ where: {user: user}, relations: ["user", "likes"] });
        return tweets;
    }

    async update(id: number, nTweet: ITweet): Promise<void> {
        const tweet = await this.getOne(id);
        tweet.title = nTweet.title;
        tweet.content = nTweet.content;
        await this.tweetRepository.save(tweet);
    }

    async delete(id: number): Promise<void> {
        const tweet = await this.getOne(id);
        await this.tweetRepository.remove(tweet);
    }

    async like(id:number, userId: number) {
        const tweet = await this.getOne(id);
        const user = await this.usersService.getOne(userId);
        const index = tweet.likes.findIndex(u => u.id === user.id);
        if(index === -1)
            tweet.likes.push(user);
        else
            tweet.likes.splice(index, 1);
        await this.tweetRepository.save(tweet);
    }

}