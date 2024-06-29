import { AnyObject, TokenType } from '@pricelooter/types';

interface CreateTokenDTO {
    type: TokenType;
    expiresAt: Date;
    data: AnyObject;
}

interface FindOneTokenDTO {
    id: string;
}

interface DeleteOneTokenDTO {
    id: string;
}

export type CreateDatabaseTokenQuery = CreateTokenDTO;
export type FindUniqueDatabaseTokenQuery = FindOneTokenDTO;
export type DeleteOneDatabaseTokenQuery = DeleteOneTokenDTO;

export type CreateTokenParams = CreateTokenDTO;
export type FindUniqueTokenParams = FindOneTokenDTO;
export type DeleteTokenParams = DeleteOneTokenDTO;

export interface ValidateAccountActivationTokenParams {
    token: string;
    userId: number;
}

export interface ValidatePasswordResetTokenParams {
    token: string;
    userId: number;
}
