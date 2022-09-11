import { faker } from '@faker-js/faker';
import * as path from 'path';
import * as fs from 'fs';
import { Knex } from 'nestjs-knex';

export default class SeedUtils {
  randomArrayElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

  createRandomUsers(n: number) {
    return Array.from({ length: n }).map(() => ({
      nome: faker.name.fullName(),
      email: faker.internet.email(),
      data_de_criacao: faker.date.past().toISOString(),
    }));
  }

  createRandomChannels(n: number, usuario_ids: number[]) {
    return Array.from({ length: n }).map((e, i) => ({
      nome: faker.internet.userName(),
      sobre: faker.lorem.sentence(),
      usuario_id: usuario_ids[i],
    }));
  }

  createRandomVideos(n: number, canal_ids: number[]) {
    const qualities = [144, 360, 480, 720, 1080];

    const filePath = path.resolve(__dirname, '..', 'images', 'apple.jpg');
    const file = fs.readFileSync(filePath, { encoding: 'base64' });

    return Array.from({ length: n }).map(() => ({
      titulo: faker.lorem.sentence(),
      duracao: faker.random.numeric(3),
      qualidade: this.randomArrayElement(qualities),
      thumbnail: file, // bytea
      data_de_criacao: faker.date.past().toISOString(),
      canal_id: this.randomArrayElement(canal_ids),
    }));
  }

  async insertData(
    knex: Knex,
    table: string,
    datas: { [key: string]: any }[],
  ): Promise<number[]> {
    const keys = Object.keys(datas[0]);

    // (data[0].nome, data[0].email), (...), ...
    const dataFormatted = datas
      .map((data) => '(' + keys.map((key) => `'${data[key]}'`).join(',') + ')')
      .join(',');

    const queryResponse = await knex.raw(`
      INSERT INTO ${table} (${keys})
      VALUES ${dataFormatted}
      RETURNING id;
    `);

    return queryResponse.rows.map((data) => data.id);
  }
}
