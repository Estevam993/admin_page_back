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
  }
}
