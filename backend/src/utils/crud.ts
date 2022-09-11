import { Knex } from 'knex';

export class CRUD {
  constructor(private readonly knex: Knex) {}

  async create(table: string, datas: { [key: string]: any }[]): Promise<any> {
    const keys = Object.keys(datas[0]);

    // (data[0].nome, data[0].email), (...), ...
    const dataFormatted = datas
      .map((data) => '(' + keys.map((key) => `'${data[key]}'`).join(',') + ')')
      .join(',');

    const queryResponse = await this.knex.raw(`
      INSERT INTO ${table} (${keys})
      VALUES ${dataFormatted}
    `);

    return queryResponse;
  }

  async read(table: string, where: string): Promise<any> {
    const queryResponse = await this.knex.raw(`
      SELECT * FROM ${table}
      ${where}
    `);

    return queryResponse.rows;
  }

  async update(
    table: string,
    data: { [key: string]: any },
    where: string,
  ): Promise<any> {
    const keys = Object.keys(data);

    // nome = 'nome', email = 'email'
    const dataFormatted = keys
      .map((key) => `${key} = '${data[key]}'`)
      .join(',');

    const queryResponse = await this.knex.raw(`
      UPDATE ${table}
      SET ${dataFormatted}
      ${where}
    `);

    return queryResponse;
  }

  async delete(table: string, where: string): Promise<any> {
    const queryResponse = await this.knex.raw(`
      DELETE FROM ${table}
      ${where}
    `);

    return queryResponse;
  }
}
