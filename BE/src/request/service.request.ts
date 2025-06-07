import { ApiProperty } from '@nestjs/swagger';

export class ServiceDto {
  @ApiProperty({
    example: '12edqw',
  })
  id?: string;
  @ApiProperty({
    example: 'tam rua cho thu cung',
  })
  name: string;
  @ApiProperty({
    example: '100000',
  })
  price: number;
  @ApiProperty({
    example: 'description of the service',
  })
  description: string;
}

export class UpsertScheduleDto {
  @ApiProperty({
    example: 'ID',
  })
  id?: string;
  @ApiProperty({
    example: '05/06/2025',
  })
  date: string;
  @ApiProperty({
    example: '12:00',
  })
  time: string;
  @ApiProperty({
    example: 'PET_ID',
  })
  petId: string;
  @ApiProperty({
    example: 'SERVICE_ID',
  })
  serviceId: string;
}
