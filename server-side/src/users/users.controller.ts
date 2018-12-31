import { Controller, Get, Put, Param, Body, Post, Delete, Header, Res, HttpStatus, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dto/create-user-dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {

    constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto, @Res() res) {
        const user = await this.usersService.add(createUserDto);
        if(user === undefined)
            return res.status(HttpStatus.UNAUTHORIZED).send(null);
        else{
            const accessToken = await this.authService.createToken(user);
            return res.status(HttpStatus.OK).send({expiresIn: 3600,accessToken});
        }
    }

    @Post('login')
    async getUser(@Body('email') email, @Body('password') password, @Res() res) {
        const user = await this.usersService.getUser(email, password);
        if(user === undefined)
            return res.status(HttpStatus.UNAUTHORIZED).send(null);
        else{
            const accessToken = await this.authService.createToken(user);
            return res.status(HttpStatus.OK).send({expiresIn: 3600,accessToken});
        }
    }

    @Post('loggeduser')
    async getLoggedUser(@Req() req, @Res() res) {
        if(!req.headers.authorization){
            return res.status(HttpStatus.UNAUTHORIZED).send(null); 
        }
        const accessToken = await this.authService.validateUser(req.headers.authorization);
        if(accessToken.answer == false){
            return res.status(HttpStatus.UNAUTHORIZED).send(null);
        }
        const user = await this.usersService.getOne(accessToken.content);
        return res.status(HttpStatus.OK).send(user);
    }

    @Get()
    async getAll() {
        const users = await this.usersService.getAll();
        return users;
    }

    @Get(':id')
    async getOne(@Param('id') id) {
        const user = await this.usersService.getOne(id);
        return user;
    }

    @Put(':id')
    update(@Param('id') id, @Body() createUserDto: CreateUserDto): void {
        this.usersService.update(id, createUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id) {
        this.usersService.delete(id);
    }

}
