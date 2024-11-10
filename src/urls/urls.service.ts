import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { PrismaService } from '../prisma.service';
import { Urls } from '@prisma/client';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly urls = [];

  async create(createUrlDto: CreateUrlDto) {
    const shortUrl = this.generateShortUrl(createUrlDto.url);
    const result = await this.save(shortUrl, createUrlDto.url);
    if (result === null) {
      return null;
    }
    return result.id;
  }

  generateShortUrl(url: string): string {
    return 'abc123';
  }

  save(shortUrl: string, longUrl: string): Promise<Urls | null> {
    return this.prisma.urls.create({
      data: { id: shortUrl, long_url: longUrl },
    });
  }

  async findOne(id: string): Promise<Urls | null> {
    return this.prisma.urls.findUnique({ where: { id: id } });
  }
}
