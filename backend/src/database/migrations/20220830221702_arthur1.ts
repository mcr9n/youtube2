import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE usuario (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      data_de_criacao TIMESTAMP
    );
    
    CREATE TABLE canal (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      sobre VARCHAR(255) NOT NULL,
    
      usuario_id INTEGER REFERENCES usuario (id) ON DELETE CASCADE
    );
    
    CREATE TABLE video (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(255) NOT NULL,
      duracao INTEGER NOT NULL,
      qualidade INTEGER NOT NULL,
      thumbnail BYTEA NOT NULL,
      data_de_criacao TIMESTAMP,
    
      canal_id INTEGER REFERENCES canal (id) ON DELETE CASCADE
    );
    
    CREATE TABLE playlist (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
    
      usuario_id INTEGER REFERENCES usuario (id) ON DELETE CASCADE
    );
    
    CREATE TABLE playlist_has_video (
      playlist_id INTEGER REFERENCES playlist (id) ON DELETE CASCADE,
      video_id INTEGER REFERENCES video (id) ON DELETE CASCADE
    );
    
    ALTER TABLE playlist_has_video
      ADD PRIMARY KEY (playlist_id, video_id);
    
    CREATE TABLE categoria (
      id SERIAL PRIMARY KEY,
      descricao VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE video_has_categoria (
      categoria_id INTEGER REFERENCES categoria (id) ON DELETE CASCADE,
      video_id INTEGER REFERENCES video (id) ON DELETE CASCADE
    );
    
    ALTER TABLE video_has_categoria
      ADD PRIMARY KEY (categoria_id, video_id);
    
    CREATE TABLE ad (
      id SERIAL PRIMARY KEY,
      duracao INTEGER NOT NULL
    );
    
    CREATE TABLE ad_has_categoria (
      categoria_id INTEGER REFERENCES categoria (id) ON DELETE CASCADE,
      ad_id INTEGER REFERENCES ad (id) ON DELETE CASCADE
    );
    
    ALTER TABLE ad_has_categoria
      ADD PRIMARY KEY (categoria_id, ad_id);
    
    CREATE TABLE historico (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER REFERENCES usuario (id) ON DELETE CASCADE
    );
    
    CREATE TABLE historico_has_video (
      historico_id INTEGER REFERENCES historico (id) ON DELETE CASCADE,
      video_id INTEGER REFERENCES video (id) ON DELETE CASCADE,
      data_e_hora TIMESTAMP
    );
    
    ALTER TABLE historico_has_video
      ADD PRIMARY KEY (historico_id, video_id);
    
    CREATE TABLE likes (
      usuario_id INTEGER REFERENCES usuario (id) ON DELETE CASCADE,
      video_id INTEGER REFERENCES video (id) ON DELETE CASCADE
    );
    
    ALTER TABLE likes
      ADD PRIMARY KEY (usuario_id, video_id);
    
    CREATE TABLE assistir_mais_tarde (
      usuario_id INTEGER REFERENCES usuario (id) ON DELETE CASCADE,
      video_id INTEGER REFERENCES video (id) ON DELETE CASCADE
    );
    
    ALTER TABLE assistir_mais_tarde
      ADD PRIMARY KEY (usuario_id, video_id);
    
    CREATE TABLE comentario (
      usuario_id INTEGER REFERENCES usuario (id) ON DELETE CASCADE,
      video_id INTEGER REFERENCES video (id) ON DELETE CASCADE,
      texto VARCHAR(255) NOT NULL
    );
    
    ALTER TABLE comentario
      ADD PRIMARY KEY (usuario_id, video_id);
    
    CREATE TABLE post (
      id SERIAL PRIMARY KEY,
      texto VARCHAR(255) NOT NULL,
    
      canal_id INTEGER REFERENCES canal (id) ON DELETE CASCADE
    );  
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE IF EXISTS video CASCADE;
    DROP TABLE IF EXISTS canal CASCADE;
    DROP TABLE IF EXISTS usuario CASCADE;
    DROP TABLE IF EXISTS playlist CASCADE;
    DROP TABLE IF EXISTS playlist_has_video CASCADE;
    DROP TABLE IF EXISTS categoria CASCADE;
    DROP TABLE IF EXISTS video_has_categoria CASCADE;
    DROP TABLE IF EXISTS ad CASCADE;
    DROP TABLE IF EXISTS ad_has_categoria CASCADE;
    DROP TABLE IF EXISTS historico CASCADE;
    DROP TABLE IF EXISTS historico_has_video CASCADE;
    DROP TABLE IF EXISTS likes CASCADE;
    DROP TABLE IF EXISTS assistir_mais_tarde CASCADE;
    DROP TABLE IF EXISTS comentario CASCADE;
    DROP TABLE IF EXISTS canal CASCADE;
    DROP TABLE IF EXISTS post CASCADE;
  `);
}
