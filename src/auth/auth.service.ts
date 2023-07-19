import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { Campaign, User } from '@prisma/client';

@Injectable()
@Dependencies(UsersService, JwtService)
export class AuthService {
  usersService: UsersService;
  jwtService: JwtService;

  constructor(usersService: UsersService, jwtService: JwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    if (user.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET, // Make sure to use the correct environment variable
      }),
      user: {
        email: user.email,
        userId: user.id,
        name: user.name,
        campaign: user.campaign,
      },
    };
  }

  async getUserByToken(access_token: string) {
    try {
      console.log('access_token:', access_token);

      const decoded = await this.jwtService.verifyAsync(access_token, {
        secret: process.env.JWT_SECRET, // Make sure to use the correct environment variable
      });
      console.log('decoded:', decoded);

      const user = (await this.usersService.findOne(decoded.sub)) as User & {
        campaign: Campaign;
      };
      console.log('user:', user);

      if (!user) {
        console.log('user', user);
        throw new UnauthorizedException();
      }

      return {
        user: {
          email: user.email,
          userId: user.id,
          name: user.name,
          campaign: user.campaign,
        },
      };
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException();
    }
  }
}
