import { Injectable } from "@nestjs/common";
import { Role } from "../roles/entities/role.entity";
import { Department } from "../department/entities/department.entity";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ParametersService {
    constructor(
        @InjectModel(Role)
        private role: typeof Role,
        @InjectModel(Department)
        private department: typeof Department,
    ) {}

    async getParameters() {
        const roles = await this.role.findAll();
        const departments = await this.department.findAll();

        return {
            roles,
            departments,
        };
    }
}
