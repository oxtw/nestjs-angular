import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Book } from './entities/books.entity';
import { Repository } from 'typeorm';

interface UpdateBookDto {
  title?: string; // campos que podem ser atualizados
  publicationDate?: string; // campos que podem ser atualizados
  authorId?: string; // campo opcional para autor
}

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  // Método para criar um livro
  async create(bookData: Partial<Book>, authorId: string): Promise<Book> {
    const author = await this.authorRepository.findOne({
      where: {
        id: authorId,
      },
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const book = this.bookRepository.create({ ...bookData, author }); // Cria uma instância de Book e associa o livro ao autor
    return await this.bookRepository.save(book); // Salva o livro no banco de dados
  }

  //Método para retornar todos os livros
  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({ relations: ['author'] });
  }

  //Método para buscar um livro por id
  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'], // Carrega o autor relacionado ao livro
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  //Método para atualizar um livro por id
  async update(id: string, bookData: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'], // Carrega o autor relacionado
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // Se authorId for fornecido, busque o autor e atualize o livro
    if (bookData.authorId) {
      const author = await this.authorRepository.findOne({
        where: { id: bookData.authorId },
      });

      if (!author) {
        throw new NotFoundException('Author not found');
      }

      // Atualizando o autor do livro
      book.author = author;
    }

    //Atualizando os dados do livro
    Object.assign(book, bookData);
    return await this.bookRepository.save(book);
  }

  //Método para deletar um livro
  async remove(id: string): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.bookRepository.delete(id);
  }
}
