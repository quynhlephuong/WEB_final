import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/config/guard.config';
import { SearchRequestDTO } from 'src/request/search.request';
import { ServiceDto } from 'src/request/service.request';
import { ServiceService } from 'src/service/service.service';

@ApiTags('QUẢN LÝ DỊCH VỤ')
@Controller('services')
@UseGuards(AuthGuard)
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Post('pagination')
  findAll(@Body() body: SearchRequestDTO) {
    return this.service.findAll(body);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  createOrUpdate(@Body() dto: ServiceDto) {
    return this.service.upsert(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get()
  findAllServices() {
    return this.service.dropdown();
  }
}
