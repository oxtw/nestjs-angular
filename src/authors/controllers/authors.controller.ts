import { Controller, Post, Body } from '@nestjs/common';
import { AuthorsService } from '../services/authors.service';
import { Author } from '../entities/author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  //Criando rota para criar um author
  @Post()
  async create(@Body() authorData: Partial<Author>): Promise<Author> {
    return this.authorsService.create(authorData);
  }
}
