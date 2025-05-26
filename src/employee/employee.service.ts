import { Injectable, Req } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Employee } from "./entities/employee.entity";
import { Role } from "../roles/entities/role.entity";
import { Department } from "../department/entities/department.entity";
import { User } from "../user/user.model";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee)
        private employeeRepository: typeof Employee,
    ) {}

    async create(createEmployeeDto: CreateEmployeeDto, userId) {
        const validation = await this.insertValidation(createEmployeeDto);

        if (validation.status === "error") return validation;

        try {
            createEmployeeDto.user = userId;

            const employeeResponse: Employee =
                await this.employeeRepository.create(createEmployeeDto);

            return {
                id: employeeResponse.id,
                status: "success",
                message: `Employee with name ${employeeResponse.name} updated successfully`,
            };
        } catch (e) {
            return {
                status: "error",
                message: e.message,
            };
        }
    }

    async findAll(userId: number) {
        try {
            const employees = await this.employeeRepository.findAll({
                attributes: ["id", "name", "email"],
                where: { status: "ACTIVE", user: userId },
                include: [
                    {
                        model: Role,
                        as: "roleDetails",
                        required: true,
                        attributes: ["id", "label"],
                    },
                    {
                        model: Department,
                        as: "departmentDetails",
                        required: true,
                        attributes: ["id", "label"],
                    },
                    {
                        model: User,
                        as: "userDetails",
                        required: true,
                        attributes: ["id", "name"],
                    },
                ],
            });

            return {
                status: "success",
                employees: employees,
            };
        } catch (e) {
            return {
                status: "error",
                message: e.message,
            };
        }
    }

    async findOne(id: number, userId: number) {
        try {
            const employee = await this.employeeRepository.findOne({
                attributes: ["id", "name", "email", "user"],
                where: { id, user: userId },
                include: [
                    {
                        model: Role,
                        as: "roleDetails",
                        required: true,
                        attributes: ["id", "label"],
                    },
                    {
                        model: Department,
                        as: "departmentDetails",
                        required: true,
                        attributes: ["id", "label"],
                    },
                    {
                        model: User,
                        as: "userDetails",
                        required: true,
                        attributes: ["id", "name"],
                    },
                ],
            });
            if (employee)
                return {
                    status: "success",
                    employee: employee,
                };

            return {
                status: "error",
                employee: "Employee not found",
            };
        } catch (e) {
            return {
                status: "error",
                message: e.message,
            };
        }
    }

    async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
        try {
            const success = await this.employeeRepository.update(
                updateEmployeeDto,
                { where: { id } },
            );

            if (!!success) {
                return {
                    status: "success",
                    message: `Employee with ID ${id} updated successfully`,
                };
            }
        } catch (e) {
            return {
                status: "error",
                message: e.message,
            };
        }
    }

    remove(id: number) {
        return `This action removes a #${id} employee`;
    }

    async insertValidation(employee: CreateEmployeeDto) {
        if (!this.validateName(employee.name))
            return {
                status: "error",
                message: "Invalid name",
            };

        if (!this.validateEmail(employee.email))
            return {
                status: "error",
                message: "Invalid e-mail",
            };

        if (await this.validateIsEmailUnique(employee.email))
            return {
                status: "error",
                message: "E-mail already in use",
            };

        return {
            status: "success",
            message: "Employee ready to insert",
        };
    }

    validateName(name: string): boolean {
        const regex = /^.+$/;
        return !!regex.test(name);
    }

    validateEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !!regex.test(email);
    }

    async validateIsEmailUnique(email: string) {
        return await this.employeeRepository.findOne({
            where: { email: email },
        });
    }
}
