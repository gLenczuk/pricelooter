import { ApplicationError, NotFoundError } from '@pricelooter/exceptions';
import { AuthenticateUserRequest, UserStatus } from '@pricelooter/types';
import { ControllerRequest } from '../../types';
import { userService } from '../user/user.service';
import { sessionService } from './session.service';

const authenticateUser = async (req: ControllerRequest<AuthenticateUserRequest>) => {
    const { email, password } = req.body;

    const user = await userService.findUniqueUser({
        email,
    });

    if (!user || !user.password || user.status !== UserStatus.Active) {
        throw new NotFoundError({
            message: 'Cannot find user for given credentials.',
            key: 'invalid_credentials',
        });
    }

    const isAuthenticated = await sessionService.authenticateUser({
        requestedPassword: password,
        currentPassword: user.password,
    });

    if (!isAuthenticated) {
        throw new NotFoundError({
            message: 'Cannot find user for given credentials.',
            key: 'invalid_credentials',
        });
    }

    return user;
};

const getCurrentUser = async (req: ControllerRequest) => {
    if (!req.session) throw new ApplicationError({ message: 'Session is not initialized.' });
    if (!req.session.user) throw new NotFoundError({ message: 'Cannot find current session user.' });

    const { id } = req.session.user;

    const user = await userService.findUniqueUser({ id });

    if (!user) throw new NotFoundError({ message: 'Cannot find current session user.' });

    return user;
};

export const sessionController = {
    authenticateUser,
    getCurrentUser,
};
