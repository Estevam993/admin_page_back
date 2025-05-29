import { IsString, IsEmail, MinLength, IsNumber } from "class-validator";
import { HasMany } from "sequelize-typescript";
import { Employee } from "../../employee/entities/employee.entity";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    status: string;

    @IsNumber()
    role: number;

    @IsString()
    @MinLength(6)
    password: string;

    @HasMany(() => Employee)
    employees: Employee[];
}
