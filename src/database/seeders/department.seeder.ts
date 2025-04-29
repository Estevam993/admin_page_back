import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Department } from 'src/department/entities/department.entity';

@Injectable()
export class DepartmentSeeder {
  constructor(
    @InjectModel(Department)
    private departmentModel: typeof Department,
  ) {}

  async seed() {
    const count = await this.departmentModel.count();

    if (count === 0) {
      const departments = [
        "Engineering",
        "Product",
        "Design",
        "Marketing",
        "Sales",
        "Customer Success",
        "Business Development",
        "Operations",
        "People & Culture",
        "Finance",
        "Growth",
        "Data & Analytics",
        "Security",
        "IT"
    ];

      await Promise.all(
        departments.map((department) =>
          this.departmentModel.create({
            label: department,
          }),
        ),
      );

      console.log('Roles seeded successfully');
    } else {
      console.log('Roles already exist, skipping seed');
    }
  }
}
