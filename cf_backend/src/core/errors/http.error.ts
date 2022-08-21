import {HttpException, HttpStatus} from "@nestjs/common";

export class HttpError extends HttpException {
    constructor(body: string, status: number = HttpStatus.OK) {
        super({
            status,
            body
        }, status);
    }
}