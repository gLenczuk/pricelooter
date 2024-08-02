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

    const exception = new ApplicationError({ message: 'Internal server error.' });
    const mappedException = useErrorHandler(exception);

    return Promise.reject(mappedException);
});
