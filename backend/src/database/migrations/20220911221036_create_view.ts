import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE VIEW videos_com_likes AS
    select video.*, count(likes.video_id) as likes
    from video
    left outer join likes on video.id = likes.video_id
    group by video.id
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    drop view videos_com_likes;

  `);
}
