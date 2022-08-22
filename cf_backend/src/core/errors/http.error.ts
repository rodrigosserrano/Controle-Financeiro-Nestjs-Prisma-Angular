import {HttpException, HttpStatus} from "@nestjs/common";

export class HttpError extends HttpException {
    constructor(message: string, status: number = HttpStatus.OK) {
        super({
            status,
            message
        }, status);
    }
}