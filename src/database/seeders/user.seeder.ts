import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async seed() {
    const count = await this.userModel.count();

    if (count === 0) {
      const hashedPassword = await hashSync('Admin1234', 10);

      await this.userModel.create({
        name: 'Admin',
        email: 'Admin@admin.com',
        password: hashedPassword,
        status: 'active',
      });

      console.log('Admin user seeded successfully');
    } else {
      console.log('Users already exist, skipping seed');
    }
  }
}
