import { Controller, Get } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';

@Controller()
export class AppController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Get('users')
  async getHello() {
    if (!(await this.knex.schema.hasTable('users')))
      await this.knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name');
      });

    const users = await this.knex.raw('select * from usuario LIMIT 30;');
    return { users };
  }
}
