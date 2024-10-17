import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { Book } from '../../books/entities/books.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  // Método para criar um autor
  async create(authorData: Partial<Author>): Promise<Author> {
    const author = this.authorRepository.create(authorData); // Cria uma instância de Author
    return this.authorRepository.save(author); // Salva o autor no banco de dados
  }
}
