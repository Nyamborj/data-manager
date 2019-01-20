import { IEnvironmentConfig } from './interfaces/environment-config';

export const environment: Readonly<IEnvironmentConfig> = {
  production: false,
  idleTimeout: 10,
  networkCheckFrequency: 3000
};
