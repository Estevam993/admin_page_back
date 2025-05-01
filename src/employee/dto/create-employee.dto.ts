import { IsString, IsEmail, IsNumber } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    status: string = "ACTIVE";

    @IsNumber()
    role: number;

    @IsNumber()
    department: number;
}
