import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { PrismaService } from '../prisma.service';
import { Urls } from '@prisma/client';

const MIN = 100000000000;
const MAX = 999999999999;
const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly urls = [];

  async create(createUrlDto: CreateUrlDto) {
    const shortUrl = this.generateShortUrl();
    return this.save(shortUrl, createUrlDto.url);
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  }

  generateShortUrl(): string {
    let n = this.getRandomNumber();
    let result = '';
    while (n > 0) {
      const mod = n % 62;
      result += alphabet[mod];
      n = Math.floor(n / 62);
    }

    return result;
  }

  save(shortUrl: string, longUrl: string): Promise<Urls | null> {
    return this.prisma.urls.create({
      data: { id: shortUrl, long_url: longUrl },
    });
  }

  async findOne(id: string): Promise<Urls | null> {
    return this.prisma.urls.findUnique({ where: { id: id } });
  }

  async fetchAll(): Promise<Urls[] | null> {
    return this.prisma.urls.findMany();
  }
}
