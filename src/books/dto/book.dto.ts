import { IsString, IsDate, IsOptional } from 'class-validator';

export interface UpdateBookDTO {
  title?: string;
  publicationDate?: string;
  authorId?: string;
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDate()
  publicationDate?: Date;
}
