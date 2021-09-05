import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/db/entities/TodoEntity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todosRepository: Repository<TodoEntity>,
  ) {}

  getAllTodosByUserId(userId: number): Promise<TodoEntity[]> {
    return this.todosRepository.find({ userId: userId });
  }

  addNewTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todosRepository.save(createTodoDto);
  }
}
