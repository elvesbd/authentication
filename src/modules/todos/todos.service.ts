import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/db/entities/TodoEntity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todosRepository: Repository<TodoEntity>,
  ) {}

  getAllTodosByUserId(userId: number): Promise<TodoEntity[]> {
    return this.todosRepository.find({ userId: userId });
  }

  addNewTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todosRepository.save(todo);
  }

  async updateTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    await this.todosRepository.save(todo);
    return this.todosRepository.findOne(todo.id);
  }
}
