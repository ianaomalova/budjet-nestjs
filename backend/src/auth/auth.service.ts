import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/types/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    let passIsMatch = false;
    if (user) {
      passIsMatch = await argon2.verify(user.password, password);
    }

    if (user && passIsMatch) {
      return user;
    }

    throw new UnauthorizedException('User or password is incorrect');
  }

  async login(user: IUser) {
    console.log(user);
    const { id, email } = user;
    const payload = { email: user.email, id: user.id };
    return {
      id,
      email,
      access_token: this.jwtService.sign(payload),
    };
  }
}
