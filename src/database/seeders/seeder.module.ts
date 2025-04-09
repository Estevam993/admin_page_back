import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Seeder } from './seeder';
import { ModuleSeeder } from './module.seeder';
import { UserSeeder } from './user.seeder';
import { Module as ModuleEntity } from '../../modules/entities/module.entity';
import { User } from 'src/user/user.model';

@Module({
  imports: [SequelizeModule.forFeature([ModuleEntity, User])],
  providers: [Seeder, ModuleSeeder, UserSeeder],
})
export class SeederModule {}