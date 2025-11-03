import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsArray,
} from 'class-validator';
import { DocumentStatusDto, DocumentConfidentialityDto } from './create-document.dto';

export class UpdateDocumentDto {
  @ApiPropertyOptional({
    description: 'Título do documento',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Descrição',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: DocumentStatusDto,
    description: 'Status do documento',
  })
  @IsOptional()
  @IsEnum(DocumentStatusDto)
  status?: DocumentStatusDto;

  @ApiPropertyOptional({
    enum: DocumentConfidentialityDto,
    description: 'Nível de confidencialidade',
  })
  @IsOptional()
  @IsEnum(DocumentConfidentialityDto)
  confidentiality?: DocumentConfidentialityDto;

  @ApiPropertyOptional({
    description: 'Categoria',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Departamento',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiPropertyOptional({
    description: 'Processo',
  })
  @IsOptional()
  @IsString()
  process?: string;

  @ApiPropertyOptional({
    description: 'Tags',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    description: 'ID do revisor',
  })
  @IsOptional()
  @IsString()
  reviewerId?: string;

  @ApiPropertyOptional({
    description: 'ID do aprovador',
  })
  @IsOptional()
  @IsString()
  approverId?: string;

  @ApiPropertyOptional({
    description: 'Data de vigência',
  })
  @IsOptional()
  @IsDateString()
  effectiveDate?: string;

  @ApiPropertyOptional({
    description: 'Data de vencimento',
  })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({
    description: 'Data de revisão',
  })
  @IsOptional()
  @IsDateString()
  reviewDate?: string;

  @ApiPropertyOptional({
    description: 'Se é público',
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
