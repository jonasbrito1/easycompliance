import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsArray,
  MinLength,
  MaxLength,
} from 'class-validator';

export enum EthicsReportTypeDto {
  ASSEDIO_MORAL = 'ASSEDIO_MORAL',
  ASSEDIO_SEXUAL = 'ASSEDIO_SEXUAL',
  DISCRIMINACAO = 'DISCRIMINACAO',
  FRAUDE = 'FRAUDE',
  CORRUPCAO = 'CORRUPCAO',
  CONFLITO_INTERESSES = 'CONFLITO_INTERESSES',
  VIOLACAO_CODIGO_ETICA = 'VIOLACAO_CODIGO_ETICA',
  VIOLACAO_POLITICAS = 'VIOLACAO_POLITICAS',
  ROUBO_FURTO = 'ROUBO_FURTO',
  USO_INDEVIDO_RECURSOS = 'USO_INDEVIDO_RECURSOS',
  VAZAMENTO_INFORMACOES = 'VAZAMENTO_INFORMACOES',
  MEIO_AMBIENTE = 'MEIO_AMBIENTE',
  SEGURANCA_TRABALHO = 'SEGURANCA_TRABALHO',
  OUTROS = 'OUTROS',
}

export enum EthicsReportOriginDto {
  WEB_ANONIMO = 'WEB_ANONIMO',
  WEB_IDENTIFICADO = 'WEB_IDENTIFICADO',
  TELEFONE = 'TELEFONE',
  EMAIL = 'EMAIL',
  PRESENCIAL = 'PRESENCIAL',
  CARTA = 'CARTA',
  TERCEIROS = 'TERCEIROS',
}

export class CreateEthicsReportDto {
  @ApiProperty({
    enum: EthicsReportTypeDto,
    description: 'Tipo da denúncia',
    example: 'ASSEDIO_MORAL',
  })
  @IsEnum(EthicsReportTypeDto)
  type: EthicsReportTypeDto;

  @ApiProperty({
    description: 'Título resumido da denúncia',
    example: 'Assédio moral no departamento de vendas',
    minLength: 10,
    maxLength: 200,
  })
  @IsString()
  @MinLength(10, { message: 'O título deve ter no mínimo 10 caracteres' })
  @MaxLength(200, { message: 'O título deve ter no máximo 200 caracteres' })
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da denúncia',
    example:
      'Descreva com detalhes o que aconteceu, quando, onde e quem estava envolvido...',
    minLength: 50,
  })
  @IsString()
  @MinLength(50, {
    message: 'A descrição deve ter no mínimo 50 caracteres para melhor análise',
  })
  description: string;

  @ApiProperty({
    enum: EthicsReportOriginDto,
    description: 'Origem da denúncia',
    example: 'WEB_ANONIMO',
  })
  @IsEnum(EthicsReportOriginDto)
  origin: EthicsReportOriginDto;

  @ApiProperty({
    description: 'Se a denúncia é anônima',
    example: true,
  })
  @IsBoolean()
  isAnonymous: boolean;

  @ApiPropertyOptional({
    description: 'Nome do denunciante (obrigatório se não for anônimo)',
    example: 'João da Silva',
  })
  @IsOptional()
  @IsString()
  reporterName?: string;

  @ApiPropertyOptional({
    description: 'Email do denunciante (obrigatório se não for anônimo)',
    example: 'joao.silva@example.com',
  })
  @IsOptional()
  @IsString()
  reporterEmail?: string;

  @ApiPropertyOptional({
    description: 'Telefone do denunciante',
    example: '(11) 98765-4321',
  })
  @IsOptional()
  @IsString()
  reporterPhone?: string;

  @ApiPropertyOptional({
    description: 'Unidade/Filial onde ocorreu',
    example: 'Matriz - São Paulo',
  })
  @IsOptional()
  @IsString()
  unit?: string;

  @ApiPropertyOptional({
    description: 'Departamento onde ocorreu',
    example: 'Departamento de Vendas',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Localização física',
    example: 'Sala 205, 2º andar',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    description: 'Pessoas envolvidas',
    example: 'Gerente: João Silva, Supervisor: Maria Santos',
  })
  @IsOptional()
  @IsString()
  involvedParties?: string;

  @ApiPropertyOptional({
    description: 'Testemunhas',
    example: 'Pedro Oliveira, Ana Costa',
  })
  @IsOptional()
  @IsString()
  witnesses?: string;

  @ApiPropertyOptional({
    description: 'Data do incidente',
    example: '2024-01-15T14:30:00Z',
  })
  @IsOptional()
  @IsDateString()
  incidentDate?: string;

  @ApiPropertyOptional({
    description: 'Tags para categorização',
    example: ['urgente', 'matriz', 'vendas'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'ID da empresa',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  companyId: string;
}
