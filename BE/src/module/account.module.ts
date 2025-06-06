import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { UsersController } from 'src/controllers/account.controller';
import { UserService } from 'src/service/account.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UsersModule {}
