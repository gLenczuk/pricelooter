import { AnyObject, TokenDTO, TokenType } from '@pricelooter/types';
import Prisma from '@prisma/client';

type DatabaseToken = Prisma.Token;

const mapDatabaseTokenToTokenDTO = (databaseToken: DatabaseToken): TokenDTO => ({
    id: databaseToken.id,
    type: databaseToken.type as TokenType,
    expiresAt: databaseToken.expiresAt,
    data: databaseToken.data as unknown as AnyObject,
    createdAt: databaseToken.createdAt,
    updatedAt: databaseToken.updatedAt,
});

export const tokenMapper = {
    mapDatabaseTokenToTokenDTO,
};
