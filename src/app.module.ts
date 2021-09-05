import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { TodosModule } from './modules/todos/todos.module';
import { AuthModule } from './modules/auth/auth.module';
import * as options from './db/config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    UsersModule,
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
