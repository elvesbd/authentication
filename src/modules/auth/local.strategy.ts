import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { AuthInterface } from './interface/auth.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(userName: string, password: string): Promise<AuthInterface> {
    const user = await this.authService.validateUser(userName, password);

    if (!user) {
      throw new UnprocessableEntityException();
    }
    return user;
  }
}
