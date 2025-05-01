import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { User } from "./user/user.model";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./roles/roles.module";
import { SeederModule } from "./database/seeders/seeder.module";
import { EmployeeModule } from "./employee/employee.module";
import { DepartmentModule } from "./department/department.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        SequelizeModule.forRoot({
            dialect: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            models: [User],
            autoLoadModels: true,
            synchronize: true,
        }),
        UserModule,
        AuthModule,
        RolesModule,
        SeederModule,
        EmployeeModule,
        DepartmentModule,
    ],
})
export class AppModule {}
