import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { EncryptUtils } from 'src/shared/utils/encrypt.util';
import { UsersService } from '../users/users.service';
import { AuthInterface } from './interface/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<AuthInterface> {
    const user = await this.usersService.findUserByEmail(email);

    if (user && (await EncryptUtils.verifyPassword(password, user.password))) {
      const { password, ...userData } = user;
      return userData;
    } else {
      throw new UnprocessableEntityException('Email ou senha inválidos');
    }
  }
}
