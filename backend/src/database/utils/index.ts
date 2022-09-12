import { faker } from '@faker-js/faker';
import * as path from 'path';
import * as fs from 'fs';
import { Knex } from 'nestjs-knex';

export default class SeedUtils {
  randomArrayElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

  combineUniqueArrays(n: number, arr1: any[], arr2: any[]): [number, number][] {
    const combinations = new Set<string>();

    for (let i = 0; i < n; i++) {
      const randomElem1 = Math.floor(Math.random() * arr1.length);
      const randomElem2 = Math.floor(Math.random() * arr2.length);

      combinations.add([arr1[randomElem1], arr2[randomElem2]].toString());
    }

    return Array.from(combinations).map(
      (combination) => combination.split(',').map(Number) as [number, number],
    );
  }

  createRandomUsers(n: number) {
    return Array.from({ length: n }).map(() => ({
      nome: faker.name.fullName().replace(/'/g, ''),
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

  createRandomPost(n: number, canal_ids: number[]) {
    return Array.from({ length: n }).map(() => ({
      texto: faker.lorem.sentence(),
      canal_id: this.randomArrayElement(canal_ids),
    }));
  }

  createRandomComment(n: number, usuario_ids: number[], video_ids: number[]) {
    const idsCombination = this.combineUniqueArrays(n, usuario_ids, video_ids);

    return idsCombination.map(([usuario_id, video_id]) => ({
      texto: faker.lorem.sentence(),
      video_id: video_id,
      usuario_id: usuario_id,
    }));
  }

  createRandomLike(n: number, usuario_ids: number[], video_ids: number[]) {
    const idsCombination = this.combineUniqueArrays(n, usuario_ids, video_ids);

    return idsCombination.map(([usuario_id, video_id]) => ({
      video_id: video_id,
      usuario_id: usuario_id,
    }));
  }

  createRandomWatchLater(
    n: number,
    usuario_ids: number[],
    video_ids: number[],
  ) {
    return Array.from({ length: n }).map(() => ({
      video_id: this.randomArrayElement(video_ids),
      usuario_id: this.randomArrayElement(usuario_ids),
    }));
  }

  createRandomHistory(n: number, usuario_ids: number[]) {
    return Array.from({ length: n }).map((e, i) => ({
      usuario_id: usuario_ids[i],
    }));
  }

  createRandomHistoryHasVideo(
    n: number,
    video_ids: number[],
    historico_ids: number[],
  ) {
    const idsCombination = this.combineUniqueArrays(
      n,
      video_ids,
      historico_ids,
    );

    return idsCombination.map(([video_id, historico_id]) => ({
      data_e_hora: faker.date.past().toISOString(),
      video_id: video_id,
      historico_id: historico_id,
    }));
  }

  createRandomPlaylist(n: number, usuario_ids: number[]) {
    return Array.from({ length: n }).map((e, i) => ({
      nome: faker.music.genre(),
      usuario_id: this.randomArrayElement(usuario_ids),
    }));
  }

  createRandomPlaylistHasVideo(
    n: number,
    playlist_ids: number[],
    video_ids: number[],
  ) {
    const idsCombination = this.combineUniqueArrays(n, playlist_ids, video_ids);

    return idsCombination.map(([playlist_id, video_id]) => ({
      video_id: video_id,
      playlist_id: playlist_id,
    }));
  }

  createRandomCategoria(n: number) {
    return Array.from({ length: n }).map((e, i) => ({
      descricao: faker.music.genre(),
    }));
  }

  createRandomVideoHasCategoria(
    n: number,
    categoria_ids: number[],
    video_ids: number[],
  ) {
    const idsCombination = this.combineUniqueArrays(
      n,
      categoria_ids,
      video_ids,
    );

    return idsCombination.map(([categoria_id, video_id]) => ({
      video_id: video_id,
      categoria_id: categoria_id,
    }));
  }

  createRandomAd(n: number) {
    return Array.from({ length: n }).map(() => ({
      duracao: faker.random.numeric(3),
    }));
  }

  createRandomAdHasCategoria(
    n: number,
    categoria_ids: number[],
    ad_ids: number[],
  ) {
    const idsCombination = this.combineUniqueArrays(n, categoria_ids, ad_ids);

    return idsCombination.map(([categoria_id, ad_id]) => ({
      ad_id: ad_id,
      categoria_id: categoria_id,
    }));
  }

  async insertData(
    knex: Knex,
    table: string,
    datas: { [key: string]: any }[],
    has_id = true,
  ): Promise<number[]> {
    const keys = Object.keys(datas[0]);

    // (data[0].nome, data[0].email), (...), ...
    const dataFormatted = datas
      .map((data) => '(' + keys.map((key) => `'${data[key]}'`).join(',') + ')')
      .join(',');

    const queryResponse = await knex.raw(
      `
      INSERT INTO ${table} (${keys})
      VALUES ${dataFormatted}
    ` + (has_id ? `RETURNING id;` : `;`),
    );

    return queryResponse.rows.map((data) => data.id);
  }
}
