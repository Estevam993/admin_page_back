import {
    IsString,
    IsEmail,
    MinLength,
    IsOptional,
    IsNumber,
} from "class-validator";
import { HasMany } from "sequelize-typescript";
import { Employee } from "../../employee/entities/employee.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    // São as propriedades do meu usuario
    @ApiProperty({ example: "teste" })
    @IsString()
    name: string;

    @ApiProperty({ example: "teste@teste.com" })
    @IsEmail()
    email: string;

    @IsString()
    status: string;

    @IsNumber()
    role: number;

    @ApiProperty({ example: "teste1234" })
    @IsString()
    @MinLength(6)
    password: string;

    @HasMany(() => Employee)
    employees: Employee[];
}
