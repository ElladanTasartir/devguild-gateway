import { config } from 'dotenv';

const { NODE_ENV } = process.env;

const envFile = `.env.${NODE_ENV}`;
config({ path: envFile });

const REQUIRED_ENV_VARS = [
  'DEVGUILD_USER_SERVICE_URL',
  'DEVGUILD_PROJECT_SERVICE_URL',
];

REQUIRED_ENV_VARS.forEach((envVar) => {
  const val = process.env[envVar];
  if (!val) {
    throw new Error(`Required ENV VAR not set: ${envVar}`);
  }
});

export const port = Number(process.env.PORT) || 3000;
export const gatewayTimeout = Number(process.env.GATEWAY_TIMEOUT) || 1000;

export const devguildUserServiceUrl = `http://${process.env.DEVGUILD_USER_SERVICE_URL}`;
export const devguildProjectServiceUrl = `http://${process.env.DEVGUILD_PROJECT_SERVICE_URL}`;
