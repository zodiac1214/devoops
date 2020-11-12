import * as uuid from 'uuid';
import * as spawn from 'await-spawn';
import { loadEnv, postgresClient } from './lib/util';

export default async (param) => {
  try {
    loadEnv();
    const dbName: string = uuid.v4();
    process.env.TYPEORM_DATABASE = dbName;
    console.log(`Setup test database - ${dbName}`);
    await postgresClient.connect();
    await postgresClient.query(`CREATE DATABASE "${dbName}";`);

    console.log(`Running migration on test database - ${dbName}`);
    process.env.TYPEORM_MIGRATIONS = `${param.rootDir}/src/migrations/**/*.ts`;
    process.env.TYPEORM_ENTITIES = `${param.rootDir}/src/entities/**/*.ts`;
    const migrationOutput = await spawn('yarn', [
      'run',
      'typeorm',
      'migration:run',
    ]);
    console.log(migrationOutput.toString());
  } catch (e) {
    console.error('Setup test database failed: ', e);
  }
};
