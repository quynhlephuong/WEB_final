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
