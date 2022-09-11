import { Knex } from 'knex';
import { Buffer } from 'buffer';
import SeedUtils from '../utils';

const seedUtils = new SeedUtils();

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`
    DELETE FROM video;
    DELETE FROM canal;
    DELETE FROM usuario;
    `);

  // Inserts seed entries
  const userIdsCreated = await seedUtils.insertData(
    knex,
    'usuario',
    seedUtils.createRandomUsers(5),
  );

  const channelIdsCreated = await seedUtils.insertData(
    knex,
    'canal',
    seedUtils.createRandomChannels(5, userIdsCreated),
  );

  const videoIdsCreated = await seedUtils.insertData(
    knex,
    'video',
    seedUtils.createRandomVideos(1, channelIdsCreated),
  );

  // const res = await knex.raw(`select * from video;`);
  // const file = Buffer.from(res.rows[0].thumbnail, 'base64');
  // console.log(file.toString());
}
