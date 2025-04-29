import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'departments',
  timestamps: true,
})
export class Department extends Model {
  @Column
  label: string;
}
