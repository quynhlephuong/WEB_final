import { ApiProperty } from '@nestjs/swagger';

export class PetDto {
  @ApiProperty({
    example: 'ID',
  })
  id?: string;
  @ApiProperty({
    example: 'ID Client',
  })
  clientId: string;
  @ApiProperty({
    example: 'Jack',
  })
  name: string;
  @ApiProperty({
    example: false,
  })
  gender: boolean;
  @ApiProperty({
    example: 'Chihuahua',
  })
  breed: string;
  @ApiProperty({
    example: '3.5',
  })
  weight: number;
  @ApiProperty({
    example: 'Cờ hó',
  })
  species: string;
  @ApiProperty({
    example: 'Hấp hối',
  })
  status: string;
}
