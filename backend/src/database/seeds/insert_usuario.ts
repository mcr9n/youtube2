import { Knex } from 'knex';
import { Buffer } from 'buffer';
import SeedUtils from '../utils';

const seedUtils = new SeedUtils();

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`
  DELETE FROM ad_has_categoria;
  DELETE FROM video_has_categoria;
  DELETE FROM playlist_has_video;
  DELETE FROM playlist;
  DELETE FROM comentario;
  DELETE FROM likes;
  DELETE FROM assistir_mais_tarde;
  DELETE FROM historico_has_video;
  DELETE FROM historico;
  DELETE FROM post;
  DELETE FROM ad;
  DELETE FROM video;
  DELETE FROM canal;
  DELETE FROM usuario;
  DELETE FROM categoria;
    `);

  // Inserts seed entries
  const userIdsCreated = await seedUtils.insertData(
    knex,
    'usuario',
    seedUtils.createRandomUsers(100),
  );

  const channelIdsCreated = await seedUtils.insertData(
    knex,
    'canal',
    seedUtils.createRandomChannels(5, userIdsCreated),
  );

  const videoIdsCreated = await seedUtils.insertData(
    knex,
    'video',
    seedUtils.createRandomVideos(100, channelIdsCreated),
  );
  const postIdsCreated = await seedUtils.insertData(
    knex,
    'post',
    seedUtils.createRandomPost(5, channelIdsCreated),
  );
  await seedUtils.insertData(
    knex,
    'comentario',
    seedUtils.createRandomComment(5, userIdsCreated, videoIdsCreated),
    false,
  );
  await seedUtils.insertData(
    knex,
    'likes',
    seedUtils.createRandomLike(5, userIdsCreated, videoIdsCreated),
    false,
  );
  await seedUtils.insertData(
    knex,
    'assistir_mais_tarde',
    seedUtils.createRandomWatchLater(5, userIdsCreated, videoIdsCreated),
    false,
  );
  const historyIdsCreated = await seedUtils.insertData(
    knex,
    'historico',
    seedUtils.createRandomHistory(userIdsCreated.length, userIdsCreated),
  );
  await seedUtils.insertData(
    knex,
    'historico_has_video',
    seedUtils.createRandomHistoryHasVideo(
      5,
      videoIdsCreated,
      historyIdsCreated,
    ),
    false,
  );
  const playlistIdsCreated = await seedUtils.insertData(
    knex,
    'playlist',
    seedUtils.createRandomPlaylist(5, userIdsCreated),
  );
  await seedUtils.insertData(
    knex,
    'playlist_has_video',
    seedUtils.createRandomPlaylistHasVideo(
      5,
      playlistIdsCreated,
      videoIdsCreated,
    ),
    false,
  );
  const categoriaIdsCreated = await seedUtils.insertData(
    knex,
    'categoria',
    seedUtils.createRandomCategoria(5),
  );
  await seedUtils.insertData(
    knex,
    'video_has_categoria',
    seedUtils.createRandomVideoHasCategoria(
      5,
      categoriaIdsCreated,
      videoIdsCreated,
    ),
    false,
  );
  const adIdsCreated = await seedUtils.insertData(
    knex,
    'ad',
    seedUtils.createRandomAd(5),
  );
  await seedUtils.insertData(
    knex,
    'ad_has_categoria',
    seedUtils.createRandomAdHasCategoria(5, categoriaIdsCreated, adIdsCreated),
    false,
  );

  // const res = await knex.raw(`select * from video;`);
  // const file = Buffer.from(res.rows[0].thumbnail, 'base64');
  // console.log(file.toString());
}
