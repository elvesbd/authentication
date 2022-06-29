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
    const TokenEntity = await this.tokensRepository.findOne({ email });

    if (TokenEntity) {
      this.tokensRepository.update(TokenEntity.id, { token });
    } else {
      this.tokensRepository.insert({ token, email });
    }
  }

  async refreshToken(oldToken: string): Promise<any> {
    const tokenEntity = await this.tokensRepository.findOne({
      token: oldToken,
    });

    if (tokenEntity) {
      const user = await this.usersService.findUserByEmail(tokenEntity.email);
      return this.authService.login(user);
    }
    throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
  }
}
