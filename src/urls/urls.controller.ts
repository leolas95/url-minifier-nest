import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.create(createUrlDto);
  }

  @Get(':shortUrl')
  findOne(@Param('shortUrl') shortUrl: string) {
    return this.urlsService.findOne(shortUrl);
  }
}
