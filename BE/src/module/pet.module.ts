import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { PetController } from 'src/controllers/pet.controller';
import { PetService } from 'src/service/pet.service';

@Module({
  controllers: [PetController],
  providers: [PetService, PrismaService],
  exports: [PetService],
})
export class PetModule {}
