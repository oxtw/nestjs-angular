import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev.db',
      entities: [Book, Author],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Book, Author]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
