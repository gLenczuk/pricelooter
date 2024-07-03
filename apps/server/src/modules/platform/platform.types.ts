interface CreatePlatformDTO {
    name: string;
    url: string;
    category: string;
}

interface FindOnePlatformDTO {
    id?: number;
    name?: string;
}

interface FindManyPlatformsFilterDTO {
    ids?: number[];
}

interface FindManyPlatformsDTO {
    filter?: FindManyPlatformsFilterDTO;
}

export type CreateDatabasePlatformQuery = CreatePlatformDTO;
export type CreateDomainPlatformParams = CreatePlatformDTO;
export type FindOneDatabasePlatformQuery = FindOnePlatformDTO;
export type FindUniqueDomainPlatformParams = FindOnePlatformDTO;
export type FindManyDatabasePlatformsQuery = FindManyPlatformsDTO;
export type FindManyDomainPlatformsParams = FindManyPlatformsDTO;
