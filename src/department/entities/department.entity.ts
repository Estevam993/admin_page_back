import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Employee } from "../../employee/entities/employee.entity";

@Table({
    tableName: "departments",
    timestamps: true,
})
export class Department extends Model {
    @Column
    label: string;

    @HasMany(() => Employee)
    employees: Employee[];
}
