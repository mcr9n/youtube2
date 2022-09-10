import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'youtube2',
      user: 'postgres',
      password: 'postgres',
    },
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/seeds'
  }
  },
};

module.exports = config;
