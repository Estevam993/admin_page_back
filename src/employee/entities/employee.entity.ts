import {
    Column,
    Table,
    Model,
    AllowNull,
    DataType,
    BeforeSave,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { Role } from "../../roles/entities/role.entity";
import { Department } from "../../department/entities/department.entity";
import { User } from "../../user/user.model";

@Table({ tableName: "employees" })
export class Employee extends Model<Employee> {
    @Column({
        type: DataType.STRING,
    })
    status: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    email: string;

    @AllowNull(false)
    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
    })
    role: number;

    @BelongsTo(() => Role)
    roleDetails: Role;

    @AllowNull(false)
    @ForeignKey(() => Department)
    @Column({
        type: DataType.INTEGER,
    })
    department: number;

    @BelongsTo(() => Department)
    departmentDetails: Department;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
    })
    user: number;

    @BelongsTo(() => User)
    userDetails: Department;

    async disable(fieldsToUpdate: Partial<Employee>): Promise<void> {
        fieldsToUpdate.status = "INACTIVE";

        await this.update(fieldsToUpdate);
    }

    @BeforeSave
    static async status(employee: Employee) {
        if (employee.status) employee.status = employee.status.toUpperCase();
        else employee.status = "ACTIVE";
    }
}
