import {
  Column,
  Table,
  Model,
  BelongsToMany,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  label: string;

  @Column({
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
    defaultValue: [],
  })
  modules: number[];
}
