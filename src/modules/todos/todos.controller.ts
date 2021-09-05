import { Request, UseGuards } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodoEntity } from 'src/db/entities/TodoEntity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllTodosByUserId(@Request() req: any): Promise<TodoEntity[]> {
    const todos = await this.todosService.getAllTodosByUserId(req.user.id);
    return todos;
  }

  @Post()
  async addNewTodo(@Body() createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await this.todosService.addNewTodo(createTodoDto);
    return newTodo;
  }
}
