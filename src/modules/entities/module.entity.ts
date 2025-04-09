import {
  Column,
  Table,
  Model,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'modules' })
export class Module extends Model<Module> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  path: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  icon: string;
}
