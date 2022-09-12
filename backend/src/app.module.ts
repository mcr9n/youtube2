import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { VideoModule } from './video/video.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: 'postgresql://postgres:postgres@localhost/youtube2',
      },
    }),
    UsuarioModule,
    VideoModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
