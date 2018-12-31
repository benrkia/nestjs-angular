import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(user: IUser) {
    const userPayload: JwtPayload = { id: user.id };
    const accessToken = await this.jwtService.sign(userPayload);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(req): Promise<any> {
    let token = req.split(' ')[1];
    if(token === undefined){
      return {answer:false, content:null};
    }
    let payload = null;
    try {
      payload = await this.jwtService.verify(token);
    }catch(e){}
    if(!payload){
      return {answer:false, content:null};
    }
    return {answer:true, content:payload.id};

  }
}