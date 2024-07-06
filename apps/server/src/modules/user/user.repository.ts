import { UserStatus } from '@pricelooter/types';
import { prisma } from '../../libs/database';
import { userMapper } from './user.mapper';
import {
    CreateDatabaseUserQuery,
    FindManyDatabaseUsersQuery,
    FindUniqueDatabaseUserQuery,
    UpdateOneDatabaseUserQuery,
} from './user.types';
import { getApplicationConfig } from '../../config';

const create = async (query: CreateDatabaseUserQuery) => {
    const config = getApplicationConfig();

    const user = await prisma.user.create({
        data: {
            username: query.username,
            email: query.email,
            password: query.password,
            status: config.ENABLE_ACCOUNT_ACTIVATIONS ? UserStatus.Inactive : UserStatus.Active,
        },
    });

    return userMapper.mapDatabaseUserToUserDTO(user);
};

const findUnique = async (query: FindUniqueDatabaseUserQuery) => {
    const user = await prisma.user.findUnique({
        where: {
            id: query.id,
            email: query.email,
        },
    });

    return user ? userMapper.mapDatabaseUserToUserDTO(user) : null;
};

const updateOne = async (query: UpdateOneDatabaseUserQuery) => {
    const user = await prisma.user.update({
        where: {
            id: query.filter.id,
        },
        data: query.data,
    });

    return userMapper.mapDatabaseUserToUserDTO(user);
};

const findMany = async (query: FindManyDatabaseUsersQuery) => {
    const users = await prisma.user.findMany({
        where: {
            id: {
                in: query.filter?.ids,
            },
        },
    });

    return users.map(userMapper.mapDatabaseUserToUserDTO);
};

export const userRepository = {
    create,
    findUnique,
    updateOne,
    findMany,
};
