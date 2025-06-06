// import {
//   BadRequestException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { CommonService } from 'src/common/service.common';
// import { PrismaService } from 'src/config/prisma.service';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class ScheduleService extends CommonService<any, any, any> {
//   constructor(protected prisma: PrismaService) {
//     super(prisma);
//   }

//   protected getModel() {
//     return this.prisma.pet;
//   }

//   async upsert(dto: any): Promise<any> {
//   }

//   async findOne(id: string): Promise<any> {
//   }

//   async remove(id: string): Promise<{ message: string }> {

//     return { message: 'Xoá lịch hẹn thành công' };
//   }
// }
