/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommonService } from 'src/common/service.common';
import { PrismaService } from 'src/config/prisma.service';
import { UserRole } from 'src/enumdef/user.role.enum';
import { ChangeDetailsDto, UserDto } from 'src/request/account.request';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AccountService extends CommonService<any, any, any> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.account;
  }

  async upsert(dto: UserDto): Promise<any> {
    const { id, username, password, role } = dto;
    if (id) {
      const accountExist = await this.prisma.account.findFirst({
        where: { id },
      });
      if (!accountExist) {
        throw new BadRequestException('Account không tồn tại');
      }
    }
    const existingAccount = await this.prisma.account.findFirst({
      where: {
        username,
        ...(id ? { NOT: { id } } : {}),
      },
    });

    if (existingAccount) {
      throw new BadRequestException('Username already exists');
    }

    let accountId = id;

    if (!id) {
      accountId = uuidv4();
      await this.prisma.account.create({
        data: {
          id: accountId,
          username,
          password,
          role,
        },
      });

      const childId = uuidv4();
      switch (role) {
        case UserRole.CLIENT:
          await this.prisma.client.create({
            data: {
              id: childId,
              accountId,
              name: username,
              gender: false,
              address: '',
              phone: '',
              email: '',
            },
          });
          break;
        case UserRole.ADMIN:
          await this.prisma.staff.create({
            data: {
              id: childId,
              accountId,
              name: username,
              gender: false,
              phone: '',
              email: '',
            },
          });
          break;
        case UserRole.WORKER:
          await this.prisma.worker.create({
            data: {
              id: childId,
              accountId,
              name: username,
              gender: false,
              phone: '',
              email: '',
            },
          });
          break;
      }
    } else {
      await this.prisma.account.update({
        where: { id },
        data: {
          username,
          password,
        },
      });
    }

    return {
      message: id ? 'Cập nhật thành công' : 'Tạo mới thành công',
      accountId,
    };
  }

  async findOne(id: string): Promise<any> {
    console.log('Finding account with ID:', id);
    const account = await this.prisma.account.findFirst({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    let profile: any = null;

    const roleEnum = UserRole[account.role as keyof typeof UserRole];
    switch (roleEnum) {
      case UserRole.CLIENT:
        profile = await this.prisma.client.findFirst({
          where: { accountId: id },
        });
        break;
      case UserRole.ADMIN:
        profile = await this.prisma.staff.findFirst({
          where: { accountId: id },
        });
        break;
      case UserRole.WORKER:
        profile = await this.prisma.worker.findFirst({
          where: { accountId: id },
        });
        break;
    }

    return {
      ...account,
      profile,
    };
  }

  async remove(id: string): Promise<{ message: string }> {
    const account = await this.prisma.account.findFirst({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const roleEnum = UserRole[account.role as keyof typeof UserRole];
    switch (roleEnum) {
      case UserRole.CLIENT:
        await this.prisma.client.deleteMany({ where: { accountId: id } });
        break;
      case UserRole.ADMIN:
        await this.prisma.staff.deleteMany({ where: { accountId: id } });
        break;
      case UserRole.WORKER:
        await this.prisma.worker.deleteMany({ where: { accountId: id } });
        break;
    }

    await this.prisma.account.delete({ where: { id } });

    return { message: 'Xoá tài khoản thành công' };
  }

  async changeDetails(id: string, dto: ChangeDetailsDto) {
    console.log('Changing details for account with ID:', id);
    const account = await this.findOne(id);
    if (!account) {
      throw new NotFoundException('Account không tồn tại');
    }

    const { role } = account;
    const roleEnum = UserRole[role as keyof typeof UserRole];

    const { name, gender, address, email, phone } = dto;

    const emailConflict =
      email &&
      email.trim() !== '' &&
      (await this.checkEmailConflict(id, email));
    const phoneConflict =
      phone &&
      phone.trim() !== '' &&
      (await this.checkPhoneConflict(id, phone));

    if (emailConflict) {
      throw new BadRequestException('Email đã tồn tại ở người dùng khác');
    }
    if (phoneConflict) {
      throw new BadRequestException(
        'Số điện thoại đã tồn tại ở người dùng khác',
      );
    }

    switch (roleEnum) {
      case UserRole.CLIENT:
        await this.prisma.client.update({
          where: { accountId: id },
          data: {
            ...(name !== undefined && { name }),
            ...(gender !== undefined && { gender }),
            ...(address !== undefined && { address }),
            ...(email !== undefined && { email }),
            ...(phone !== undefined && { phone }),
          },
        });
        break;

      case UserRole.ADMIN:
        await this.prisma.staff.update({
          where: { accountId: id },
          data: {
            ...(name !== undefined && { name }),
            ...(gender !== undefined && { gender }),
            ...(email !== undefined && { email }),
            ...(phone !== undefined && { phone }),
          },
        });
        break;

      case UserRole.WORKER:
        await this.prisma.worker.update({
          where: { accountId: id },
          data: {
            ...(name !== undefined && { name }),
            ...(gender !== undefined && { gender }),
            ...(email !== undefined && { email }),
            ...(phone !== undefined && { phone }),
          },
        });
        break;

      default:
        throw new BadRequestException('Vai trò không hợp lệ');
    }

    return { message: 'Cập nhật thông tin cá nhân thành công' };
  }

  async changePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const account = await this.prisma.account.findFirst({
      where: { id },
    });

    if (!account) {
      throw new NotFoundException('KHÔNG HỢP LỆ, HÃY REFRESH TRANG');
    }

    if (account.password !== oldPassword) {
      throw new BadRequestException('MẬT KHẨU HIỆN TẠI SAI');
    }

    await this.prisma.account.update({
      where: { id },
      data: { password: newPassword },
    });

    return { message: 'CẬP NHẬT MẬT KHẨU MỚI THÀNH CÔNG' };
  }

  async dropdown(role: string) {
    let data: { id: string; name: string; email: string }[] = [];

    const roleEnum = UserRole[role as keyof typeof UserRole];
    switch (roleEnum) {
      case UserRole.CLIENT:
        data = await this.prisma.client.findMany({
          select: { id: true, name: true, email: true },
        });
        break;
      case UserRole.ADMIN:
        data = await this.prisma.staff.findMany({
          select: { id: true, name: true, email: true },
        });
        break;
      case UserRole.WORKER:
        data = await this.prisma.worker.findMany({
          select: { id: true, name: true, email: true },
        });
        break;
      default:
        throw new BadRequestException('CÓ LỖI HỆ THỐNG, VUI LÒNG THỬ LẠI');
    }

    return data;
  }

  //---------------------------------------------------------------
  //------------------------HELPER FUNCTIONS-----------------------
  //---------------------------------------------------------------
  private async checkEmailConflict(
    accountId: string,
    email: string,
  ): Promise<boolean> {
    const emailInClient = await this.prisma.client.findFirst({
      where: {
        email,
        accountId: { not: accountId },
      },
    });

    const emailInStaff = await this.prisma.staff.findFirst({
      where: {
        email,
        accountId: { not: accountId },
      },
    });

    const emailInWorker = await this.prisma.worker.findFirst({
      where: {
        email,
        accountId: { not: accountId },
      },
    });

    return !!(emailInClient || emailInStaff || emailInWorker);
  }

  private async checkPhoneConflict(
    accountId: string,
    phone: string,
  ): Promise<boolean> {
    const phoneInClient = await this.prisma.client.findFirst({
      where: {
        phone,
        accountId: { not: accountId },
      },
    });

    const phoneInStaff = await this.prisma.staff.findFirst({
      where: {
        phone,
        accountId: { not: accountId },
      },
    });

    const phoneInWorker = await this.prisma.worker.findFirst({
      where: {
        phone,
        accountId: { not: accountId },
      },
    });

    return !!(phoneInClient || phoneInStaff || phoneInWorker);
  }
  //---------------------------------------------------------------
  //------------------------END HELPER FUNCTIONS-------------------
}
