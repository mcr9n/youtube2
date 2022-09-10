import { Knex } from "knex";
import { faker } from '@faker-js/faker';

const USERS = [];

function createRandomUser(){
    return {
      nome: faker.name.fullName(),
      email: faker.internet.email(),
      data_de_criacao: faker.date.past().toISOString(),
    };
}
Array.from({ length: 10 }).forEach(() => {
    USERS.push(createRandomUser());
  });

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`
    DELETE FROM usuario;
    `)
    // Inserts seed entries
    const insert = USERS.map(usuario => `
    insert into usuario(nome, email, data_de_criacao) values('${usuario.nome}', '${usuario.email}', '${usuario.data_de_criacao}');
    `).reduce((usuario, acc) => usuario + acc, '')
    await knex.raw(insert)
};
