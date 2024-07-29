import { TokenType } from '@pricelooter/types';
import { tokenRepository } from './token.repository';
import {
    CreateTokenParams,
    DeleteTokenParams,
    FindUniqueTokenParams,
    ValidateAccountActivationTokenParams,
    ValidatePasswordResetTokenParams,
} from './token.types';
import { isAfter } from 'date-fns';

const createToken = async (params: CreateTokenParams) => {
    return tokenRepository.create({
        type: params.type,
        expiresAt: params.expiresAt,
        data: params.data,
    });
};

const findUniqueToken = async (params: FindUniqueTokenParams) => {
    return tokenRepository.findUnique({
        id: params.id,
    });
};

const deleteToken = async (params: DeleteTokenParams) => {
    return tokenRepository.deleteOne({
        id: params.id,
    });
};

const validateAccountActivationToken = async (params: ValidateAccountActivationTokenParams) => {
    const databaseToken = await tokenService.findUniqueToken({ id: params.token });

    if (!databaseToken) {
        return {
            token: null,
            error: `Cannot find token. (${params.token})`,
        };
    }

    if (databaseToken.type !== TokenType.UserActivation) {
        return {
            token: databaseToken,
            error: `Token has invalid type. (${params.token})`,
        };
    }

    const now = new Date();
    const isTokenExpired = isAfter(now, databaseToken.expiresAt);

    if (isTokenExpired) {
        return {
            token: databaseToken,
            error: `Token expired. (${params.token})`,
        };
    }

    if (databaseToken.data.userId !== params.userId) {
        return {
            token: databaseToken,
            error: `Token does not belong to requested user. (${params.token})`,
        };
    }

    return {
        token: databaseToken,
        error: null,
    };
};

const validatePasswordResetToken = async (params: ValidatePasswordResetTokenParams) => {
    const databaseToken = await tokenService.findUniqueToken({ id: params.token });

    if (!databaseToken) {
        return {
            token: null,
            error: `Cannot find token. (${params.token})`,
        };
    }

    if (databaseToken.type !== TokenType.PasswordReset) {
        return {
            token: databaseToken,
            error: `Token has invalid type. (${params.token})`,
        };
    }

    const now = new Date();
    const isTokenExpired = isAfter(now, databaseToken.expiresAt);

    if (isTokenExpired) {
        return {
            token: databaseToken,
            error: `Token expired. (${params.token})`,
        };
    }

    if (databaseToken.data.userId !== params.userId) {
        return {
            token: databaseToken,
            error: `Token does not belong to requested user. (${params.token})`,
        };
    }

    return {
        token: databaseToken,
        error: null,
    };
};

export const tokenService = {
    createToken,
    findUniqueToken,
    deleteToken,
    validateAccountActivationToken,
    validatePasswordResetToken,
};
