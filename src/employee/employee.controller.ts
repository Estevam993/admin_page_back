import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
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
    create(@Body() createEmployeeDto: CreateEmployeeDto, @Req() request: any) {
        return this.employeeService.create(createEmployeeDto, request.user.id);
    }

    @Get()
    findAll(@Req() request: any) {
        return this.employeeService.findAll(request.user.id);
    }

    @Get(":id")
    findOne(@Param("id") id: string, @Req() request: any) {
        return this.employeeService.findOne(+id, request.user.id);
    }

    @Post("update/:id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateEmployeeDto) {
        return this.employeeService.update(+id, updateUserDto);
    }
}
