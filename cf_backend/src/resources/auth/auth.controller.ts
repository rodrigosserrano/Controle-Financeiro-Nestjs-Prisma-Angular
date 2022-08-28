import {Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request, UseGuards} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "../../core/auth/guards/local-auth.guard";
import { AuthRequest } from "../../core/models/AuthRequest";
import { IsPublic } from "../../core/decorators/is-public.decorator";
import { CurrentUser } from "../../core/decorators/current-user.decorator";
import { User } from "../user/entities/user.entity";
import {ApiTags} from "@nestjs/swagger";
import {UnauthorizedError} from "../../core/errors/unauthorized.error";
import {HttpError} from "../../core/errors/http.error";
import {UserToken} from "../../core/models/UserToken";

@ApiTags('Auth')
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

    @Put('refresh-token')
    @IsPublic()
    async refreshToken(@Body() refreshToken: UserToken) {
        return this.authService.refreshToken(refreshToken.access_token).catch((error) => {
            throw new HttpError(error.message, HttpStatus.UNAUTHORIZED)
        })
    }
}
