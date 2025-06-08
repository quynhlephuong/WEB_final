import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/config/guard.config';
import { ScheduleService } from 'src/service/schedule.service';
import { UpsertScheduleDto } from 'src/request/service.request';
import { SearchField, SearchRequestDTO } from 'src/request/search.request';
import { ControlType } from 'src/enumdef/control.type.enum';
import { Operator } from 'src/enumdef/operator.enum';
import { getUserIdAndRoleFromPayload } from 'src/utils/token.util';

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

  @Post('own')
  async getOwn(@Req() req: Request) {
    const { userId } = await getUserIdAndRoleFromPayload(req);
    const field: SearchField = {
      fieldName: 'details.pet.client.accountId',
      operator: Operator.CONTAINS,
      controlType: ControlType.TEXT,
      paramFrom: userId,
      paramTo: '',
      multipleSelect: null,
    };

    const body: SearchRequestDTO = {
      page: 1,
      pageSize: 10000,
      search: [field],
    };
    return this.service.findAll(body);
  }

  @Post('invoice/:billingDetailId/:paymentMethodId')
  invoice(
    @Param('billingDetailId') billingId: string,
    @Param('paymentMethodId') paymentMethodId: string,
  ) {
    return this.service.paymentMethod(billingId, paymentMethodId);
  }
}
