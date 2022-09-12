import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CRUD } from '../utils';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  CRUD: CRUD;

  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex);
  }

  create(createPostDto: CreatePostDto) {
    return this.CRUD.create('post', createPostDto);
  }

  findAll(canal_id: number) {
    return this.CRUD.read('post', `WHERE canal_id = ${canal_id}`);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.CRUD.update('post', updatePostDto, `WHERE id = ${id}`);
  }

  remove(id: number) {
    return this.CRUD.delete('post', `WHERE id = ${id}`);
  }
}
