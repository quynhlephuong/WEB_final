/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'src/config/auth.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    if (!cookies || !cookies['accessToken']) {
      throw new UnauthorizedException('No access token provided');
    }
    const token = cookies['accessToken'];

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwtSecret,
      });
      request.user = payload;
      return true;
    } catch (error) {
      console.error('ERROR: ' + error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
