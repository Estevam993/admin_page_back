import { Column, Table, Model, DataType, HasMany } from "sequelize-typescript";
import { Employee } from "../../employee/entities/employee.entity";

@Table({ tableName: "roles" })
export class Role extends Model<Role> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    label: string;

    @HasMany(() => Employee)
    employees: Employee[];
}
