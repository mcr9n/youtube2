import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'youtube2',
      user: 'mvinn',
      password: 'mvinn',
    },
    migrations: {
      directory: './src/migrations',
    },
  },
};

module.exports = config;
