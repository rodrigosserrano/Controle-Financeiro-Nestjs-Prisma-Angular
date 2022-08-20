export interface UserPayload {
    sub: number,
    email: string,
    lastName: string,
    iat?: number,
    exp?: number,
}