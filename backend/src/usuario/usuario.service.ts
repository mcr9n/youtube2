import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CRUD } from '../utils';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  CRUD: CRUD;

  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex);
  }

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.CRUD.create('usuario', createUsuarioDto);
  }

  findOne(id: number) {
    return this.CRUD.read('usuario', `where id = ${id}`);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.CRUD.update('usuario', updateUsuarioDto, `where id = ${id}`);
  }

  remove(id: number) {
    return this.CRUD.delete('usuario', `where id = ${id}`);
  }
}
