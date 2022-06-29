import { forwardRef, Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/db/entities/TokenEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    UsersModule,
    forwardRef(() => AuthModule),
  ],
  providers: [TokensService],
  controllers: [TokensController],
  exports: [TokensService],
})
export class TokensModule {}
