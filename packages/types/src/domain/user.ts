export enum UserStatus {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

export enum UserUpdateOperation {
    ActivateAccount = 'ACTIVATE_ACCOUNT',
    ResetPassword = 'RESET_PASSWORD',
}

export interface UserDTO {
    id: number;
    username: string;
    email: string;
    password: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface ActivateUserRequest {
    operation: UserUpdateOperation.ActivateAccount;
    data: {
        userId: number;
        token: string;
    };
}

export interface ResetPasswordRequest {
    operation: UserUpdateOperation.ResetPassword;
    data: {
        userId: number;
        token: string;
        newPassword: string;
    };
}

export type UpdateUserRequest = ActivateUserRequest | ResetPasswordRequest;
