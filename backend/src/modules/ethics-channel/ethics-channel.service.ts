import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateEthicsReportDto } from './dto/create-ethics-report.dto';
import { AddInteractionDto } from './dto/add-interaction.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateEthicsReportDto } from './dto/update-ethics-report.dto';

@Injectable()
export class EthicsChannelService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Gera um protocolo único para a denúncia
   * Formato: ETH-YYYYMMDD-XXXX (ex: ETH-20240115-0001)
   */
  private async generateProtocol(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;

    // Buscar o último protocolo do dia
    const lastReport = await this.prisma.ethicsReport.findFirst({
      where: {
        protocol: {
          startsWith: `ETH-${dateStr}`,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    let sequence = 1;
    if (lastReport) {
      const lastSequence = parseInt(lastReport.protocol.split('-')[2]);
      sequence = lastSequence + 1;
    }

    const sequenceStr = String(sequence).padStart(4, '0');
    return `ETH-${dateStr}-${sequenceStr}`;
  }

  /**
   * Calcula a data de vencimento (SLA) baseado na configuração da empresa
   */
  private async calculateDueDate(companyId: string): Promise<Date> {
    const config = await this.prisma.ethicsChannelConfig.findUnique({
      where: { companyId },
    });

    const days = config?.slaResponseDays || 15;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);
    return dueDate;
  }

  /**
   * Cria uma nova denúncia
   */
  async create(dto: CreateEthicsReportDto) {
    // Validar se não é anônimo mas não informou dados
    if (!dto.isAnonymous && !dto.reporterName) {
      throw new BadRequestException(
        'Nome do denunciante é obrigatório para denúncias não anônimas',
      );
    }

    const protocol = await this.generateProtocol();
    const dueDate = await this.calculateDueDate(dto.companyId);

    // Criar a denúncia
    const report = await this.prisma.ethicsReport.create({
      data: {
        protocol,
        type: dto.type,
        title: dto.title,
        description: dto.description,
        origin: dto.origin,
        isAnonymous: dto.isAnonymous,
        reporterName: dto.reporterName,
        reporterEmail: dto.reporterEmail,
        reporterPhone: dto.reporterPhone,
        unit: dto.unit,
        department: dto.department,
        location: dto.location,
        involvedParties: dto.involvedParties,
        witnesses: dto.witnesses,
        incidentDate: dto.incidentDate ? new Date(dto.incidentDate) : null,
        tags: dto.tags || [],
        dueDate,
        companyId: dto.companyId,
      },
      include: {
        company: {
          select: {
            name: true,
            cnpj: true,
          },
        },
      },
    });

    // Criar entrada na timeline
    await this.prisma.ethicsReportTimeline.create({
      data: {
        reportId: report.id,
        action: 'REPORT_CREATED',
        description: `Denúncia criada com protocolo ${protocol}`,
        newValue: 'NOVO',
        userName: dto.isAnonymous ? 'Anônimo' : dto.reporterName || 'Sistema',
        userRole: 'REPORTER',
      },
    });

    return {
      ...report,
      message: 'Denúncia registrada com sucesso',
      protocol: report.protocol,
    };
  }

  /**
   * Lista todas as denúncias de uma empresa
   */
  async findAll(companyId: string, filters?: {
    status?: string;
    type?: string;
    priority?: string;
    search?: string;
  }) {
    const where: any = {
      companyId,
      isDeleted: false,
    };

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.priority) {
      where.priority = filters.priority;
    }

    if (filters?.search) {
      where.OR = [
        { protocol: { contains: filters.search, mode: 'insensitive' } },
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const reports = await this.prisma.ethicsReport.findMany({
      where,
      include: {
        company: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            interactions: true,
            attachments: true,
          },
        },
      },
      orderBy: {
        reportedAt: 'desc',
      },
    });

    return reports;
  }

  /**
   * Busca uma denúncia por protocolo
   */
  async findByProtocol(protocol: string, companyId: string) {
    const report = await this.prisma.ethicsReport.findFirst({
      where: {
        protocol,
        companyId,
        isDeleted: false,
      },
      include: {
        company: {
          select: {
            name: true,
            cnpj: true,
          },
        },
        interactions: {
          where: {
            isVisible: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        attachments: {
          orderBy: {
            uploadedAt: 'desc',
          },
        },
        timeline: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 50, // Últimos 50 eventos
        },
      },
    });

    if (!report) {
      throw new NotFoundException('Denúncia não encontrada');
    }

    // Incrementar contador de visualizações
    await this.prisma.ethicsReport.update({
      where: { id: report.id },
      data: {
        viewCount: { increment: 1 },
      },
    });

    return report;
  }

  /**
   * Adiciona uma interação/mensagem
   */
  async addInteraction(
    reportId: string,
    dto: AddInteractionDto,
    companyId: string,
  ) {
    // Verificar se a denúncia existe e pertence à empresa
    const report = await this.prisma.ethicsReport.findFirst({
      where: {
        id: reportId,
        companyId,
        isDeleted: false,
      },
    });

    if (!report) {
      throw new NotFoundException('Denúncia não encontrada');
    }

    // Criar interação
    const interaction = await this.prisma.ethicsReportInteraction.create({
      data: {
        reportId,
        message: dto.message,
        isInternal: dto.isInternal || false,
        isFromReporter: dto.isFromReporter || false,
        authorId: dto.authorId,
        authorName: dto.authorName,
        authorRole: dto.authorRole,
      },
    });

    // Atualizar lastInteractionAt
    await this.prisma.ethicsReport.update({
      where: { id: reportId },
      data: {
        lastInteractionAt: new Date(),
      },
    });

    // Criar entrada na timeline
    await this.prisma.ethicsReportTimeline.create({
      data: {
        reportId,
        action: dto.isInternal ? 'INTERNAL_NOTE_ADDED' : 'MESSAGE_SENT',
        description: `${dto.isInternal ? 'Nota interna adicionada' : 'Mensagem enviada'} por ${dto.authorName}`,
        userName: dto.authorName,
        userId: dto.authorId,
        userRole: dto.authorRole,
      },
    });

    return interaction;
  }

  /**
   * Atualiza o status da denúncia
   */
  async updateStatus(
    reportId: string,
    dto: UpdateStatusDto,
    companyId: string,
  ) {
    // Verificar se a denúncia existe
    const report = await this.prisma.ethicsReport.findFirst({
      where: {
        id: reportId,
        companyId,
        isDeleted: false,
      },
    });

    if (!report) {
      throw new NotFoundException('Denúncia não encontrada');
    }

    // Atualizar status
    const updated = await this.prisma.ethicsReport.update({
      where: { id: reportId },
      data: {
        status: dto.status,
        substatus: dto.substatus,
        lastInteractionAt: new Date(),
        closedAt: ['CONCLUIDO', 'ARQUIVADO', 'CANCELADO'].includes(dto.status)
          ? new Date()
          : null,
      },
    });

    // Criar entrada na timeline
    await this.prisma.ethicsReportTimeline.create({
      data: {
        reportId,
        action: 'STATUS_CHANGED',
        description: dto.reason || `Status alterado para ${dto.status}`,
        oldValue: report.status,
        newValue: dto.status,
        userName: dto.userName,
        userId: dto.userId,
      },
    });

    // Se houver justificativa, adicionar como interação
    if (dto.reason) {
      await this.addInteraction(reportId, {
        message: dto.reason,
        isInternal: false,
        authorName: dto.userName,
        authorId: dto.userId,
      }, companyId);
    }

    return updated;
  }

  /**
   * Atualiza informações da denúncia
   */
  async update(
    reportId: string,
    dto: UpdateEthicsReportDto,
    companyId: string,
    userId: string,
    userName: string,
  ) {
    // Verificar se a denúncia existe
    const report = await this.prisma.ethicsReport.findFirst({
      where: {
        id: reportId,
        companyId,
        isDeleted: false,
      },
    });

    if (!report) {
      throw new NotFoundException('Denúncia não encontrada');
    }

    // Atualizar denúncia
    const updated = await this.prisma.ethicsReport.update({
      where: { id: reportId },
      data: {
        assignedTo: dto.assignedTo,
        investigationTeam: dto.investigationTeam,
        priority: dto.priority,
        riskLevel: dto.riskLevel,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        estimatedDays: dto.estimatedDays,
        conclusion: dto.conclusion,
        actionsTaken: dto.actionsTaken,
        isFounded: dto.isFounded,
        requiresAction: dto.requiresAction,
        lastInteractionAt: new Date(),
      },
    });

    // Criar entradas na timeline para as mudanças
    const changes: string[] = [];

    if (dto.assignedTo && dto.assignedTo !== report.assignedTo) {
      changes.push('Responsável alterado');
    }
    if (dto.priority && dto.priority !== report.priority) {
      changes.push(`Prioridade alterada para ${dto.priority}`);
    }
    if (dto.conclusion) {
      changes.push('Conclusão adicionada');
    }

    if (changes.length > 0) {
      await this.prisma.ethicsReportTimeline.create({
        data: {
          reportId,
          action: 'REPORT_UPDATED',
          description: changes.join(', '),
          userName,
          userId,
        },
      });
    }

    return updated;
  }

  /**
   * Estatísticas do canal de ética
   */
  async getStatistics(companyId: string) {
    const [total, byStatus, byType, byPriority, avgResponseTime] =
      await Promise.all([
        // Total de denúncias
        this.prisma.ethicsReport.count({
          where: { companyId, isDeleted: false },
        }),

        // Por status
        this.prisma.ethicsReport.groupBy({
          by: ['status'],
          where: { companyId, isDeleted: false },
          _count: true,
        }),

        // Por tipo
        this.prisma.ethicsReport.groupBy({
          by: ['type'],
          where: { companyId, isDeleted: false },
          _count: true,
        }),

        // Por prioridade
        this.prisma.ethicsReport.groupBy({
          by: ['priority'],
          where: { companyId, isDeleted: false },
          _count: true,
        }),

        // Tempo médio de resposta (denúncias concluídas)
        this.prisma.ethicsReport.aggregate({
          where: {
            companyId,
            isDeleted: false,
            status: 'CONCLUIDO',
            closedAt: { not: null },
          },
          _avg: {
            estimatedDays: true,
          },
        }),
      ]);

    return {
      total,
      byStatus: byStatus.reduce(
        (acc, item) => {
          acc[item.status] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      byType: byType.reduce(
        (acc, item) => {
          acc[item.type] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      byPriority: byPriority.reduce(
        (acc, item) => {
          acc[item.priority] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      avgResponseTime: avgResponseTime._avg.estimatedDays || 0,
    };
  }
}
