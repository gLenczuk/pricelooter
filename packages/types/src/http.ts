import { EmptyObject, UserDTO } from '.';

export interface HttpResponse<T, U = EmptyObject> {
    body: T;
    key: string | null;
    meta: U;
}

export type EmptyResponse = HttpResponse<EmptyObject>;

export type CreateUserResponse = HttpResponse<{ user: Omit<UserDTO, 'password'> & { password: null } }>;
export type UpdateUserResponse = HttpResponse<{ user: Omit<UserDTO, 'password'> & { password: null } }>;
export type AuthenticateUserResponse = HttpResponse<{ user: Omit<UserDTO, 'password'> & { password: null } }>;
export type GetCurrentUserResponse = HttpResponse<{ user: Omit<UserDTO, 'password'> & { password: null } }>;
