import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';

@ApiTags('Articles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private service: ArticlesService) {}

  @Post()
  create(@Body() dto: CreateArticleDto, @Req() req) {
    return this.service.create(dto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateArticleDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
