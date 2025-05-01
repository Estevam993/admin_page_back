import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("employee")
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Post()
    create(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.employeeService.create(createEmployeeDto);
    }

    @Get()
    findAll() {
        return this.employeeService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.employeeService.findOne(+id);
    }

    @Post("update/:id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateEmployeeDto) {
        return this.employeeService.update(+id, updateUserDto);
    }
}
