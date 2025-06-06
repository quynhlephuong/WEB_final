/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/service/auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/config/guard.config';
import {
  ForgetRequest,
  LoginRequest,
  RegisterRequest,
} from 'src/request/auth.request';
import { getUserIdAndRoleFromPayload } from 'src/utils/token.util';
import { UserRole } from 'src/enumdef/user.role.enum';

@ApiTags('Authentication Endpoints')
@Controller('/auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async validateUser(
    @Res({ passthrough: true }) res: Response,
    @Body() loginRequest: LoginRequest,
  ) {
    return await this.authService.login(loginRequest, res);
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
    });

    return {
      timestamp: new Date().toISOString(),
      message: 'Logout successfully',
    };
  }

  @Post('/register')
  async register(
    @Body() registerRequest: RegisterRequest,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const { userId, role } = await getUserIdAndRoleFromPayload(req);
    // If userId is empty, it means this is a new registration
    if (userId === '') {
      registerRequest.role = UserRole.CLIENT;
    }
    // If the user is an admin, they can register other users
    if (role && role === UserRole.ADMIN) {
      registerRequest.role = registerRequest.role || UserRole.CLIENT;
    }
    return await this.authService.register(registerRequest);
  }

  @Post('/forget')
  async refresh(@Body() dto: ForgetRequest) {
    return await this.authService.forgetPassword(dto);
  }
}
