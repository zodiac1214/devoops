import { loadEnv, postgresClient } from './lib/util';

export default async (param) => {
  let client;
  try {
    loadEnv();
    const dbName = process.env.TYPEORM_DATABASE;
    console.log(`Teardown test database - ${dbName}`);
    client = postgresClient();
    await client.query(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity
        WHERE datname='${dbName}';`
    );
    await client.query(`DROP DATABASE "${dbName}";`);
  } catch (e) {
    console.error('Teardown test database failed: ', e);
  } finally {
    await client.end();
  }
};
