import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './authors/entities/author.entity';
import { Book } from './books/entities/books.entity';
import { AuthorsController } from './authors/controllers/authors.controller';
import { AuthorsService } from './authors/services/authors.service';
import { ConfigModule } from '@nestjs/config';

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
      // extra: {
      //   connectionTimeout: 30000, // em milissegundos
      // },
    }),
    TypeOrmModule.forFeature([Book, Author]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AppModule {}
