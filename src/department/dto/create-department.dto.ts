import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  label: string;
}
