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
    return this.CRUD.create('video', {
      ...createVideoDto,
      thumbnail: createVideoDto.thumbnail.buffer.toString('base64'),
    });
  }

  async findAll() {
    const videos = await this.CRUD.read(
      'videos_com_likes_e_comms',
      ' order by data_de_criacao DESC limit 100',
    );
    return videos;
  }

  async findOne(id: number) {
    const video = await this.CRUD.read('video', `where video.id = ${id}`);
    return video;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return this.CRUD.update('video', updateVideoDto, `where video.id = ${id}`);
  }

  remove(id: number) {
    return this.CRUD.delete('video', `where video.id = ${id}`);
  }
}
