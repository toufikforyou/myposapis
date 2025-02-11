export interface JWTPayload {
    uid: string;
    email: string;
    username: string;
    sid: string[];
    iat: number;
    exp: number;
}

export interface IAuthenticatedRequest extends Express.Request {
    user: JWTPayload;
    token: string;
} 