import { Knex } from 'knex';

export class CRUD {
  constructor(private readonly knex: Knex) {}

  async create(table: string, data: { [key: string]: any }): Promise<any> {
    const keys = Object.keys(data);

    // (data.nome, data.email, ...)
    const dataFormatted =
      '(' + keys.map((key) => `'${data[key]}'`).join(',') + ')';

    const queryResponse = await this.knex.raw(`
      INSERT INTO ${table} (${keys})
      VALUES ${dataFormatted}
      RETURNING *
    `);

    return queryResponse.rows[0];
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
      RETURNING *
    `);

    return queryResponse.rows[0];
  }

  async delete(table: string, where: string): Promise<any> {
    const queryResponse = await this.knex.raw(`
      DELETE FROM ${table}
      ${where}
      RETURNING *
      `);

    return queryResponse.rows;
  }
}
