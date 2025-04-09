import { Injectable } from '@nestjs/common';
import { ModuleSeeder } from './module.seeder';
import { UserSeeder } from './user.seeder';

@Injectable()
export class Seeder {
  constructor(
    private readonly moduleSeeder: ModuleSeeder,
    private readonly userSeeder: UserSeeder,
  ) {}

  async seed() {
    try {
      await this.moduleSeeder.seed();
      await this.userSeeder.seed();
      console.log('Seeding completed successfully');
    } catch (error) {
      console.error('Seeding failed:', error);
    }
  }
}