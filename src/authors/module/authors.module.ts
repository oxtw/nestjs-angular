import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../entities/author.entity';
import { AuthorsService } from '../services/authors.service';
import { AuthorsController } from '../controllers/authors.controller';
import { BooksModule } from 'src/books/module/books.module';
import { Book } from 'src/books/entities/books.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Author, Book]),
    forwardRef(() => BooksModule),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService, TypeOrmModule],
})
export class AuthorsModule {}
