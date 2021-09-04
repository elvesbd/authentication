import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserRegisterDto } from './dto/create-register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Post('register')
  async registerUser(@Body() createUserRegisterDto: CreateUserRegisterDto) {
    return this.usersService.registerUser(createUserRegisterDto);
  }
}
