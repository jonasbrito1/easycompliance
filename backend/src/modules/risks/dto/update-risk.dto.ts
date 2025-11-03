import { IsString, IsOptional, IsInt, IsBoolean, IsEnum, Min, Max } from 'class-validator';
import { RiskType, RiskLevel } from '@prisma/client';

export class UpdateRiskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsEnum(RiskType)
  @IsOptional()
  type?: RiskType;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  probability?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  impact?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
