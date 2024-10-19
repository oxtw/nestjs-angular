import {
  IsString,
  IsArray,
  ValidateNested,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBookDto } from 'src/books/dto/book.dto';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDate()
  birthDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateBookDto)
  books: UpdateBookDto[];
}
