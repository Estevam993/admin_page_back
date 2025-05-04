import { Controller, Post, Body, Session } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(
        @Body() loginDto: { email: string; password: string },
        @Session() session: Record<string, any>,
    ) {
        const { email, password } = loginDto;
        const login = await this.authService.login(email, password);

        session.user = login;

        return login;
    }
}
