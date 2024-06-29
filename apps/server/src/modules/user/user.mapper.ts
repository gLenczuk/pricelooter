import { UserDTO, UserStatus } from '@pricelooter/types';
import Prisma from '@prisma/client';

type DatabaseUserWithRelations = Prisma.User;

const mapDatabaseUserToUserDTO = (databaseUser: DatabaseUserWithRelations): UserDTO => ({
    id: databaseUser.id,
    username: databaseUser.username,
    email: databaseUser.email,
    password: databaseUser.password,
    status: databaseUser.status as UserStatus,
    createdAt: databaseUser.createdAt,
    updatedAt: databaseUser.updatedAt,
    deletedAt: databaseUser.deletedAt || null,
});

export const userMapper = {
    mapDatabaseUserToUserDTO,
};
