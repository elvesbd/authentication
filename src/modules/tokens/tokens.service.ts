import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/db/entities/TokenEntity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(TokenEntity)
    private readonly tokensRepository: Repository<TokenEntity>,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async saveToken(token: string, email: string): Promise<void> {
    const existingToken = await this.tokensRepository.findOne({ email });

    if (!existingToken) {
      this.tokensRepository.insert({ token, email });
    } else {
      this.tokensRepository.update(existingToken.id, { token });
    }
  }

  async refreshToken(oldToken: string): Promise<any> {
    const existingToken = await this.tokensRepository.findOne({
      token: oldToken,
    });

    if (existingToken) {
      const user = await this.usersService.findUserByEmail(existingToken.email);
      return this.authService.login(user);
    }
    throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
  }
}
