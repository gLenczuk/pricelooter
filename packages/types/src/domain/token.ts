import { AnyObject } from '..';

export enum TokenType {
    UserActivation = 'USER_ACTIVATION',
    PasswordReset = 'PASSWORD_RESET',
}

export interface TokenDTO {
    id: string;
    type: TokenType;
    expiresAt: Date;
    data: AnyObject;
    createdAt: Date;
    updatedAt: Date;
}
