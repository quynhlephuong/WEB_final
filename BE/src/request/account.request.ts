import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enumdef/user.role.enum';

export class UserDto {
  @ApiProperty({
    example: 'dsaasdasd',
  })
  id?: string;
  @ApiProperty({
    example: 'cl',
  })
  username: string;
  @ApiProperty({
    example: 'pwd',
  })
  password: string;
  @ApiProperty({
    example: UserRole.CLIENT,
  })
  role: UserRole;
}

export class ChangeDetailsDto {
  @ApiProperty({
    example: 'Nguyễn Văn A',
  })
  name?: string;
  @ApiProperty({
    example: false,
  })
  gender?: boolean;
  @ApiProperty({
    example: 'Số 2 Lê Duẩn',
  })
  address?: string;
  @ApiProperty({
    example: 'test@gmail.com',
  })
  email?: string;
  @ApiProperty({
    example: '0173829292',
  })
  phone?: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    example: 'oldpassword',
  })
  oldPassword: string;
  @ApiProperty({
    example: 'newpassword',
  })
  newPassword: string;
}
