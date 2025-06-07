/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/config/guard.config';
import {
  ChangeDetailsDto,
  ChangePasswordDto,
  UserDto,
} from 'src/request/account.request';
import { SearchRequestDTO } from 'src/request/search.request';
import { AccountService } from 'src/service/account.service';
import { getUserIdAndRoleFromPayload } from 'src/utils/token.util';
import { Request } from 'express';

@ApiTags('QUẢN LÝ TÀI KHOẢN VÀ CÁC LOẠI USER')
@Controller('accounts')
@UseGuards(AuthGuard)
export class AccountsController {
  constructor(private readonly service: AccountService) {}

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
  createOrUpdate(@Body() dto: UserDto) {
    return this.service.upsert(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('change-password')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() req: Request) {
    const { userId } = await getUserIdAndRoleFromPayload(req);
    return this.service.changePassword(
      userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @Patch()
  async updateProfile(@Body() dto: ChangeDetailsDto, @Req() req: Request) {
    const { userId } = await getUserIdAndRoleFromPayload(req);
    return this.service.changeDetails(userId, dto);
  }

  @Post('dropdown/:role')
  async getDropdownData(@Param('role') role: string) {
    return this.service.dropdown(role);
  }
}
