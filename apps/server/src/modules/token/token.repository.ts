import { Prisma } from '@prisma/client';
import { prisma } from '../../libs/database';
import { tokenMapper } from './token.mapper';
import { CreateDatabaseTokenQuery, DeleteOneDatabaseTokenQuery, FindUniqueDatabaseTokenQuery } from './token.types';

const create = async (query: CreateDatabaseTokenQuery) => {
    const token = await prisma.token.create({
        data: {
            type: query.type,
            expiresAt: query.expiresAt,
            data: query.data as Prisma.InputJsonValue,
        },
    });

    return tokenMapper.mapDatabaseTokenToTokenDTO(token);
};

const findUnique = async (query: FindUniqueDatabaseTokenQuery) => {
    const token = await prisma.token.findUnique({
        where: {
            id: query.id,
        },
    });

    return token ? tokenMapper.mapDatabaseTokenToTokenDTO(token) : null;
};

const deleteOne = async (query: DeleteOneDatabaseTokenQuery) => {
    const token = await prisma.token.delete({
        where: {
            id: query.id,
        },
    });

    return tokenMapper.mapDatabaseTokenToTokenDTO(token);
};

export const tokenRepository = {
    create,
    findUnique,
    deleteOne,
};
