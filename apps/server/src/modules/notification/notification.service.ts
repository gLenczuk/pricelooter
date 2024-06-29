import { EmailType } from '@pricelooter/mailer';
import { getApplicationConfig } from '../../config';
import { mailer } from '../../libs/mailer';
import { SendAccountActivationEmailParams, SendForgotPasswordRequestEmailParams } from './notification.types';
import { tokenService } from '../token/token.service';
import { TokenType } from '@pricelooter/types';
import datefns from 'date-fns';
import { NotFoundError } from '@pricelooter/exceptions';
import { userService } from '../user/user.service';

const sendAccountActivationEmail = async (params: SendAccountActivationEmailParams) => {
    const config = getApplicationConfig();

    if (!config.ENABLE_ACCOUNT_ACTIVATIONS) return;

    const now = new Date();
    const inOneHourDate = datefns.addHours(now, 1);

    const token = await tokenService.createToken({
        type: TokenType.UserActivation,
        expiresAt: inOneHourDate,
        data: {
            userId: params.userId,
        },
    });

    await mailer.sendEmail({
        type: EmailType.USER_ACTIVATION,
        recipient: params.userEmail,
        language: params.language,
        data: {
            activationUrl: `${config.CLIENT_URL}/activate-account?token=${token.id}&userId=${params.userId}`,
        },
    });
};

const sendForgotPasswordRequestEmail = async (params: SendForgotPasswordRequestEmailParams) => {
    const user = await userService.findUniqueUser({ email: params.email });

    if (!user)
        throw new NotFoundError({
            message: `Cannot find user for given email (${params.email}).`,
            key: 'user_not_found',
        });

    const config = getApplicationConfig();
    const now = new Date();
    const inOneHourDate = datefns.addHours(now, 1);

    const token = await tokenService.createToken({
        type: TokenType.PasswordReset,
        expiresAt: inOneHourDate,
        data: {
            email: params.email,
            userId: user.id,
        },
    });

    await mailer.sendEmail({
        type: EmailType.PASSWORD_RESET,
        recipient: params.email,
        language: params.language,
        data: {
            resetPasswordUrl: `${config.CLIENT_URL}/auth/reset-password?token=${token.id}&userId=${user.id}`,
        },
    });

    return user;
};

export const notificationService = {
    sendAccountActivationEmail,
    sendForgotPasswordRequestEmail,
};
