import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "../../core/auth/guards/local-auth.guard";
import { AuthRequest } from "../../core/models/AuthRequest";
import { IsPublic } from "../../core/decorators/is-public.decorator";
import { CurrentUser } from "../../core/decorators/current-user.decorator";
import { User } from "../user/entities/user.entity";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @IsPublic()
    async login(@Request() req: AuthRequest) {
        return this.authService.login(req.user);
    }

    @Get('me')
    getMe(@CurrentUser() user: User) {
        return user;
    }
}
