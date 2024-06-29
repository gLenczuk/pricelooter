import { ApplicationError } from '@pricelooter/exceptions';
import { CreateUserRequest, UpdateUserRequest, UserUpdateOperation } from '@pricelooter/types';
import { ControllerRequest } from '../../types';
import { userService } from './user.service';

const createUser = async (req: ControllerRequest<CreateUserRequest>) => {
    const { email, password, username } = req.body;

    return userService.createUser({
        username,
        email,
        password,
    });
};

const updateUser = async (req: ControllerRequest<UpdateUserRequest>) => {
    const { operation, data } = req.body;

    switch (operation) {
        case UserUpdateOperation.ActivateAccount:
            return userService.activateUser({ userId: data.userId, token: data.token });
        case UserUpdateOperation.ResetPassword:
            return userService.changeUserPassword({
                userId: data.userId,
                token: data.token,
                newPassword: data.newPassword,
            });
        default:
            throw new ApplicationError({ message: `Cannot handle given operation type. (${operation})` });
    }
};

export const userController = {
    createUser,
    updateUser,
};
