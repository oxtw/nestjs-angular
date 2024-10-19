import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Put,
  Delete,
  InternalServerErrorException,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { AuthorsService } from '../services/authors.service';
import { Author } from '../entities/author.entity';
import { UpdateAuthorDto } from '../dto/author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  // CRUD Authors

  // Rota para criar um autor
  @Post()
  async create(@Body() authorData: Partial<Author>): Promise<Author> {
    try {
      if (!authorData.name || !authorData.birthDate) {
        throw new BadRequestException('Name and birthDate are required');
      }
      return await this.authorsService.create(authorData);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating author: ' + error.message,
      );
    }
  }

  // Rota para retornar todos os autores
  @Get()
  async findAll(): Promise<Author[]> {
    try {
      return await this.authorsService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving authors: ' + error.message,
      );
    }
  }

  // Rota para buscar um autor por id
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ message: string; author: Author }> {
    try {
      const author = await this.authorsService.findOne(id);
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      return { message: 'Author found successfully', author };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException
      }
      throw new InternalServerErrorException(
        'Error finding author: ' + error.message,
      );
    }
  }

  // Atualizar informações de um autor específico
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() authorData: Partial<Author>,
  ): Promise<Author> {
    try {
      if (!authorData.id) {
        console.log('Error to update author.');
      }

      return await this.authorsService.update(id, authorData);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating author: ' + error.message,
      );
    }
  }

  //Rota para deletar um Author por ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const author = await this.authorsService.findOne(id);
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      await this.authorsService.remove(id);
      return { message: 'Author deleted successfully' }; // Retorna mensagem de sucesso
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Error deleting author: ' + error.message,
      );
    }
  }

  //Rota que atualiza as informações de um autor e seus livros associados, permitindo modificar os dados do autor e, opcionalmente, atualizar ou criar livros relacionados.
  @Patch(':id')
  async UpdateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    try {
      const updatedAuthor = await this.authorsService.updateAuthor(
        id,
        updateAuthorDto,
      );

      if (!updatedAuthor) {
        throw new NotFoundException('Author not found');
      }
      return {
        message: 'Author and books updated successfully',
        updatedAuthor,
      };
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Author not found');
    }
  }
}
