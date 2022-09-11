import { faker } from '@faker-js/faker';
import * as path from 'path';
import * as fs from 'fs';
import { Knex } from 'nestjs-knex';

export default class SeedUtils {
  randomArrayElement = (array) =>
    array[Math.floor(Math.random() * array.length)];
  //tentando resolver conflito de chaves
  // combineArrays(arr1: any[], arr2: any[]) {
  //     const [lessLength, moreLength] =
  //       arr1.length < arr2.length ? [arr1, arr2] : [arr2, arr1];

  //     return lessLength.map((e) => {
  //       const index = Math.floor(Math.random() * moreLength.length);
  //       const element = moreLength[index];
  //       moreLength.splice(index, 1);
  //       return [e, element];
  //     });
  //   }

  createRandomUsers(n: number) {
    return Array.from({ length: n }).map(() => ({
      nome: faker.name.firstName(),
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
    return Array.from({ length: n }).map(() => ({
      texto: faker.lorem.sentence(),
      video_id: this.randomArrayElement(video_ids),
      usuario_id: this.randomArrayElement(usuario_ids),
    }));
  }
  createRandomLike(n: number, usuario_ids: number[], video_ids: number[]) {
    return Array.from({ length: n }).map(() => ({
      video_id: this.randomArrayElement(video_ids),
      usuario_id: this.randomArrayElement(usuario_ids),
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
    return Array.from({ length: n }).map((e, i) => ({
      data_e_hora: faker.date.past().toISOString(),
      video_id: this.randomArrayElement(video_ids),
      historico_id: this.randomArrayElement(historico_ids),
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
    return Array.from({ length: n }).map((e, i) => ({
      video_id: this.randomArrayElement(video_ids),
      playlist_id: this.randomArrayElement(playlist_ids),
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
    return Array.from({ length: n }).map((e, i) => ({
      video_id: this.randomArrayElement(video_ids),
      categoria_id: this.randomArrayElement(categoria_ids),
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
    return Array.from({ length: n }).map((e, i) => ({
      ad_id: this.randomArrayElement(ad_ids),
      categoria_id: this.randomArrayElement(categoria_ids),
    }));
  }

  async insertData(
    knex: Knex,
    table: string,
    datas: { [key: string]: any }[],
    has_id: boolean = true,
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
