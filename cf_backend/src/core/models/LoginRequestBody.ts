import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class LoginRequestBody {
    @IsEmail({}, { message: 'O campo precisa um email.' })
    @IsNotEmpty({ message: 'O campo email não pode ser vazio.' })
    email: string

    @IsString({ message: 'O campo precisa ser do tipo texto.' })
    @IsNotEmpty({ message: 'O campo senha não pode ser vazio.' })
    password: string
}