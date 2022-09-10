import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';
import { Buffer } from 'buffer';

const randomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

function createRandomUsers(n) {
  return Array.from({ length: n }).map(() => ({
    nome: faker.name.fullName(),
    email: faker.internet.email(),
    data_de_criacao: faker.date.past().toISOString(),
  }));
}

function createRandomChannels(n, usuario_ids: number[]) {
  return Array.from({ length: n }).map((e, i) => ({
    nome: faker.internet.userName(),
    sobre: faker.lorem.sentence(),
    usuario_id: usuario_ids[i],
  }));
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function createRandomVideos(n, canal_ids: number[]) {
  const qualities = [144, 360, 480, 720, 1080];

  const filePath = path.resolve(__dirname, '..', 'images', 'apple.jpg');
  let file;
  fs.readFile(filePath, function (err, buffer) {
    file = buffer;
  });

  console.log(file);

  return Array.from({ length: n }).map(() => ({
    titulo: faker.lorem.sentence(),
    duracao: faker.random.numeric(3),
    qualidade: randomArrayElement(qualities),
    thumbnail: file, // bytea
    data_de_criacao: faker.date.past().toISOString(),
    canal_id: randomArrayElement(canal_ids),
  }));
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`
    DELETE FROM video;
    DELETE FROM canal;
    DELETE FROM usuario;
    `);
  // Inserts seed entries
  const insertQueryUsers = createRandomUsers(5)
    .map(
      (usuario) => `
      insert into usuario(nome, email, data_de_criacao) 
      values('${usuario.nome}', '${usuario.email}', '${usuario.data_de_criacao}') 
      RETURNING id;
    `,
    )
    .reduce((usuario, acc) => usuario + acc, '');
  const userIdsCreated = (await knex.raw(insertQueryUsers)).map(
    (user) => user.rows[0].id,
  );

  const insertQueryChannels = createRandomChannels(5, userIdsCreated)
    .map(
      (canal) => `
      insert into canal(nome, sobre, usuario_id)
      values('${canal.nome}', '${canal.sobre}', '${canal.usuario_id}')
      RETURNING id;
    `,
    )
    .reduce((canal, acc) => canal + acc, '');
  const channelIdsCreated = (await knex.raw(insertQueryChannels)).map(
    (channel) => channel.rows[0].id,
  );

  const insertQueryVideos = createRandomVideos(1, channelIdsCreated)
    .map(
      (video) => `
      insert into video(titulo, duracao, qualidade, thumbnail, data_de_criacao, canal_id)
      values('${video.titulo}', '${video.duracao}', '${video.qualidade}', '${video.thumbnail}', '${video.data_de_criacao}', '${video.canal_id}')
      RETURNING id;
    `,
    )
    .reduce((video, acc) => video + acc, '');
  const videoIdsCreated = await knex.raw(insertQueryVideos);

  const res = await knex.raw(`select * from video;`);
  console.log(new Buffer(res.rows[0].thumbnail).toString('base64url'));
  // .map(
  //   (video) => video.rows[0].id,
  // );
}
