import { loadEnv, postgresClient } from './lib/util';

export default async (param) => {
  try {
    loadEnv();
    const dbName = process.env.TYPEORM_DATABASE;
    console.log(`Teardown test database - ${dbName}`);
    await postgresClient.query(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity
        WHERE datname='${dbName}';`
    );
    await postgresClient.query(`DROP DATABASE "${dbName}";`);
  } catch (e) {
    console.error('Teardown test database failed: ', e);
  } finally {
    await postgresClient.end();
  }
};
