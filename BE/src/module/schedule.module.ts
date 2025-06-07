import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { ScheduleController } from 'src/controllers/schedule.controller';
import { ScheduleService } from 'src/service/schedule.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
