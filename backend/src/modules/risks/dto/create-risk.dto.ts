import { IsString, IsOptional, IsInt, IsBoolean, IsEnum, Min, Max, IsArray } from 'class-validator';
import { RiskType, RiskLevel } from '@prisma/client';

export class CreateRiskDto {
  @IsString()
  title: string;

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

  @IsString()
  companyId: string;
}
