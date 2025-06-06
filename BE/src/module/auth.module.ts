import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/config/prisma.service';
import { AuthenticationController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/service/auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
