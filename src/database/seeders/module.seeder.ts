import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Module } from '../../modules/entities/module.entity';

@Injectable()
export class ModuleSeeder {
  constructor(
    @InjectModel(Module)
    private moduleModel: typeof Module,
  ) {}

  async seed() {
    // First check if there are any existing records
    const count = await this.moduleModel.count();

    if (count === 0) {
      const modules = [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: 'dashboard',
        },
        {
          name: 'Usuários',
          path: '/users',
          icon: 'users',
        },
        {
          name: 'Cargos',
          path: '/roles',
          icon: 'shield',
        },
      ];

      await this.moduleModel.bulkCreate(modules);
      console.log('Modules seeded successfully');
    } else {
      console.log('Modules already exist, skipping seed');
    }
  }
}
