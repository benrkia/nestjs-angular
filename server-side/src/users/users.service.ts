import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as faker from 'faker'

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async add(user: IUser): Promise<IUser> {
        user.avatar = faker.internet.avatar;
        const nUser = await this.userRepository.save(user);
        return nUser;
    }

    async getUser(email:string, password:string): Promise<IUser> {
        return await this.userRepository.findOne({email: email, password: password}, { relations: ["tweets", "likedTweets"] });
    }

    async getAll(): Promise<IUser[]> {
        return await this.userRepository.find({ relations: ["tweets", "likedTweets"] });
    }

    async getOne(id: number): Promise<IUser> {
        return await this.userRepository.findOne(Number(id), { relations: ["tweets", "likedTweets"] });
    }

    async update(id: number, nUser: IUser): Promise<void> {
        const user = await this.getOne(id);
        user.firstName = nUser.firstName;
        user.lastName = nUser.lastName;
        user.password = nUser.password;
        await this.userRepository.save(user);
    }

    async delete(id: number): Promise<void> {
        const user = await this.getOne(id);
        await this.userRepository.remove(user);
    }

}
