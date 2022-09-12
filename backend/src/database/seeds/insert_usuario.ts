import { Knex } from 'knex';
import SeedUtils from '../utils';

const seedUtils = new SeedUtils();

export async function seed(knex: Knex): Promise<void> {
  const QUANT_USUARIO = 10000;

  const QUANTS = {
    usuario: QUANT_USUARIO,
    canal: QUANT_USUARIO,
    video: 10000,
    video_has_categoria: 100000,
    ad: 100,
    ad_has_categoria: 100,
    categoria: 100,
    post: 5000,
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
  console.log(`${QUANTS.usuario} usuario criados`);

  const channelIdsCreated = await seedUtils.insertData(
    knex,
    'canal',
    seedUtils.createRandomChannels(QUANTS.canal, userIdsCreated),
  );
  console.log(`${QUANTS.canal} canal criados`);

  const videoIdsCreated = await seedUtils.insertData(
    knex,
    'video',
    seedUtils.createRandomVideos(QUANTS.video, channelIdsCreated),
  );
  console.log(`${QUANTS.video} video criados`);

  await seedUtils.insertData(
    knex,
    'post',
    seedUtils.createRandomPost(QUANTS.post, channelIdsCreated),
  );
  console.log(`${QUANTS.post} post criados`);

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
  console.log(`${QUANTS.comentario} comentario criados`);

  await seedUtils.insertData(
    knex,
    'likes',
    seedUtils.createRandomLike(QUANTS.likes, userIdsCreated, videoIdsCreated),
    false,
  );
  console.log(`${QUANTS.likes} likes criados`);

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
  console.log(`${QUANTS.assistir_mais_tarde} assistir_mais_tarde criados`);

  const historyIdsCreated = await seedUtils.insertData(
    knex,
    'historico',
    seedUtils.createRandomHistory(userIdsCreated.length, userIdsCreated),
  );
  console.log(`${QUANTS.historico} historico criados`);

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
  console.log(`${QUANTS.historico_has_video} historico_has_video criados`);

  const playlistIdsCreated = await seedUtils.insertData(
    knex,
    'playlist',
    seedUtils.createRandomPlaylist(QUANTS.playlist, userIdsCreated),
  );
  console.log(`${QUANTS.playlist} playlist criados`);

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
  console.log(`${QUANTS.playlist_has_video} playlist_has_video criados`);

  const categoriaIdsCreated = await seedUtils.insertData(
    knex,
    'categoria',
    seedUtils.createRandomCategoria(QUANTS.categoria),
  );
  console.log(`${QUANTS.categoria} categoria criados`);

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
  console.log(`${QUANTS.video_has_categoria} video_has_categoria criados`);

  const adIdsCreated = await seedUtils.insertData(
    knex,
    'ad',
    seedUtils.createRandomAd(QUANTS.ad),
  );
  console.log(`${QUANTS.ad} ad criados`);

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
  console.log(`${QUANTS.ad_has_categoria} ad_has_categoria criados`);

  // const res = await knex.raw(`select * from video;`);
  // const file = Buffer.from(res.rows[0].thumbnail, 'base64');
  // console.log(file.toString());
}
