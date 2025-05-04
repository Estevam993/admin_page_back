import { Module } from "@nestjs/common";
import { ParametersService } from "./parameters.service";
import { ParametersController } from "./parameters.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Department } from "../department/entities/department.entity";
import { Role } from "../roles/entities/role.entity";

@Module({
    imports: [SequelizeModule.forFeature([Department, Role])],
    controllers: [ParametersController],
    providers: [ParametersService],
    exports: [ParametersService],
})
export class ParametersModule {}
