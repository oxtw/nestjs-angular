import { Author } from 'src/authors/entities/author.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'date' })
  publicationDate: Date;

  @ManyToOne(() => Author, (author) => author.books, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  author: Author;
}
