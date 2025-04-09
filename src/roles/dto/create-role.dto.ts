import { IsString, IsEmail, MinLength, IsOptional, IsArray } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  label: string;

  @IsArray()
  modules: Number[];
}
