import { Knex } from 'knex';
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

  const QUANT_USUARIO = 10000;

  const QUANTS = {
    usuario: QUANT_USUARIO,
    canal: QUANT_USUARIO,
    video: 10000,
    video_has_categoria: 100000,
    ad: 100,
    ad_has_categoria: 100,
    categoria: 100,
    post: 10000,
    historico: QUANT_USUARIO,
    historico_has_video: 100000,
    assistir_mais_tarde: 1000,
    likes: 100000,
    comentario: 100000,
    playlist: 100,
    playlist_has_video: 1000,
  };

  // Inserts seed entries
  const userIdsCreated = await seedUtils.insertData(
    knex,
    'usuario',
    seedUtils.createRandomUsers(QUANTS.usuario),
  );

  const channelIdsCreated = await seedUtils.insertData(
    knex,
    'canal',
    seedUtils.createRandomChannels(QUANTS.canal, userIdsCreated),
  );

  const videoIdsCreated = await seedUtils.insertData(
    knex,
    'video',
    seedUtils.createRandomVideos(QUANTS.video, channelIdsCreated),
  );

  await seedUtils.insertData(
    knex,
    'post',
    seedUtils.createRandomPost(QUANTS.post, channelIdsCreated),
  );

  await seedUtils.insertData(
    knex,
    'comentario',
    seedUtils.createRandomComment(
      QUANTS.comentario,
      userIdsCreated,
      videoIdsCreated,
    ),
    false,
  );

  await seedUtils.insertData(
    knex,
    'likes',
    seedUtils.createRandomLike(QUANTS.likes, userIdsCreated, videoIdsCreated),
    false,
  );

  await seedUtils.insertData(
    knex,
    'assistir_mais_tarde',
    seedUtils.createRandomWatchLater(
      QUANTS.assistir_mais_tarde,
      userIdsCreated,
      videoIdsCreated,
    ),
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
      QUANTS.historico_has_video,
      videoIdsCreated,
      historyIdsCreated,
    ),
    false,
  );

  const playlistIdsCreated = await seedUtils.insertData(
    knex,
    'playlist',
    seedUtils.createRandomPlaylist(QUANTS.playlist, userIdsCreated),
  );

  await seedUtils.insertData(
    knex,
    'playlist_has_video',
    seedUtils.createRandomPlaylistHasVideo(
      QUANTS.playlist_has_video,
      playlistIdsCreated,
      videoIdsCreated,
    ),
    false,
  );

  const categoriaIdsCreated = await seedUtils.insertData(
    knex,
    'categoria',
    seedUtils.createRandomCategoria(QUANTS.categoria),
  );

  await seedUtils.insertData(
    knex,
    'video_has_categoria',
    seedUtils.createRandomVideoHasCategoria(
      QUANTS.video_has_categoria,
      categoriaIdsCreated,
      videoIdsCreated,
    ),
    false,
  );

  const adIdsCreated = await seedUtils.insertData(
    knex,
    'ad',
    seedUtils.createRandomAd(QUANTS.ad),
  );

  await seedUtils.insertData(
    knex,
    'ad_has_categoria',
    seedUtils.createRandomAdHasCategoria(
      QUANTS.ad_has_categoria,
      categoriaIdsCreated,
      adIdsCreated,
    ),
    false,
  );

  // const res = await knex.raw(`select * from video;`);
  // const file = Buffer.from(res.rows[0].thumbnail, 'base64');
  // console.log(file.toString());
}
