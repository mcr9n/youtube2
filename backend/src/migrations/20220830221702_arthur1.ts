import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE usuario (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(45) NOT NULL,
      email VARCHAR(45) NOT NULL,
      data_de_criacao TIMESTAMP
    );
    
    CREATE TABLE canal (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(45) NOT NULL,
      sobre VARCHAR(45) NOT NULL,
    
      usuario_id INTEGER REFERENCES usuario (id)
    );
    
    CREATE TABLE video (
      id SERIAL PRIMARY KEY,
      titulo VARCHAR(45) NOT NULL,
      duracao INTEGER NOT NULL,
      qualidade INTEGER NOT NULL,
      thumbnail BYTEA NOT NULL,
      data_de_criacao TIMESTAMP,
    
      canal_id INTEGER REFERENCES canal (id)
    );
    
    CREATE TABLE playlist (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(45) NOT NULL,
    
      usuario_id INTEGER REFERENCES usuario (id)
    );
    
    CREATE TABLE playlist_has_video (
      playlist_id INTEGER REFERENCES playlist (id),
      video_id INTEGER REFERENCES video (id)
    );
    
    ALTER TABLE playlist_has_video
      ADD PRIMARY KEY (playlist_id, video_id);
    
    CREATE TABLE categoria (
      id SERIAL PRIMARY KEY,
      descricao VARCHAR(45) NOT NULL
    );
    
    CREATE TABLE video_has_categoria (
      categoria_id INTEGER REFERENCES categoria (id),
      video_id INTEGER REFERENCES video (id)
    );
    
    ALTER TABLE video_has_categoria
      ADD PRIMARY KEY (categoria_id, video_id);
    
    CREATE TABLE ad (
      id SERIAL PRIMARY KEY,
      duracao INTEGER NOT NULL
    );
    
    CREATE TABLE ad_has_categoria (
      categoria_id INTEGER REFERENCES categoria (id),
      ad_id INTEGER REFERENCES ad (id)
    );
    
    ALTER TABLE ad_has_categoria
      ADD PRIMARY KEY (categoria_id, ad_id);
    
    CREATE TABLE historico (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER REFERENCES usuario (id)
    );
    
    CREATE TABLE historico_has_video (
      historico_id INTEGER REFERENCES historico (id),
      video_id INTEGER REFERENCES video (id),
      data_e_hora TIMESTAMP
    );
    
    ALTER TABLE historico_has_video
      ADD PRIMARY KEY (historico_id, video_id);
    
    CREATE TABLE likes (
      usuario_id INTEGER REFERENCES usuario (id),
      video_id INTEGER REFERENCES video (id)
    );
    
    ALTER TABLE likes
      ADD PRIMARY KEY (usuario_id, video_id);
    
    CREATE TABLE assistir_mais_tarde (
      usuario_id INTEGER REFERENCES usuario (id),
      video_id INTEGER REFERENCES video (id)
    );
    
    ALTER TABLE assistir_mais_tarde
      ADD PRIMARY KEY (usuario_id, video_id);
    
    CREATE TABLE comentario (
      usuario_id INTEGER REFERENCES usuario (id),
      video_id INTEGER REFERENCES video (id),
      texto VARCHAR(45) NOT NULL
    );
    
    ALTER TABLE comentario
      ADD PRIMARY KEY (usuario_id, video_id);
    
    CREATE TABLE post (
      id SERIAL PRIMARY KEY,
      texto VARCHAR(45) NOT NULL,
    
      canal_id INTEGER REFERENCES canal (id)
    );  
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE IF EXISTS usuario;
    DROP TABLE IF EXISTS canal;
    DROP TABLE IF EXISTS video;
    DROP TABLE IF EXISTS playlist;
    DROP TABLE IF EXISTS playlist_has_video;
    DROP TABLE IF EXISTS categoria;
    DROP TABLE IF EXISTS video_has_categoria;
    DROP TABLE IF EXISTS ad;
    DROP TABLE IF EXISTS ad_has_categoria;
    DROP TABLE IF EXISTS historico;
    DROP TABLE IF EXISTS historico_has_video;
    DROP TABLE IF EXISTS likes;
    DROP TABLE IF EXISTS assistir_mais_tarde;
    DROP TABLE IF EXISTS comentario;
    DROP TABLE IF EXISTS canal;
    DROP TABLE IF EXISTS post;
  `);
}
