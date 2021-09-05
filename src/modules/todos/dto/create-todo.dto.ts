import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
