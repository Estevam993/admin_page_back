import { Department } from "src/department/entities/department.entity";
import { User } from "src/user/user.model";
import { Role } from "../../roles/entities/role.entity";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Seeder } from "./seeder";
import { UserSeeder } from "./user.seeder";
import { RoleSeeder } from "./role.seeder";
import { DepartmentSeeder } from "./department.seeder";

@Module({
    imports: [SequelizeModule.forFeature([User, Role, Department])],
    providers: [Seeder, UserSeeder, RoleSeeder, DepartmentSeeder],
})
export class SeederModule {}
