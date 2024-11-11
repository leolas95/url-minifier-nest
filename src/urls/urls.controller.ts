import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { Response } from 'express';
import { CreateErrorDto } from './dto/create-error.dto';
import { CreateSuccessDto } from './dto/create-success.dto';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post()
  async create(
    @Body() createUrlDto: CreateUrlDto,
  ): Promise<CreateSuccessDto | CreateErrorDto> {
    const result = await this.urlsService.create(createUrlDto);
    if (result === null) {
      return { type: 'creation error', message: 'could not create' };
    }
    return { url: result.id };
  }

  @Get(':shortUrl')
  async findOne(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.urlsService.findOne(shortUrl);
    if (url === null) {
      res.status(404).json({ message: 'could not find a url' });
    }

    res.redirect(url.long_url);
  }

  @Get()
  async findAll() {
    return this.urlsService.fetchAll();
  }
}
