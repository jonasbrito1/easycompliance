import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class AddInteractionDto {
  @ApiProperty({
    description: 'Mensagem/comentário',
    example: 'Recebemos sua denúncia e iniciamos a investigação.',
    minLength: 10,
  })
  @IsString()
  @MinLength(10, { message: 'A mensagem deve ter no mínimo 10 caracteres' })
  message: string;

  @ApiPropertyOptional({
    description: 'Se é uma nota interna (não visível ao denunciante)',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isInternal?: boolean;

  @ApiPropertyOptional({
    description: 'Se a mensagem é do denunciante',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isFromReporter?: boolean;

  @ApiProperty({
    description: 'Nome do autor',
    example: 'João Silva',
  })
  @IsString()
  authorName: string;

  @ApiPropertyOptional({
    description: 'ID do autor (userId se for usuário interno)',
  })
  @IsOptional()
  @IsString()
  authorId?: string;

  @ApiPropertyOptional({
    description: 'Papel/cargo do autor',
    example: 'Investigador',
  })
  @IsOptional()
  @IsString()
  authorRole?: string;
}
