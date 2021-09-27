import { config } from 'dotenv';

const { NODE_ENV } = process.env;

const envFile = `.env.${NODE_ENV}`;
config({ path: envFile });

const REQUIRED_ENV_VARS = [
  'DEVGUILD_USER_SERVICE_URL',
  'DEVGUILD_PROJECT_SERVICE_URL',
  'DEVGUILD_TECH_SERVICE_URL',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
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
export const devguildTechServiceUrl = `http://${process.env.DEVGUILD_TECH_SERVICE_URL}`;

export const jwt = {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
