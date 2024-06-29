import http from 'http';
import https from 'https';
import fs from 'fs';
import { Application } from 'express';
import { getApplicationConfig } from './config';

const createHttpsServer = (app: Application) => {
    const { SSL_CERT_PATH, SSL_KEY_PATH } = getApplicationConfig();

    const key = fs.readFileSync(SSL_KEY_PATH).toString();
    const cert = fs.readFileSync(SSL_CERT_PATH).toString();

    return https.createServer({ key, cert }, app);
};

export const createServer = (app: Application) => {
    const config = getApplicationConfig();
    const server = config.NODE_ENV === 'development' ? http.createServer(app) : createHttpsServer(app);

    return server;
};
