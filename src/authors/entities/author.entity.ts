import { Book } from 'src/books/entities/books.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
