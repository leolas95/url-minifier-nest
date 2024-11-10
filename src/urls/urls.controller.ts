import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto): Promise<string> {
    return this.urlsService.create(createUrlDto);
  }

  @Get(':shortUrl')
  async findOne(
    @Param('shortUrl') shortUrl: string,
  ): Promise<{ long_url: string } | { error_message: string }> {
    const url = await this.urlsService.findOne(shortUrl);
    return Promise.resolve({ long_url: url.long_url });
  }
}
