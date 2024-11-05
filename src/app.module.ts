import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animals } from './entities/Animals';
import { Team } from './entities/Team';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      //host: '127.0.0.1',
      host: 'mysql.railway.internal',
      port: 3306,
      username: 'root',
      password: 'iHOJUULvyXgTIvUmwEbBqcyKgRGSuUuP',
      database: 'railway',
      entities: [Animals, Team],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Animals, Team]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
