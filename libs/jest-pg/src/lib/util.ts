import { Client } from 'pg';
import * as dotenv from 'dotenv';
import * as findFileUp from 'find-file-up';

export const postgresClient: Client = new Client({
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  database: 'postgres',
  user: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  ssl: process.env.TYPEORM_SSL === 'true',
});

export const loadEnv = () => {
  const envFilePath: string = findFileUp.sync('.env');
  dotenv.config({ path: envFilePath });
};
