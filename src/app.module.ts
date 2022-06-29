import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TodosModule } from './modules/todos/todos.module';
import { AuthModule } from './modules/auth/auth.module';
import * as options from './db/config/ormconfig';
import { ConfigModule } from '@nestjs/config';
import { TokensModule } from './modules/tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(options),
    UsersModule,
    TodosModule,
    AuthModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
