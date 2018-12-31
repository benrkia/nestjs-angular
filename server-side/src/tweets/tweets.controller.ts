import { Controller, Get, Put, Param, Body, Post, Delete, Header, HttpStatus, Res, Req } from '@nestjs/common';
import { TweetsService } from './tweets.service';
import { CreateTweetDto } from 'src/dto/create-tweet-dto';
import { ITweet } from 'src/interfaces/tweet.interface';
import { identity } from 'rxjs';
import { Tweet } from './tweet.entity';
import { AuthService } from 'src/auth/auth.service';

@Controller('tweets')
export class TweetsController {
    
    constructor(private readonly tweetsService: TweetsService, private readonly authService: AuthService) {}

    @Post()
    create(@Body() createTweetDto: CreateTweetDto) {
        this.tweetsService.add(createTweetDto);
    }

    @Post('like')
    async like(@Body('tweet') tweet: number, @Body('user') user: number, @Req() req, @Res() res) {
        if(!req.headers.authorization){
            return res.status(HttpStatus.UNAUTHORIZED).send(null); 
        }
        const accessToken = await this.authService.validateUser(req.headers.authorization);
        if(accessToken.answer == false){
            return res.status(HttpStatus.UNAUTHORIZED).send(null);
        }
        await this.tweetsService.like(tweet, user);
        return res.status(HttpStatus.OK).send();
    }

    @Get()
    async getAll() {
        return await this.tweetsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id) {
        return this.tweetsService.getOne(id);
    }

    @Get('user/:id')
    getByUserId(@Param('id') id) {
        return this.tweetsService.getByUserId(id);
    }

    @Put(':id')
    update(@Param('id') id, @Body() createTweetDto: CreateTweetDto): void {
        this.tweetsService.update(id, createTweetDto);
    }

    @Delete(':id')
    delete(@Param('id') id) {
        this.tweetsService.delete(id);
    }

}
