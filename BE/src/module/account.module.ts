import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { AccountsController } from 'src/controllers/account.controller';
import { AccountService } from 'src/service/account.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountService, PrismaService],
  exports: [AccountService],
})
export class AccountsModule {}
