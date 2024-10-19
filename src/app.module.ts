import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/books.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthorsModule } from './authors/module/authors.module';
import { BooksModule } from './books/module/books.module';

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
    AuthorsModule,
    BooksModule,
  ],
})
export class AppModule {}
