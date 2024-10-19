import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { BooksService } from 'src/books/services/books.service';
import { UpdateAuthorDto } from '../dto/author.dto';
import { Book } from 'src/books/entities/books.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    private readonly booksService: BooksService, // Injetando o BooksService
  ) {}

  // Método para criar um autor
  async create(authorData: Partial<Author>): Promise<Author> {
    const author = this.authorRepository.create(authorData); // Cria uma instância de Author
    return this.authorRepository.save(author); // Salva o author no banco de dados
  }

  //Método para retornar todos os autores
  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  //Método para encontrar um author por id
  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: {
        id,
      },
    });
    return author;
  }

  //Método para atualizar um author específico por id
  async update(id: string, authorData: Partial<Author>): Promise<Author> {
    console.log(id, authorData);
    await this.authorRepository.update(id, authorData);
    return this.authorRepository.findOne({
      where: {
        id,
      },
    });
  }

  //Método para deletar um Author por ID
  async remove(id: string): Promise<void> {
    const author = await this.authorRepository.findOne({
      where: {
        id,
      },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    await this.authorRepository.delete(author.id);
  }

  async updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException('Author not found!');
    }

    // Atualizando os campos do autor se eles existirem no DTO
    if (updateAuthorDto.name) {
      author.name = updateAuthorDto.name;
    }
    if (updateAuthorDto.birthDate) {
      author.birthDate = updateAuthorDto.birthDate;
    }

    // Atualizando os livros
    if (updateAuthorDto.books && updateAuthorDto.books.length > 0) {
      for (const updatedBook of updateAuthorDto.books) {
        const book = author.books.find((b) => b.id === updatedBook.id);
        if (book) {
          // Se o livro já existe, atualiza os campos
          if (updatedBook.title) {
            book.title = updatedBook.title;
          }
          if (updatedBook.publicationDate) {
            book.publicationDate = updatedBook.publicationDate;
          }
          await this.bookRepository.save(book); // Salva as alterações do livro
        } else {
          // Se o livro não existe (sem ID), cria um novo
          const newBook = this.bookRepository.create({
            ...updatedBook,
            author,
          });
          author.books.push(newBook);
          await this.bookRepository.save(newBook);
        }
      }
    }
    await this.authorRepository.save(author);
    return author;
  }
}
