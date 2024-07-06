import { ExistingResourceError, NotFoundError, ValidationError } from '@pricelooter/exceptions';
import { userRepository } from './user.repository';
import {
    ActivateUserParams,
    ChangeUserPasswordParams,
    CreateUserParams,
    FindManyUsersParams,
    FindUniqueUserParams,
    UpdateUniqueUserParams,
} from './user.types';
import bcrypt from 'bcrypt';
import { UserStatus } from '@pricelooter/types';
import { tokenService } from '../token/token.service';

const createUser = async (params: CreateUserParams) => {
    const user = await userRepository.findUnique({ email: params.email });

    if (user)
        throw new ExistingResourceError({
            message: 'User with that email already exists.',
            key: 'user_already_exists',
        });

    const hashedPassword = await bcrypt.hash(params.password, 10);

    return userRepository.create({
        username: params.username,
        email: params.email,
        password: hashedPassword,
    });
};

const findUniqueUser = (params: FindUniqueUserParams) => {
    return userRepository.findUnique({
        id: params.id,
        email: params.email,
    });
};

const findManyUsers = (params: FindManyUsersParams) => {
    return userRepository.findMany({
        filter: {
            ids: params.filter?.ids,
        },
    });
};

const updateUniqueUser = async (params: UpdateUniqueUserParams) => {
    const hashedPassword = params.data.password ? await bcrypt.hash(params.data.password, 10) : undefined;

    return userRepository.updateOne({
        filter: params.filter,
        data: {
            ...params.data,
            password: hashedPassword,
        },
    });
};

const activateUser = async (params: ActivateUserParams) => {
    const user = await userRepository.findUnique({ id: params.userId });

    if (!user) {
        throw new NotFoundError({ message: 'Requested user does not exists.' });
    }

    const { token, error } = await tokenService.validateAccountActivationToken({
        token: params.token,
        userId: params.userId,
    });

    if (error || !token) {
        throw new ValidationError({ message: error });
    }

    const activatedUser = await userRepository.updateOne({
        filter: { id: params.userId },
        data: { status: UserStatus.Active },
    });

    await tokenService.deleteToken({ id: token.id });

    return activatedUser;
};

const changeUserPassword = async (params: ChangeUserPasswordParams) => {
    const user = await userRepository.findUnique({ id: params.userId });

    if (!user) {
        throw new NotFoundError({ message: 'Requested user does not exists.' });
    }

    const { token, error } = await tokenService.validatePasswordResetToken({
        token: params.token,
        userId: params.userId,
    });

    if (error || !token) {
        throw new ValidationError({ message: error });
    }

    const hashedPassword = await bcrypt.hash(params.newPassword, 10);
    const updatedUser = await userRepository.updateOne({
        filter: { id: params.userId },
        data: { password: hashedPassword },
    });

    await tokenService.deleteToken({ id: token.id });

    return updatedUser;
};

export const userService = {
    createUser,
    findUniqueUser,
    updateUniqueUser,
    activateUser,
    changeUserPassword,
    findManyUsers,
};
