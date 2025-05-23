import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, plainPassword: string): Promise<any> {
        if (!email || !plainPassword)
            return {
                status: "error",
                message: `Credenciais inválidas`,
            };

        const user = await this.usersService.findByEmailOrName(email);

        if (!user)
            return {
                status: "error",
                message: `Credenciais inválidas`,
            };

        // Verifica a senha
        const isPasswordValid: boolean =
            await user.checkPassword(plainPassword);

        if (!isPasswordValid)
            return {
                status: "error",
                message: `Credenciais inválidas`,
            };

        const id = user.id;
        const userEmail = user.email;
        const userRole = user.role;
        const userStatus = user.status;
        const userName = user.name;

        return [id, userEmail, userRole, userStatus, userName];
    }

    async login(email: string, password: string) {
        const result = await this.validateUser(email, password);

        if ("status" in result && result.status === "error") {
            return result;
        }

        const [id, userEmail, userRole, userStatus, userName] = result;

        const payload = { sub: id, email: userEmail };
        return {
            id: id,
            name: userName,
            email: userEmail,
            role: userRole,
            status: userStatus,
            access_token: this.jwtService.sign(payload),
        };
    }
}
