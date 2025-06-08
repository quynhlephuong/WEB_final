import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CommonService } from 'src/common/service.common';
import { PrismaService } from 'src/config/prisma.service';
import { UpsertScheduleDto } from 'src/request/service.request';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ScheduleService extends CommonService<any, any, any> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
  }

  protected getModel() {
    return this.prisma.schedule;
  }

  protected getInclude(): Prisma.ScheduleInclude {
    return {
      details: {
        include: {
          pet: {
            include: {
              client: true,
            },
          },
          service: true,
          billingDetails: {
            include: {
              paymentMethod: true,
            },
          },
        },
      },
    };
  }

  async upsert(dto: UpsertScheduleDto): Promise<any> {
    const { id, date, time, petId, serviceId } = dto;

    const service = await this.prisma.service.findUnique({
      where: { id: serviceId },
    });
    if (!service) throw new NotFoundException('Dịch vụ không tồn tại');

    if (id) {
      const existingSchedule = await this.prisma.schedule.findUnique({
        where: { id },
      });
      if (!existingSchedule) {
        throw new BadRequestException('Lịch hẹn không tồn tại');
      }

      const existingDetail = await this.prisma.scheduleDetail.findFirst({
        where: { scheduleId: id },
      });
      if (!existingDetail) {
        throw new BadRequestException('Không tìm thấy chi tiết lịch hẹn');
      }

      const existingBillingDetail = await this.prisma.billingDetail.findFirst({
        where: { scheduleDetailId: existingDetail.id },
      });
      if (!existingBillingDetail) {
        throw new BadRequestException('Không tìm thấy hóa đơn chi tiết');
      }

      const [updatedSchedule, updatedDetail, updatedBillingDetail] =
        await this.prisma.$transaction([
          this.prisma.schedule.update({
            where: { id },
            data: { date, time },
          }),
          this.prisma.scheduleDetail.update({
            where: { id: existingDetail.id },
            data: { serviceId },
          }),
          this.prisma.billingDetail.update({
            where: { id: existingBillingDetail.id },
            data: {
              total: Math.round(service.price),
            },
          }),
        ]);

      return {
        schedule: updatedSchedule,
        scheduleDetail: updatedDetail,
        billingDetail: updatedBillingDetail,
      };
    } else {
      const pet = await this.prisma.pet.findUnique({ where: { id: petId } });
      if (!pet) throw new NotFoundException('Thú cưng không tồn tại');
      if (!pet.clientId) {
        throw new BadRequestException('Pet chưa có client liên kết');
      }

      const scheduleId = uuidv4();
      const detailId = uuidv4();
      const billingId = uuidv4();
      const billingDetailId = uuidv4();

      const [schedule, scheduleDetail, billing, billingDetail] =
        await this.prisma.$transaction([
          this.prisma.schedule.create({
            data: { id: scheduleId, date, time },
          }),
          this.prisma.scheduleDetail.create({
            data: {
              id: detailId,
              petId,
              serviceId,
              scheduleId,
            },
          }),
          this.prisma.billing.create({
            data: {
              id: billingId,
              clientId: pet.clientId,
              date: new Date(),
            },
          }),
          this.prisma.billingDetail.create({
            data: {
              id: billingDetailId,
              billingId,
              scheduleDetailId: detailId,
              paymentMethodId: 'PTTT001',
              total: Math.round(service.price),
            },
          }),
        ]);

      return { schedule, scheduleDetail, billing, billingDetail };
    }
  }

  async findOne(id: string): Promise<any> {
    return this.prisma.schedule.findUnique({
      where: { id },
      include: {
        details: {
          include: {
            pet: {
              include: {
                client: true,
              },
            },
            service: true,
          },
        },
      },
    });
  }

  async remove(id: string): Promise<{ message: string }> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        details: { include: { billingDetails: true } },
      },
    });
    if (!schedule) throw new NotFoundException('Lịch hẹn không tồn tại');

    for (const d of schedule.details) {
      for (const bd of d.billingDetails) {
        await this.prisma.billingDetail.delete({ where: { id: bd.id } });
      }
      await this.prisma.billing.delete({
        where: { id: d.billingDetails[0]?.billingId },
      });
      await this.prisma.scheduleDetail.delete({ where: { id: d.id } });
    }
    await this.prisma.schedule.delete({ where: { id } });

    return { message: 'Xoá lịch hẹn thành công' };
  }
}
