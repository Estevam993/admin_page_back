import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "src/roles/entities/role.entity";

@Injectable()
export class RoleSeeder {
    constructor(
        @InjectModel(Role)
        private roleModel: typeof Role,
    ) {}

    async seed() {
        const count = await this.roleModel.count();

        if (count === 0) {
            const roles = [
                "Admin",
                "Software Engineer",
                "Frontend Developer",
                "Backend Developer",
                "Fullstack Developer",
                "Product Manager",
                "Product Owner",
                "UI/UX Designer",
                "Graphic Designer",
                "Marketing Manager",
                "Growth Marketer",
                "Sales Representative",
                "Account Executive",
                "Customer Success Manager",
                "Business Development Representative",
                "Operations Manager",
                "People Operations Specialist",
                "Finance Analyst",
                "Data Scientist",
                "Data Analyst",
                "Security Engineer",
                "IT Support Specialist",
                "DevOps Engineer",
                "QA Engineer",
                "Founder & CEO",
                "Co-Founder & CTO",
                "Chief Product Officer",
                "Chief Marketing Officer",
            ];

            // Create all roles
            await Promise.all(
                roles.map((role) =>
                    this.roleModel.create({
                        label: role,
                    }),
                ),
            );

            console.log("Roles seeded successfully");
        } else {
            console.log("Roles already exist, skipping seed");
        }
    }
}
