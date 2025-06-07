import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import {
  ForgetRequest,
  LoginRequest,
  RegisterRequest,
} from 'src/request/auth.request';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserRole } from 'src/enumdef/user.role.enum';
import { embedTokens, generateToken } from 'src/utils/token.util';
import * as uuid from 'uuid';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: RegisterRequest) {
    const { username, password, email, phone, role } = payload;

    const existingAccount = await this.prisma.account.findFirst({
      where: {
        username,
      },
    });

    if (existingAccount) {
      throw new ConflictException('TÀI KHOẢN ĐÃ TỒN TẠI');
    }

    const roleEnum = UserRole[role as keyof typeof UserRole];
    if (!roleEnum) {
      throw new ForbiddenException('Invalid role');
    }

    const clientConditions: Prisma.ClientWhereInput[] = [];
    if (email) clientConditions.push({ email });
    if (phone) clientConditions.push({ phone });

    const staffConditions: Prisma.StaffWhereInput[] = [];
    if (email) staffConditions.push({ email });
    if (phone) staffConditions.push({ phone });

    const workerConditions: Prisma.WorkerWhereInput[] = [];
    if (email) workerConditions.push({ email });
    if (phone) workerConditions.push({ phone });

    const [clientExists, staffExists, workerExists] = await Promise.all([
      this.prisma.client.findFirst({ where: { OR: clientConditions } }),
      this.prisma.staff.findFirst({ where: { OR: staffConditions } }),
      this.prisma.worker.findFirst({ where: { OR: workerConditions } }),
    ]);

    if (clientExists || staffExists || workerExists) {
      throw new ConflictException('Email hoặc số điện thoại đã tồn tại');
    }

    if (clientExists || staffExists || workerExists) {
      throw new ConflictException('Email hoặc Số điện thoại đã tồn tại');
    }

    const uuidv4 = uuid.v4();

    const account = await this.prisma.account.create({
      data: {
        id: uuidv4,
        username,
        password,
        role,
      },
    });

    switch (roleEnum) {
      case UserRole.CLIENT:
        await this.prisma.client.create({
          data: {
            id: uuid.v4(),
            accountId: account.id,
            name: username,
            gender: false,
            address: '',
            phone: phone || '',
            email: email || '',
          },
        });
        break;

      case UserRole.ADMIN:
        await this.prisma.staff.create({
          data: {
            id: uuid.v4(),
            accountId: uuidv4,
            name: username,
            gender: false,
            phone: phone || '',
            email: email || '',
          },
        });
        break;

      case UserRole.WORKER:
        await this.prisma.worker.create({
          data: {
            id: uuid.v4(),
            accountId: uuidv4,
            name: username,
            gender: false,
            phone: phone || '',
            email: email || '',
          },
        });
        break;
    }

    return {
      message: 'ĐĂNG KÝ THÀNH CÔNG, HÃY ĐĂNG NHẬP',
      accountId: account.id,
    };
  }

  async login(payload: LoginRequest, res: Response) {
    const { username, password } = payload;

    const account = await this.prisma.account.findFirst({
      where: { username },
      include: {
        client: true,
        manager: true,
        worker: true,
      },
    });

    if (!account) {
      throw new UnauthorizedException('TÀI KHOẢN KHÔNG TỒN TẠI');
    }

    const isMatch = password === account.password;
    if (!isMatch) {
      throw new UnauthorizedException('SAI TÀI KHOẢN HOẶC MẬT KHẨU');
    }

    let name = '';
    let id = '';

    if (account.client) {
      name = account.client.name;
      id = account.client.id;
    } else if (account.manager) {
      name = account.manager.name;
      id = account.manager.id;
    } else if (account.worker) {
      name = account.worker.name;
      id = account.worker.id;
    }

    const { token } = generateToken(this.jwtService, {
      sub: account.id,
      role: account.role,
    });

    embedTokens(res, token);

    return {
      message: `XIN CHÀO, ${name.toUpperCase()}`,
      user: {
        id,
        accountId: account.id,
        username: account.username,
        role: account.role,
        name: name,
      },
    };
  }

  async forgetPassword(identifier: ForgetRequest) {
    const { email, phone } = identifier;

    if (!email && !phone) {
      throw new ForbiddenException('EMAIL HOẶC SỐ ĐIỆN THOẠI BẮT BUỘC PHẢI CÓ');
    }

    const contactConditions = [
      email ? { email } : null,
      phone ? { phone } : null,
    ].filter(Boolean) as Prisma.ClientWhereInput[];

    const client = await this.prisma.client.findFirst({
      where: {
        OR: contactConditions,
      },
      include: { account: true },
    });

    if (client) {
      return {
        role: UserRole.CLIENT,
        accountId: client.id,
      };
    }

    const staffConditions = [
      email ? { email } : null,
      phone ? { phone } : null,
    ].filter(Boolean) as Prisma.StaffWhereInput[];

    const staff = await this.prisma.staff.findFirst({
      where: {
        OR: staffConditions,
      },
      include: { account: true },
    });

    if (staff) {
      return {
        role: UserRole.ADMIN,
        accountId: staff.accountId,
      };
    }

    const workerConditions = [
      email ? { email } : null,
      phone ? { phone } : null,
    ].filter(Boolean) as Prisma.WorkerWhereInput[];

    const worker = await this.prisma.worker.findFirst({
      where: {
        OR: workerConditions,
      },
      include: { account: true },
    });

    if (worker) {
      return {
        role: UserRole.WORKER,
        accountId: worker.accountId,
      };
    }

    throw new NotFoundException(
      'TÀI KHOẢN KHÔNG TỒN TẠI HOẶC KHÔNG CÓ EMAIL/SỐ ĐIỆN THOẠI',
    );
  }
}
