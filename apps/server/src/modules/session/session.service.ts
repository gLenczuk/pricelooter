import bcrypt from 'bcrypt';
import { AuthenticateUserParams } from './session.types';

const authenticateUser = async (params: AuthenticateUserParams) => {
    const { requestedPassword, currentPassword } = params;

    return bcrypt.compare(requestedPassword, currentPassword);
};

export const sessionService = {
    authenticateUser,
};
