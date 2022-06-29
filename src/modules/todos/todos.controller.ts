import { ParseIntPipe } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common';
import { Body, Param, Controller, Get, Post, Patch } from '@nestjs/common';
import { TodoEntity } from 'src/db/entities/TodoEntity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTodosByUserId(@Request() req: any): Promise<TodoEntity[]> {
    const todos = await this.todosService.getAllTodosByUserId(req.user.id);
    return todos;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addNewTodo(
    @Body() todoData: Partial<TodoEntity>,
    @Request() req: any,
  ): Promise<TodoEntity> {
    todoData.userId = req.user.id;
    const newTodo = await this.todosService.addNewTodo(todoData);
    return newTodo;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTodo(
    @Param('id', ParseIntPipe) todoId: number,
    @Body() todoData: Partial<TodoEntity>,
  ): Promise<TodoEntity> {
    todoData.id = todoId;
    const updateTodo = await this.todosService.updateTodo(todoData);
    return updateTodo;
  }
}
