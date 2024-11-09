import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';

@Injectable()
export class UrlsService {
  private readonly urls = [];

  create(createUrlDto: CreateUrlDto) {
    const shortUrl = this.generateShortUrl(createUrlDto.url);
    this.save(shortUrl, createUrlDto.url);
    return shortUrl;
  }

  generateShortUrl(url: string): string {
    return 'abc123';
  }

  save(shortUrl: string, longUrl: string) {
    this.urls.push({ id: shortUrl, longUrl: longUrl });
  }

  findOne(id: string): string {
    for (let i = 0; i < this.urls.length; i += 1) {
      if (this.urls[i].id === id) {
        return this.urls[i].longUrl;
      }
    }
    return '';
  }
}
