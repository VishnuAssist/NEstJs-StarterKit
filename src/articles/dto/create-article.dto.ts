import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ example: 'My First Article' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'This is my first article' })
  @IsOptional()
  @IsString()
  description?: string;
}
