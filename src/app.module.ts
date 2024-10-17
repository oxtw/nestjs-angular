import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/books.entity';
import { AuthorsController } from './authors/controllers/authors.controller';
import { AuthorsService } from './authors/services/authors.service';

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
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AppModule {}
