import { Injectable, NotFoundException } from '@nestjs/common';
import { CommonService } from 'src/common/service.common';
import { PrismaService } from 'src/config/prisma.service';
import { ServiceDto } from 'src/request/service.request';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ServiceService extends CommonService<any, any, any> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.service;
  }

  async upsert(dto: ServiceDto): Promise<any> {
    const { id, name, price, description } = dto;

    if (id) {
      const existing = await this.prisma.service.findFirst({ where: { id } });

      if (!existing) {
        throw new NotFoundException('Không tìm thấy dịch vụ cần cập nhật');
      }

      return this.prisma.service.update({
        where: { id },
        data: { name, price, description },
      });
    }

    return this.prisma.service.create({
      data: {
        id: uuidv4(),
        name,
        price,
        description,
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const service = await this.prisma.service.findFirst({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException('Không tìm thấy dịch vụ');
    }

    return service;
  }

  async remove(id: string): Promise<{ message: string }> {
    const service = await this.prisma.service.findFirst({ where: { id } });

    if (!service) {
      throw new NotFoundException('Không tìm thấy dịch vụ để xoá');
    }

    await this.prisma.service.delete({ where: { id } });

    return { message: 'Xoá dịch vụ thành công' };
  }

  async dropdown(): Promise<any[]> {
    return this.prisma.service.findMany({
      select: {
        id: true,
        name: true,
        price: true,
      },
    });
  }
}
