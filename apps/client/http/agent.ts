import Axios, { AxiosError } from 'axios';
import { ApplicationError, useErrorHandler } from '@pricelooter/exceptions';
import { getApplicationConfig } from '../config';

const config = getApplicationConfig();

export const agent = Axios.create({
    baseURL: config.HTTP_SERVER_URL,
    timeout: config.HTTP_REQUEST_TIMEOUT,
    withCredentials: true,
});

agent.interceptors.response.use(undefined, error => {
    if (error instanceof AxiosError && 'response' in error) {
        return Promise.reject(error.response.data.errors);
    }

    if (error instanceof AxiosError && 'request' in error) {
        const exception = new ApplicationError({ message: error.message, key: 'internal_server_error' });
        const mappedException = useErrorHandler(exception);

        return Promise.reject(mappedException);
    }

    const exception = new ApplicationError({ message: error.message, key: 'internal_server_error' });
    const errors = useErrorHandler(exception);
    return Promise.reject(errors);
});
