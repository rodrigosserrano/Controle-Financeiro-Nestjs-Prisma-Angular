import {HttpStatus, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {User} from "../user/entities/user.entity";
import {UserPayload} from "../../core/models/UserPayload";
import {JwtService} from "@nestjs/jwt";
import {UserToken} from "../../core/models/UserToken";
import {UnauthorizedError} from "../../core/errors/unauthorized.error";
import {HttpError} from "../../core/errors/http.error";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                return {
                    ...user,
                    password: undefined,
                };
            }
        }

        throw new UnauthorizedError(
            'Email e/ou senha inválido.'
        );
    }

    async login(user: User): Promise<UserToken> {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        const jwtToken = this.jwtService.sign(payload);
        await this.userService.setTokenUser(user.id, jwtToken)

        return { access_token: jwtToken }
    }

    async refreshToken(oldToken: string) {
        if (oldToken === undefined) throw Error('Token inválido');
        const user = await this.userService.findUserByToken(oldToken);

        if (!user) throw Error('Token inválido');

        return this.login(user);
    }
}
