/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/service.common';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export class UserService extends CommonService<any, any, any, any> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.account;
  }

  create(dto: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  update(id: string, dto: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<{ message: string }> {
    throw new Error('Method not implemented.');
  }
}
