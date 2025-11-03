import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsDateString } from 'class-validator';

export class ShareDocumentDto {
  @ApiProperty({
    description: 'Tipo de compartilhamento',
    example: 'USER',
    enum: ['USER', 'DEPARTMENT', 'ROLE', 'PUBLIC'],
  })
  @IsString()
  sharedWithType: string;

  @ApiPropertyOptional({
    description: 'ID do destinatário (userId, departmentId, etc)',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsString()
  sharedWithId?: string;

  @ApiProperty({
    description: 'Nome para exibição',
    example: 'João Silva',
  })
  @IsString()
  sharedWithName: string;

  @ApiPropertyOptional({
    description: 'Pode visualizar',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  canView?: boolean;

  @ApiPropertyOptional({
    description: 'Pode baixar',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  canDownload?: boolean;

  @ApiPropertyOptional({
    description: 'Pode editar',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  canEdit?: boolean;

  @ApiPropertyOptional({
    description: 'Pode deletar',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  canDelete?: boolean;

  @ApiPropertyOptional({
    description: 'Pode compartilhar',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  canShare?: boolean;

  @ApiPropertyOptional({
    description: 'Data de expiração do compartilhamento',
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({
    description: 'ID de quem está compartilhando',
  })
  @IsString()
  sharedBy: string;

  @ApiProperty({
    description: 'Nome de quem está compartilhando',
  })
  @IsString()
  sharedByName: string;
}
