import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [KnexModule.forRoot({
    config: {
      client: "pg",
      connection: 'postgresql://postgres:postgres@localhost/youtube2',

    },
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
