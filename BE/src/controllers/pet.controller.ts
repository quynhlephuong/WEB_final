/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { AuthGuard } from 'src/config/guard.config';
import { PetDto } from 'src/request/pet.request';
import { SearchField, SearchRequestDTO } from 'src/request/search.request';
import { PetService } from 'src/service/pet.service';
import { Request } from 'express';
import { getUserIdAndRoleFromPayload } from 'src/utils/token.util';
import { ControlType } from 'src/enumdef/control.type.enum';
import { Operator } from 'src/enumdef/operator.enum';
import { AccountService } from 'src/service/account.service';

@ApiTags('QUẢN LÝ THÚ CƯNG')
@Controller('pets')
@UseGuards(AuthGuard)
export class PetController {
  constructor(
    private readonly service: PetService,
    private readonly account: AccountService,
  ) {}

  @Post('pagination')
  findAll(@Body() body: SearchRequestDTO) {
    return this.service.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  createOrUpdate(@Body() dto: PetDto) {
    return this.service.upsert(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('own')
  async getOwnPets(@Req() req: Request) {
    const { userId } = await getUserIdAndRoleFromPayload(req);
    const field: SearchField = {
      fieldName: 'client.accountId',
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

  @Post('dropdown/:clientId')
  async getDropdownData(@Param('clientId') clientId: string) {
    return this.service.findPetByClientId(clientId);
  }

  @Post('self-add')
  async selfAddPet(@Req() req: Request, @Body() dto: PetDto) {
    const { userId, role } = await getUserIdAndRoleFromPayload(req);
    if (role !== 'CLIENT') {
      return { message: 'BẠN KHÔNG THỂ TẠO PROFILE THÚ CƯNG' };
    }
    const account = await this.account.findOne(userId);
    if (!account) {
      return { message: 'VUI LÒNG ĐĂNG NHẬP LẠI' };
    }
    dto.clientId = account.profile.id;
    return await this.service.upsert(dto);
  }
}
