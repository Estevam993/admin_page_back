import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  // São as propriedades do meu usuario
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  status: string;

  @IsString()
  @MinLength(6)
  password: string;
}
