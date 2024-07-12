import { EmptyObject, PlatformDTO, ProductDTO, UserDTO } from '.';

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
export type CreatePlatformResponse = HttpResponse<{ platform: PlatformDTO }>;
export type GetPlatformsResponse = HttpResponse<{ platforms: PlatformDTO[] }>;
export type CreateProductResponse = HttpResponse<{ product: ProductDTO }>;
export type GetProductsResponse = HttpResponse<{ products: ProductDTO[] }, { count: number }>;
