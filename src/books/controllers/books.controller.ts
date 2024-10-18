import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Get,
  NotFoundException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../entities/books.entity';

interface UpdateBookDTO {
  title?: string;
  publicationDate?: string;
  authorId?: string;
}

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  //Rota para cadastrar um livro
  @Post()
  async create(
    @Body('bookData') bookData: Partial<Book>,
    @Body('authorId') authorId: string,
  ): Promise<{ message: string; book: Book }> {
    try {
      if (!bookData.title || !bookData.publicationDate) {
        throw new BadRequestException(
          'Error when registering a book, failed credentials.',
        );
      }
      if (!authorId) {
        throw new BadRequestException('Author ID is required.');
      }

      const book = await this.bookService.create(bookData, authorId);

      return {
        message: 'Book created successfully!',
        book: book, // Retorna o livro criado junto com a mensagem
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error when registering a book.');
    }
  }

  //Rota para listar todos os livros
  @Get()
  async findAll(): Promise<Book[]> {
    try {
      const books = await this.bookService.findAll();

      // Verifica se a lista de livros está vazia
      if (books.length === 0) {
        throw new NotFoundException('No books found.');
      }

      return await this.bookService.findAll();
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error when retrieving books.');
    }
  }

  // Rota GET para retornar um livro pelo ID
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; book?: Book }> {
    try {
      const book = await this.bookService.findOne(id);

      if (!book) {
        throw new NotFoundException('Book not found');
      }

      return {
        message: 'Book found successfully',
        book: book,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error when retrieving book.');
    }
  }

  //Rota PUT para atualizar um livro por ID
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bookData: UpdateBookDTO,
  ): Promise<{ message: string; book: Book }> {
    try {
      const updateBook = await this.bookService.update(id, bookData);
      return { message: 'Book updated successfully', book: updateBook };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error when updating the book');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.bookService.remove(id);
      return { message: 'Book deleted successfully' };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error when deleting the book');
    }
  }
}
