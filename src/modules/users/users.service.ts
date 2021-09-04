import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/UserEntity';
import { EncryptUtils } from 'src/shared/utils/encrypt.util';
import { Repository } from 'typeorm';
import { CreateUserRegisterDto } from './dto/create-register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async registerUser(
    createUserRegisterDto: CreateUserRegisterDto,
  ): Promise<Partial<UserEntity>> {
    createUserRegisterDto.password = await EncryptUtils.hashPassword(
      createUserRegisterDto.password,
    );

    const newUser = await this.usersRepository.save(createUserRegisterDto);
    const { password, ...user } = newUser;
    return user;
  }
}
