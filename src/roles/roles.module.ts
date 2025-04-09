import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { ForeignKey } from 'sequelize-typescript';
import { Role } from './entities/role.entity';
import { Module as ModuleEntity } from 'src/modules/entities/module.entity';
import { Column } from 'sequelize-typescript';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {
  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @ForeignKey(() => ModuleEntity)
  @Column
  moduleId: number;
}

