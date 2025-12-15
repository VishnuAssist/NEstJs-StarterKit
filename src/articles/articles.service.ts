import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(dto, userId: number) {
    return this.prisma.article.create({
      data: { ...dto, authorId: userId },
    });
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  update(id: number, dto) {
    return this.prisma.article.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
