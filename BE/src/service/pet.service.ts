import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CommonService } from 'src/common/service.common';
import { PrismaService } from 'src/config/prisma.service';
import { PetDto } from 'src/request/pet.request';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PetService extends CommonService<any, any, any> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.pet;
  }

  protected getInclude(): Prisma.PetInclude {
    return {
      client: true,
    };
  }

  async upsert(dto: PetDto): Promise<any> {
    const { id, clientId, name, gender, breed, weight, species, status } = dto;

    const client = await this.prisma.client.findFirst({
      where: { id: clientId },
    });
    if (!client) {
      throw new BadRequestException('KHÔNG TÌM THẤY DỮ LIỆU KHÁCH HÀNG');
    }

    if (id) {
      const existing = await this.prisma.pet.findFirst({ where: { id } });
      if (!existing) {
        throw new NotFoundException('Không tìm thấy thú cưng để cập nhật');
      }

      return this.prisma.pet.update({
        where: { id },
        data: { clientId, name, gender, breed, weight, species, status },
      });
    }

    return this.prisma.pet.create({
      data: {
        id: uuidv4(),
        clientId,
        name,
        gender,
        breed,
        weight,
        species,
        status,
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const pet = await this.prisma.pet.findFirst({
      where: { id },
      include: {
        client: true,
      },
    });

    if (!pet) {
      throw new NotFoundException('Không tìm thấy thú cưng');
    }

    return pet;
  }

  async remove(id: string): Promise<{ message: string }> {
    const pet = await this.prisma.pet.findUnique({ where: { id } });

    if (!pet) {
      throw new NotFoundException('Không tìm thấy thú cưng để xoá');
    }

    const scheduleDetails = await this.prisma.scheduleDetail.findMany({
      where: { petId: id },
      select: { id: true },
    });

    const scheduleDetailIds = scheduleDetails.map((s) => s.id);

    await this.prisma.billingDetail.deleteMany({
      where: { scheduleDetailId: { in: scheduleDetailIds } },
    });

    await this.prisma.scheduleDetail.deleteMany({
      where: { petId: id },
    });

    await this.prisma.pet.delete({ where: { id } });

    return { message: 'Xoá thú cưng thành công' };
  }

  async findPetByClientId(clientId: string): Promise<any[]> {
    const pets = await this.prisma.pet.findMany({
      where: { clientId },
      select: {
        id: true,
        name: true,
        species: true,
      },
    });

    return pets;
  }
}
