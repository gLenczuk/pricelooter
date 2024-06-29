export interface SessionDTO {
    id: string;
    sid: string;
    data: string;
    expiresAt: Date;
}

export interface AuthenticateUserRequest {
    email: string;
    password: string;
}
