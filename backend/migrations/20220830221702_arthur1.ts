import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.raw(`
      CREATE TABLE categoria (
        id SERIAL PRIMARY KEY,
        descricao VARCHAR(45) NOT NULL
      );
    `)
}


export async function down(knex: Knex): Promise<void> {
    return await knex.raw(`
    DROP TABLE IF EXISTS categoria;
    `)
}

