/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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
import { AccountService } from 'src/service/account.service';

@ApiTags('ĐĂNG NHẬP, ĐĂNG KÝ, QUÊN MẬT KHẨU')
@Controller('/auth')
export class AuthenticationController {
  constructor(
    private readonly service: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post('/login')
  async validateUser(
    @Res({ passthrough: true }) res: Response,
    @Body() loginRequest: LoginRequest,
  ) {
    return await this.service.login(loginRequest, res);
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
    return await this.service.register(registerRequest);
  }

  @Post('/forget')
  async refresh(@Body() dto: ForgetRequest) {
    return await this.service.forgetPassword(dto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: Request) {
    const { userId } = await getUserIdAndRoleFromPayload(req);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.accountService.findOne(userId);
  }
}
