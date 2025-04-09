import { IsString } from 'class-validator';

export class CreateModuleDto {
  @IsString()
  name: string;

  @IsString()
  path: string;

  @IsString()
  icon: string;
}
