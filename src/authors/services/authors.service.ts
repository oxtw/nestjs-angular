import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';
import { BooksService } from 'src/books/services/books.service';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
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
}
