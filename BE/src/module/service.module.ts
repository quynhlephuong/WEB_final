import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { ServiceController } from 'src/controllers/service.controller';
import { ServiceService } from 'src/service/service.service';

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, PrismaService],
  exports: [ServiceService],
})
export class ServiceModule {}
