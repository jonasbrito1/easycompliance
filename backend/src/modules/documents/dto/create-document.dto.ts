import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  IsDateString,
  IsArray,
  MinLength,
  MaxLength,
  Min,
} from 'class-validator';

export enum DocumentTypeDto {
  POLITICA = 'POLITICA',
  PROCEDIMENTO = 'PROCEDIMENTO',
  INSTRUCAO = 'INSTRUCAO',
  FORMULARIO = 'FORMULARIO',
  MANUAL = 'MANUAL',
  NORMA = 'NORMA',
  CODIGO_ETICA = 'CODIGO_ETICA',
  CONTRATO = 'CONTRATO',
  REGULAMENTO = 'REGULAMENTO',
  RELATORIO = 'RELATORIO',
  ATA = 'ATA',
  CERTIFICADO = 'CERTIFICADO',
  OUTROS = 'OUTROS',
}

export enum DocumentStatusDto {
  RASCUNHO = 'RASCUNHO',
  REVISAO = 'REVISAO',
  APROVACAO = 'APROVACAO',
  APROVADO = 'APROVADO',
  VIGENTE = 'VIGENTE',
  OBSOLETO = 'OBSOLETO',
  ARQUIVADO = 'ARQUIVADO',
  CANCELADO = 'CANCELADO',
}

export enum DocumentConfidentialityDto {
  PUBLICA = 'PUBLICA',
  INTERNA = 'INTERNA',
  CONFIDENCIAL = 'CONFIDENCIAL',
  RESTRITA = 'RESTRITA',
  SECRETA = 'SECRETA',
}

export class CreateDocumentDto {
  @ApiProperty({
    description: 'Título do documento',
    example: 'Política de Segurança da Informação',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({
    description: 'Descrição detalhada',
    example: 'Política que estabelece as diretrizes de segurança da informação',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Nome do arquivo',
    example: 'politica-seguranca-v1.pdf',
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    description: 'URL do arquivo',
    example: 'https://storage.example.com/docs/politica-seguranca-v1.pdf',
  })
  @IsString()
  fileUrl: string;

  @ApiProperty({
    description: 'Tamanho do arquivo em bytes',
    example: 1048576,
  })
  @IsInt()
  @Min(1)
  fileSize: number;

  @ApiProperty({
    description: 'Tipo MIME do arquivo',
    example: 'application/pdf',
  })
  @IsString()
  mimeType: string;

  @ApiProperty({
    enum: DocumentTypeDto,
    description: 'Tipo do documento',
    example: 'POLITICA',
  })
  @IsEnum(DocumentTypeDto)
  type: DocumentTypeDto;

  @ApiPropertyOptional({
    description: 'Categoria customizável',
    example: 'Segurança da Informação',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    enum: DocumentConfidentialityDto,
    description: 'Nível de confidencialidade',
    example: 'INTERNA',
    default: 'INTERNA',
  })
  @IsEnum(DocumentConfidentialityDto)
  confidentiality: DocumentConfidentialityDto;

  @ApiPropertyOptional({
    description: 'Código do documento (ex: POL-001)',
    example: 'POL-001',
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({
    description: 'Departamento responsável',
    example: 'TI',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Processo relacionado',
    example: 'Segurança da Informação',
  })
  @IsOptional()
  @IsString()
  process?: string;

  @ApiPropertyOptional({
    description: 'Tags para categorização',
    example: ['segurança', 'política', 'TI'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'Palavras-chave para busca',
    example: ['senha', 'acesso', 'proteção'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @ApiPropertyOptional({
    description: 'ID do dono do documento',
  })
  @IsOptional()
  @IsString()
  ownerId?: string;

  @ApiPropertyOptional({
    description: 'Nome do dono',
  })
  @IsOptional()
  @IsString()
  ownerName?: string;

  @ApiPropertyOptional({
    description: 'Data de vigência',
    example: '2024-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  effectiveDate?: string;

  @ApiPropertyOptional({
    description: 'Data de vencimento',
    example: '2025-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({
    description: 'Data de revisão programada',
    example: '2024-06-30T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  reviewDate?: string;

  @ApiPropertyOptional({
    description: 'Se o documento é público',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @ApiProperty({
    description: 'ID da empresa',
  })
  @IsString()
  companyId: string;
}
