export interface ApplicationConfig {
    HTTP_SERVER_URL: string;
    HTTP_REQUEST_TIMEOUT: number;
}

export const getApplicationConfig = (): ApplicationConfig => ({
    HTTP_SERVER_URL: 'http://localhost:3000',
    HTTP_REQUEST_TIMEOUT: 10000,
});
