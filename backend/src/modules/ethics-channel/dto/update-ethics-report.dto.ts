import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsInt,
} from 'class-validator';
import { EthicsReportPriorityDto } from './update-status.dto';

export enum RiskLevelDto {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  CRITICAL = 'CRITICAL',
}

export class UpdateEthicsReportDto {
  @ApiPropertyOptional({
    description: 'Responsável pela investigação (userId)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiPropertyOptional({
    description: 'Equipe de investigação',
    example: 'Equipe de Compliance',
  })
  @IsOptional()
  @IsString()
  investigationTeam?: string;

  @ApiPropertyOptional({
    enum: EthicsReportPriorityDto,
    description: 'Prioridade da denúncia',
    example: 'ALTA',
  })
  @IsOptional()
  @IsEnum(EthicsReportPriorityDto)
  priority?: EthicsReportPriorityDto;

  @ApiPropertyOptional({
    enum: RiskLevelDto,
    description: 'Nível de risco',
    example: 'HIGH',
  })
  @IsOptional()
  @IsEnum(RiskLevelDto)
  riskLevel?: RiskLevelDto;

  @ApiPropertyOptional({
    description: 'Data prevista para conclusão',
    example: '2024-02-15T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'Dias estimados para conclusão',
    example: 30,
  })
  @IsOptional()
  @IsInt()
  estimatedDays?: number;

  @ApiPropertyOptional({
    description: 'Conclusão da investigação',
    example:
      'Após análise dos fatos e entrevistas, foi constatado que houve violação do código de ética...',
  })
  @IsOptional()
  @IsString()
  conclusion?: string;

  @ApiPropertyOptional({
    description: 'Ações tomadas',
    example: 'Advertência formal ao responsável, treinamento obrigatório da equipe',
  })
  @IsOptional()
  @IsString()
  actionsTaken?: string;

  @ApiPropertyOptional({
    description: 'Se a denúncia foi considerada procedente',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isFounded?: boolean;

  @ApiPropertyOptional({
    description: 'Se requer ação imediata',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  requiresAction?: boolean;
}
