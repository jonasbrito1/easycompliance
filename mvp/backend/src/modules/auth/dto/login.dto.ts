import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@easycompliance.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin@2024' })
  @IsString()
  @MinLength(6)
  password: string;
}
