import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async create(
    @Body() createUrlDto: CreateUrlDto,
  ): Promise<{ url: string } | { error: string; message: string }> {
    const result = await this.urlsService.create(createUrlDto);
    if (result === null) {
      return { error: 'creation error', message: 'could not create' };
    }
    return { url: result.id };
  }

  @Get(':shortUrl')
  async findOne(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ long_url: string } | { error_message: string }> {
    const url = await this.urlsService.findOne(shortUrl);
    return Promise.resolve({ long_url: url.long_url });
  }

  @Get()
  async findAll() {
    return this.urlsService.fetchAll();
  }
}
