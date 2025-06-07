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
import { ScheduleService } from 'src/service/schedule.service';
import { UpsertScheduleDto } from 'src/request/service.request';
import { SearchRequestDTO } from 'src/request/search.request';

@ApiTags('QUẢN LÝ LỊCH HẸN')
@Controller('schedule')
@UseGuards(AuthGuard)
export class ScheduleController {
  constructor(private readonly service: ScheduleService) {}

  @Post('pagination')
  findAll(@Body() body: SearchRequestDTO) {
    return this.service.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  createOrUpdate(@Body() dto: UpsertScheduleDto) {
    return this.service.upsert(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
