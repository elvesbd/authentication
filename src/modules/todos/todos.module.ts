import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from 'src/db/entities/TodoEntity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
