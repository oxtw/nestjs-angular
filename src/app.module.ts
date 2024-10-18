import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/books.entity';
import { AuthorsController } from './authors/controllers/authors.controller';
import { AuthorsService } from './authors/services/authors.service';
import { ConfigModule } from '@nestjs/config';
import { BooksController } from './books/controllers/books.controller';
import { BooksService } from './books/books.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Garante que as variáveis de ambiente serão acessíveis em todo o app
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_URL,
      entities: [Book, Author],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Book, Author]),
  ],
  controllers: [AuthorsController, BooksController],
  providers: [AuthorsService, BooksService],
})
export class AppModule {}
