import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from '../services/books.service';
import { BooksController } from '../controllers/books.controller';
import { Book } from '../entities/books.entity';
import { AuthorsModule } from 'src/authors/module/authors.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
