import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CRUD } from '../utils/crud';

import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  CRUD: CRUD;

  constructor(@InjectKnex() private readonly knex: Knex) {
    this.knex = knex;
    this.CRUD = new CRUD(this.knex);
  }

  create(createVideoDto: CreateVideoDto) {
    return this.CRUD.create('video', createVideoDto);
  }

  findAll() {
    return this.CRUD.read('videos_com_likes', ' order by data_de_criacao DESC limit 50');
  }

  findOne(id: number) {
    return this.CRUD.read('video', `where video.id = ${id}`);
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.CRUD.update('video', updateVideoDto, `where video.id = ${id}`);
  }

  remove(id: number) {
    return this.CRUD.delete('video', `where video.id = ${id}` );
  }
}