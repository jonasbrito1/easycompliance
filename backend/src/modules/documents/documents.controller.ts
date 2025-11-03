import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ShareDocumentDto } from './dto/share-document.dto';

@ApiTags('Documentos')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check do módulo de Documentos' })
  @ApiResponse({ status: 200, description: 'Módulo funcionando corretamente' })
  health() {
    return {
      status: 'ok',
      module: 'documents',
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo documento' })
  @ApiResponse({ status: 201, description: 'Documento criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createDto: CreateDocumentDto) {
    return this.documentsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar documentos' })
  @ApiQuery({ name: 'companyId', required: true })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'ownerId', required: false })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de documentos' })
  async findAll(
    @Query('companyId') companyId: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('ownerId') ownerId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.documentsService.findAll({
      companyId,
      type,
      status,
      category,
      search,
      ownerId,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 50,
    });
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Obter estatísticas de documentos' })
  @ApiQuery({ name: 'companyId', required: true })
  @ApiResponse({ status: 200, description: 'Estatísticas' })
  async getStatistics(@Query('companyId') companyId: string) {
    return this.documentsService.getStatistics(companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar documento por ID' })
  @ApiQuery({ name: 'companyId', required: true })
  @ApiResponse({ status: 200, description: 'Detalhes do documento' })
  @ApiResponse({ status: 404, description: 'Documento não encontrado' })
  async findOne(
    @Param('id') id: string,
    @Query('companyId') companyId: string,
  ) {
    return this.documentsService.findOne(id, companyId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar documento' })
  @ApiQuery({ name: 'companyId', required: true })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'userName', required: true })
  @ApiResponse({ status: 200, description: 'Documento atualizado' })
  @ApiResponse({ status: 404, description: 'Documento não encontrado' })
  async update(
    @Param('id') id: string,
    @Query('companyId') companyId: string,
    @Query('userId') userId: string,
    @Query('userName') userName: string,
    @Body() updateDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, companyId, updateDto, userId, userName);
  }

  @Post(':id/share')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Compartilhar documento' })
  @ApiQuery({ name: 'companyId', required: true })
  @ApiResponse({ status: 201, description: 'Documento compartilhado' })
  async share(
    @Param('id') id: string,
    @Query('companyId') companyId: string,
    @Body() shareDto: ShareDocumentDto,
  ) {
    return this.documentsService.share(id, companyId, shareDto);
  }

  @Post(':id/comments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar comentário' })
  @ApiQuery({ name: 'companyId', required: true })
  @ApiResponse({ status: 201, description: 'Comentário adicionado' })
  async addComment(
    @Param('id') id: string,
    @Query('companyId') companyId: string,
    @Body()
    body: {
      content: string;
      authorId: string;
      authorName: string;
      page?: number;
    },
  ) {
    return this.documentsService.addComment(
      id,
      companyId,
      body.content,
      body.authorId,
      body.authorName,
      body.page,
    );
  }

  @Post(':id/download')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Registrar download' })
  @ApiQuery({ name: 'companyId', required: true })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'userName', required: true })
  @ApiResponse({ status: 200, description: 'Download registrado' })
  async recordDownload(
    @Param('id') id: string,
    @Query('companyId') companyId: string,
    @Query('userId') userId: string,
    @Query('userName') userName: string,
  ) {
    return this.documentsService.recordDownload(id, companyId, userId, userName);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir documento' })
  @ApiQuery({ name: 'companyId', required: true })
  @ApiQuery({ name: 'userId', required: true })
  @ApiQuery({ name: 'userName', required: true })
  @ApiResponse({ status: 200, description: 'Documento excluído' })
  async remove(
    @Param('id') id: string,
    @Query('companyId') companyId: string,
    @Query('userId') userId: string,
    @Query('userName') userName: string,
  ) {
    return this.documentsService.remove(id, companyId, userId, userName);
  }
}
