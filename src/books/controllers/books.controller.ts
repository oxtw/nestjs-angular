// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   Put,
// } from '@nestjs/common';
// import { BooksService } from '../books.service';
// import { Author } from 'src/authors/entities/author.entity';

// interface CreateBookDto {
//   id: string;
//   title: string;
//   publicationDate: Date;
//   author: Author;
// }

// interface UpdateBookDto {
//   title: string;
//   publicationDate: Date;
//   author: Author;
// }

// @Controller('books')
// export class BooksController {
//   constructor(private readonly booksService: BooksService) {}

//   @Post()
//   create(@Body() createBookDto: CreateBookDto) {
//     try {
//       return this.booksService.create(createBookDto);
//     } catch (error) {
//       console.log(error);
//     }

//   }

//   @Get()
//   findAll() {
//     try {
//       return this.booksService.findAll();
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.booksService.findOne(+id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
//     try {
//       return this.booksService.update(+id, updateBookDto);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     try {
//       return this.booksService.remove(+id);
//     } catch (error) {
//       return console.log(error);
//     }
//   }
// }
