import { Injectable } from "@nestjs/common";
import { UserSeeder } from "./user.seeder";
import { RoleSeeder } from "./role.seeder";
import { DepartmentSeeder } from "./department.seeder";

@Injectable()
export class Seeder {
    constructor(
        private readonly roleSeeder: RoleSeeder,
        private readonly userSeeder: UserSeeder,
        private readonly departmentSeeder: DepartmentSeeder,
    ) {}

    async seed() {
        try {
            await this.roleSeeder.seed();
            await this.userSeeder.seed();
            await this.departmentSeeder.seed();
            console.log("Seeding completed successfully");
        } catch (error) {
            console.error("Seeding failed:", error);
        }
    }
}
