import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ParametersService } from "./parameters.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("parameters")
export class ParametersController {
    constructor(private readonly parametersService: ParametersService) {}

    @Get()
    async getParameters(@Request() req: any) {
        const user = req.user;
        const parameters = await this.parametersService.getParameters();

        return { ...parameters, user };
    }
}
