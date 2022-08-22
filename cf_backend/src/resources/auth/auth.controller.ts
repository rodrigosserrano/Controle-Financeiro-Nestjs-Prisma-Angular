import {Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request, UseGuards} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "../../core/auth/guards/local-auth.guard";
import { AuthRequest } from "../../core/models/AuthRequest";
import { IsPublic } from "../../core/decorators/is-public.decorator";
import { CurrentUser } from "../../core/decorators/current-user.decorator";
import { User } from "../user/entities/user.entity";
import {ApiTags} from "@nestjs/swagger";
import {Token} from "../../core/models/Token";
import {UnauthorizedError} from "../../core/errors/unauthorized.error";
import {HttpError} from "../../core/errors/http.error";

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

    @IsPublic()
    @Put('refresh-token')
    async refreshToken(@Body() refreshToken: Token) {
        return this.authService.refreshToken(refreshToken.Token).catch((error) => {
            throw new HttpError(error.message, HttpStatus.UNAUTHORIZED)
        })
    }
}
