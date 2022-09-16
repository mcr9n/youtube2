import { Transform } from 'class-transformer';

export class CreateVideoDto {
  @Transform(({ value }) => parseInt(value))
  titulo: number;

  duracao: string;

  @Transform(({ value }) => parseInt(value))
  qualidade: number;

  data_de_criacao: Date;

  thumbnail: Express.Multer.File;
}
