import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/config/prisma.service';
import { AuthModule } from './auth.module';
import { AccountsModule } from './account.module';
import { ServiceModule } from './service.module';
import { PetModule } from './pet.module';
import { ScheduleModule } from './schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    AccountsModule,
    ServiceModule,
    PetModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
