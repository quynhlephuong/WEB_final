import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({
    description: 'User Name',
    example: 'ad',
  })
  username: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '0944944944',
  })
  phone: string;

  @ApiProperty({
    description: 'Email',
    example: 'abc@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: 'pwd',
  })
  password: string;

  @ApiProperty({
    description: 'Role',
    example: 'WORKER',
  })
  role: string;
}

export class LoginRequest {
  @ApiProperty({
    description: 'Username',
    example: 'admin',
  })
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'admin',
  })
  password: string;
}

export class ForgetRequest {
  @ApiProperty({
    description: 'Email',
    example: 'abc@mail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone Number',
    example: '0192408923',
  })
  phone: string;
}
