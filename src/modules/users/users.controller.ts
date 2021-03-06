import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRegisterDto } from './dto/create-register-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() createUserRegisterDto: CreateUserRegisterDto) {
    return this.usersService.registerUser(createUserRegisterDto);
  }
}
