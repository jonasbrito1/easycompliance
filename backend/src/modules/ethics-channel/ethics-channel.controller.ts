import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { EthicsChannelService } from './ethics-channel.service';
import { CreateEthicsReportDto } from './dto/create-ethics-report.dto';
import { AddInteractionDto } from './dto/add-interaction.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateEthicsReportDto } from './dto/update-ethics-report.dto';

@ApiTags('Canal de Ética')
@Controller('ethics-channel')
export class EthicsChannelController {
  constructor(private readonly ethicsChannelService: EthicsChannelService) {}

  @Get('health')
  @ApiOperation({ summary: 'Health check do módulo de Canal de Ética' })
  @ApiResponse({ status: 200, description: 'Módulo funcionando corretamente' })
  health() {
    return {
      status: 'ok',
      module: 'ethics-channel',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('reports')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar nova denúncia' })
  @ApiResponse({
    status: 201,
    description: 'Denúncia criada com sucesso',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        protocol: 'ETH-20240115-0001',
        type: 'ASSEDIO_MORAL',
        title: 'Assédio moral no departamento',
        status: 'NOVO',
        message: 'Denúncia registrada com sucesso',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() createDto: CreateEthicsReportDto) {
    return this.ethicsChannelService.create(createDto);
  }

  @Get('reports')
  @ApiOperation({ summary: 'Listar denúncias de uma empresa' })
  @ApiQuery({ name: 'companyId', required: true, description: 'ID da empresa' })
  @ApiQuery({ name: 'status', required: false, description: 'Filtrar por status' })
  @ApiQuery({ name: 'type', required: false, description: 'Filtrar por tipo' })
  @ApiQuery({ name: 'priority', required: false, description: 'Filtrar por prioridade' })
  @ApiQuery({ name: 'search', required: false, description: 'Busca por protocolo, título ou descrição' })
  @ApiResponse({
    status: 200,
    description: 'Lista de denúncias',
  })
  async findAll(
    @Query('companyId') companyId: string,
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('priority') priority?: string,
    @Query('search') search?: string,
  ) {
    return this.ethicsChannelService.findAll(companyId, {
      status,
      type,
      priority,
      search,
    });
  }

  @Get('reports/:protocol')
  @ApiOperation({ summary: 'Buscar denúncia por protocolo' })
  @ApiQuery({ name: 'companyId', required: true, description: 'ID da empresa' })
  @ApiResponse({
    status: 200,
    description: 'Detalhes da denúncia',
  })
  @ApiResponse({ status: 404, description: 'Denúncia não encontrada' })
  async findByProtocol(
    @Param('protocol') protocol: string,
    @Query('companyId') companyId: string,
  ) {
    return this.ethicsChannelService.findByProtocol(protocol, companyId);
  }

  @Post('reports/:reportId/interactions')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar interação/mensagem a uma denúncia' })
  @ApiQuery({ name: 'companyId', required: true, description: 'ID da empresa' })
  @ApiResponse({
    status: 201,
    description: 'Interação adicionada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Denúncia não encontrada' })
  async addInteraction(
    @Param('reportId') reportId: string,
    @Query('companyId') companyId: string,
    @Body() dto: AddInteractionDto,
  ) {
    return this.ethicsChannelService.addInteraction(reportId, dto, companyId);
  }

  @Put('reports/:reportId/status')
  @ApiOperation({ summary: 'Atualizar status de uma denúncia' })
  @ApiQuery({ name: 'companyId', required: true, description: 'ID da empresa' })
  @ApiResponse({
    status: 200,
    description: 'Status atualizado com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Denúncia não encontrada' })
  async updateStatus(
    @Param('reportId') reportId: string,
    @Query('companyId') companyId: string,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.ethicsChannelService.updateStatus(reportId, dto, companyId);
  }

  @Put('reports/:reportId')
  @ApiOperation({ summary: 'Atualizar informações de uma denúncia' })
  @ApiQuery({ name: 'companyId', required: true, description: 'ID da empresa' })
  @ApiQuery({ name: 'userId', required: true, description: 'ID do usuário que está atualizando' })
  @ApiQuery({ name: 'userName', required: true, description: 'Nome do usuário que está atualizando' })
  @ApiResponse({
    status: 200,
    description: 'Denúncia atualizada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Denúncia não encontrada' })
  async update(
    @Param('reportId') reportId: string,
    @Query('companyId') companyId: string,
    @Query('userId') userId: string,
    @Query('userName') userName: string,
    @Body() dto: UpdateEthicsReportDto,
  ) {
    return this.ethicsChannelService.update(
      reportId,
      dto,
      companyId,
      userId,
      userName,
    );
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Obter estatísticas do canal de ética' })
  @ApiQuery({ name: 'companyId', required: true, description: 'ID da empresa' })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas do canal',
    schema: {
      example: {
        total: 45,
        byStatus: {
          NOVO: 5,
          EM_ANALISE: 10,
          EM_INVESTIGACAO: 15,
          CONCLUIDO: 15,
        },
        byType: {
          ASSEDIO_MORAL: 12,
          FRAUDE: 8,
          CORRUPCAO: 5,
        },
        byPriority: {
          BAIXA: 10,
          MEDIA: 20,
          ALTA: 10,
          URGENTE: 5,
        },
        avgResponseTime: 25,
      },
    },
  })
  async getStatistics(@Query('companyId') companyId: string) {
    return this.ethicsChannelService.getStatistics(companyId);
  }
}
