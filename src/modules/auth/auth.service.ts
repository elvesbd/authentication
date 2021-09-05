import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptUtils } from 'src/shared/utils/encrypt.util';
import { TokensService } from '../tokens/tokens.service';
import { UserInterface } from '../users/interface/user.interface';
import { UsersService } from '../users/users.service';
import { AuthInterface } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokensService: TokensService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthInterface> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && (await EncryptUtils.verifyPassword(password, user.password))) {
      const { password, ...userData } = user;
      return userData;
    } else {
      throw new UnprocessableEntityException('Email ou senha inválidos');
    }
  }

  async login(userData: UserInterface): Promise<any> {
    const payload = {
      email: userData.email,
      name: userData.name,
      sub: userData.id,
    };
    const token = this.jwtService.sign(payload);
    this.tokensService.saveToken(token, userData.email);
    return {
      name: userData.name,
      access_token: token,
    };
  }
}
