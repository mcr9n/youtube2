import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // CREATE VIEW videos_com_likes AS
  // select video.*, count(likes.video_id) as likes
  // from video
  // left outer join likes on video.id = likes.video_id
  // group by video.id;

  // select video.id, count(comentario.video_id) as comentario
  // from video
  // left outer join comentario on video.id = comentario.video_id
  // group by video.id;
  return knex.raw(`
    CREATE VIEW videos_com_likes_e_comms AS
      select video_l.*, count(comentario.video_id) as comentarios
        from (
          select video.*, count(likes.video_id) as likes
          from video
          left join likes on video.id = likes.video_id
          group by video.id
        ) video_l
      left join comentario on video_l.id = comentario.video_id
      group by 
        video_l.id, 
        video_l.titulo, 
        video_l.duracao, 
        video_l.qualidade, 
        video_l.thumbnail,
        video_l.data_de_criacao, 
        video_l.canal_id,
        video_l.likes;
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop view if exists videos_com_likes_e_comms;

  `);
}
