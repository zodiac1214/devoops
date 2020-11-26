import * as uuid from 'uuid';
import * as spawn from 'await-spawn';
import { loadEnv, postgresClient } from './lib/util';

export default async (param) => {
  let client;
  try {
    loadEnv();
    const dbName: string = uuid.v4();
    process.env.TYPEORM_DATABASE = dbName;
    console.log(`Setup test database - ${dbName}`);
    client = postgresClient();
    await client.connect();
    await client.query(`CREATE DATABASE "${dbName}";`);

    console.log(`Running migration on test database - ${dbName}`);
    process.env.TYPEORM_MIGRATIONS = `${param.rootDir}/src/migrations/**/*.ts,${param.rootDir}/src/__mocks__/migrations/**/*.ts`;
    process.env.TYPEORM_ENTITIES = `${param.rootDir}/src/entities/**/*.ts`;
    const migrationOutput = await spawn('yarn', [
      'run',
      'typeorm',
      'migration:run',
    ]);
    console.log(migrationOutput.toString());
    await client.end();
  } catch (e) {
    console.error('Setup test database failed: ', e);
  } finally {
    await client.end();
  }
};
