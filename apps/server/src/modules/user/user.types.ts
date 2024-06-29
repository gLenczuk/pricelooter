import { UserStatus, UserUpdateOperation } from '@pricelooter/types';
import { Schema } from 'yup';

interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
}

interface FindOneUserDTO {
    id?: number;
    email?: string;
}

interface UpdateOneUserFilterDTO {
    id: number;
}

interface UpdateOneUserDataDTO {
    username?: string;
    email?: string;
    password?: string;
    status?: UserStatus;
    deletedAt?: Date | null;
}

interface UpdateOneUserDTO {
    filter: UpdateOneUserFilterDTO;
    data: UpdateOneUserDataDTO;
}

export type CreateDatabaseUserQuery = CreateUserDTO;
export type FindUniqueDatabaseUserQuery = FindOneUserDTO;
export type UpdateOneDatabaseUserQuery = UpdateOneUserDTO;

export type CreateUserParams = CreateUserDTO;
export type FindUniqueUserParams = FindOneUserDTO;
export type UpdateUniqueUserParams = UpdateOneUserDTO;

export type UserUpdateSchemas = Record<UserUpdateOperation, Schema>;

export interface ActivateUserParams {
    userId: number;
    token: string;
}

export interface ChangeUserPasswordParams {
    userId: number;
    token: string;
    newPassword: string;
}
