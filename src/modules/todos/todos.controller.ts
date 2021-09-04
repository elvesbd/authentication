import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoEntity } from 'src/db/entities/TodoEntity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get(':id')
  async getAllTodosByUserId(
    @Param('id') userId: number,
  ): Promise<TodoEntity[]> {
    return await this.todosService.getAllTodosByUserId(userId);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async addNewTodo(@Body() createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await this.todosService.addNewTodo(createTodoDto);
    return newTodo;
  }
}
