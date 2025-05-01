import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { EmployeeService } from "./employee.service";
import { EmployeeController } from "./employee.controller";
import { Employee } from "./entities/employee.entity";

@Module({
    imports: [SequelizeModule.forFeature([Employee])],
    controllers: [EmployeeController],
    providers: [EmployeeService],
    exports: [EmployeeService],
})
export class EmployeeModule {}
