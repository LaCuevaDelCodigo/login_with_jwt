import dotenv from 'dotenv';
import { App } from './app';
import { loginRouter } from './login.route';
import { privateRouter } from './private.route';

dotenv.config({ path: __dirname + '/../../.env' });

const restApi = new App([
    loginRouter,
    privateRouter,
]);
restApi.start();
