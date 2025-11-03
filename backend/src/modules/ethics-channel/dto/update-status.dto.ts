import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional } from 'class-validator';

export enum EthicsReportStatusDto {
  NOVO = 'NOVO',
  EM_ANALISE = 'EM_ANALISE',
  EM_INVESTIGACAO = 'EM_INVESTIGACAO',
  AGUARDANDO_INFORMACOES = 'AGUARDANDO_INFORMACOES',
  AGUARDANDO_DECISAO = 'AGUARDANDO_DECISAO',
  EM_ACAO = 'EM_ACAO',
  CONCLUIDO = 'CONCLUIDO',
  ARQUIVADO = 'ARQUIVADO',
  CANCELADO = 'CANCELADO',
}

export enum EthicsReportPriorityDto {
  BAIXA = 'BAIXA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  URGENTE = 'URGENTE',
}

export class UpdateStatusDto {
  @ApiProperty({
    enum: EthicsReportStatusDto,
    description: 'Novo status da denúncia',
    example: 'EM_INVESTIGACAO',
  })
  @IsEnum(EthicsReportStatusDto)
  status: EthicsReportStatusDto;

  @ApiPropertyOptional({
    description: 'Substatus customizável',
    example: 'Aguardando entrevista com testemunhas',
  })
  @IsOptional()
  @IsString()
  substatus?: string;

  @ApiPropertyOptional({
    description: 'Justificativa da mudança de status',
    example: 'Iniciando processo de investigação formal',
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({
    description: 'ID do usuário que está alterando',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Nome do usuário que está alterando',
  })
  @IsString()
  userName: string;
}
