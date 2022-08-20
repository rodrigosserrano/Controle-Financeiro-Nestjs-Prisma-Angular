import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt';
import {User} from "../user/entities/user.entity";
import {UserPayload} from "./models/UserPayload";
import {JwtService} from "@nestjs/jwt";
import {UserToken} from "./models/UserToken";
import {UnauthorizedError} from "../../errors/unauthorized.error";

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

    login(user: User): UserToken {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        const jwtToken = this.jwtService.sign(payload);

        return { access_token: jwtToken }
    }
}
