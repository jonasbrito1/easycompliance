import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ShareDocumentDto } from './dto/share-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Cria um novo documento
   */
  async create(dto: CreateDocumentDto) {
    // Verificar se código já existe (se fornecido)
    if (dto.code) {
      const existing = await this.prisma.document.findFirst({
        where: {
          companyId: dto.companyId,
          code: dto.code,
          isDeleted: false,
        },
      });

      if (existing) {
        throw new BadRequestException(`Código ${dto.code} já está em uso`);
      }
    }

    // Criar documento
    const document = await this.prisma.document.create({
      data: {
        title: dto.title,
        description: dto.description,
        fileName: dto.fileName,
        fileUrl: dto.fileUrl,
        fileSize: dto.fileSize,
        mimeType: dto.mimeType,
        type: dto.type,
        category: dto.category,
        confidentiality: dto.confidentiality,
        code: dto.code,
        department: dto.department,
        process: dto.process,
        tags: dto.tags || [],
        keywords: dto.keywords || [],
        ownerId: dto.ownerId,
        ownerName: dto.ownerName,
        effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate) : null,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        reviewDate: dto.reviewDate ? new Date(dto.reviewDate) : null,
        isPublic: dto.isPublic || false,
        companyId: dto.companyId,
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    });

    // Criar primeira versão
    await this.prisma.documentVersion.create({
      data: {
        documentId: document.id,
        version: '1.0',
        fileName: dto.fileName,
        fileUrl: dto.fileUrl,
        fileSize: dto.fileSize,
        changeLog: 'Versão inicial',
        createdByName: dto.ownerName || 'Sistema',
        createdBy: dto.ownerId,
      },
    });

    // Registrar atividade
    await this.prisma.documentActivity.create({
      data: {
        documentId: document.id,
        action: 'CREATED',
        description: `Documento criado: ${dto.title}`,
        userName: dto.ownerName || 'Sistema',
        userId: dto.ownerId,
      },
    });

    return document;
  }

  /**
   * Lista documentos com filtros
   */
  async findAll(params: {
    companyId: string;
    type?: string;
    status?: string;
    category?: string;
    search?: string;
    ownerId?: string;
    page?: number;
    limit?: number;
  }) {
    const { companyId, type, status, category, search, ownerId, page = 1, limit = 50 } = params;

    const where: any = {
      companyId,
      isDeleted: false,
      isLatestVersion: true, // Mostrar apenas versões mais recentes
    };

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (ownerId) {
      where.ownerId = ownerId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { code: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
        { keywords: { has: search } },
      ];
    }

    const [documents, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        include: {
          company: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              versions: true,
              comments: true,
              shares: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.document.count({ where }),
    ]);

    return {
      data: documents,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Busca documento por ID
   */
  async findOne(id: string, companyId: string) {
    const document = await this.prisma.document.findFirst({
      where: {
        id,
        companyId,
        isDeleted: false,
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
        versions: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        shares: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        comments: {
          where: {
            isResolved: false,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        activities: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 20,
        },
        approvals: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    // Incrementar contador de visualizações
    await this.prisma.document.update({
      where: { id },
      data: {
        viewCount: { increment: 1 },
      },
    });

    return document;
  }

  /**
   * Atualiza documento
   */
  async update(
    id: string,
    companyId: string,
    dto: UpdateDocumentDto,
    userId: string,
    userName: string,
  ) {
    const document = await this.prisma.document.findFirst({
      where: { id, companyId, isDeleted: false },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    const updated = await this.prisma.document.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        confidentiality: dto.confidentiality,
        category: dto.category,
        department: dto.department,
        process: dto.process,
        tags: dto.tags,
        reviewerId: dto.reviewerId,
        approverId: dto.approverId,
        effectiveDate: dto.effectiveDate ? new Date(dto.effectiveDate) : undefined,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
        reviewDate: dto.reviewDate ? new Date(dto.reviewDate) : undefined,
        isPublic: dto.isPublic,
      },
    });

    // Registrar mudanças importantes
    const changes: string[] = [];
    if (dto.status && dto.status !== document.status) {
      changes.push(`Status: ${document.status} → ${dto.status}`);
    }
    if (dto.confidentiality && dto.confidentiality !== document.confidentiality) {
      changes.push(`Confidencialidade: ${document.confidentiality} → ${dto.confidentiality}`);
    }

    if (changes.length > 0) {
      await this.prisma.documentActivity.create({
        data: {
          documentId: id,
          action: 'UPDATED',
          description: changes.join(', '),
          userName,
          userId,
        },
      });
    }

    return updated;
  }

  /**
   * Compartilha documento
   */
  async share(documentId: string, companyId: string, dto: ShareDocumentDto) {
    const document = await this.prisma.document.findFirst({
      where: { id: documentId, companyId, isDeleted: false },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    const share = await this.prisma.documentShare.create({
      data: {
        documentId,
        sharedWithType: dto.sharedWithType,
        sharedWithId: dto.sharedWithId,
        sharedWithName: dto.sharedWithName,
        canView: dto.canView ?? true,
        canDownload: dto.canDownload ?? true,
        canEdit: dto.canEdit ?? false,
        canDelete: dto.canDelete ?? false,
        canShare: dto.canShare ?? false,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
        sharedBy: dto.sharedBy,
        sharedByName: dto.sharedByName,
      },
    });

    // Registrar atividade
    await this.prisma.documentActivity.create({
      data: {
        documentId,
        action: 'SHARED',
        description: `Compartilhado com ${dto.sharedWithName}`,
        userName: dto.sharedByName,
        userId: dto.sharedBy,
      },
    });

    return share;
  }

  /**
   * Adiciona comentário
   */
  async addComment(
    documentId: string,
    companyId: string,
    content: string,
    authorId: string,
    authorName: string,
    page?: number,
  ) {
    const document = await this.prisma.document.findFirst({
      where: { id: documentId, companyId, isDeleted: false },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    const comment = await this.prisma.documentComment.create({
      data: {
        documentId,
        content,
        page,
        authorId,
        authorName,
      },
    });

    return comment;
  }

  /**
   * Registra download
   */
  async recordDownload(
    id: string,
    companyId: string,
    userId: string,
    userName: string,
  ) {
    const document = await this.prisma.document.findFirst({
      where: { id, companyId, isDeleted: false },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    // Incrementar contador
    await this.prisma.document.update({
      where: { id },
      data: {
        downloadCount: { increment: 1 },
      },
    });

    // Registrar atividade
    await this.prisma.documentActivity.create({
      data: {
        documentId: id,
        action: 'DOWNLOADED',
        description: `Download realizado por ${userName}`,
        userName,
        userId,
      },
    });
  }

  /**
   * Soft delete
   */
  async remove(id: string, companyId: string, userId: string, userName: string) {
    const document = await this.prisma.document.findFirst({
      where: { id, companyId, isDeleted: false },
    });

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    await this.prisma.document.update({
      where: { id },
      data: {
        isDeleted: true,
        isActive: false,
      },
    });

    // Registrar atividade
    await this.prisma.documentActivity.create({
      data: {
        documentId: id,
        action: 'DELETED',
        description: `Documento excluído por ${userName}`,
        userName,
        userId,
      },
    });

    return { message: 'Documento excluído com sucesso' };
  }

  /**
   * Estatísticas
   */
  async getStatistics(companyId: string) {
    const [total, byType, byStatus, expiringDocs, recentDocs] = await Promise.all([
      // Total
      this.prisma.document.count({
        where: { companyId, isDeleted: false, isLatestVersion: true },
      }),

      // Por tipo
      this.prisma.document.groupBy({
        by: ['type'],
        where: { companyId, isDeleted: false, isLatestVersion: true },
        _count: true,
      }),

      // Por status
      this.prisma.document.groupBy({
        by: ['status'],
        where: { companyId, isDeleted: false, isLatestVersion: true },
        _count: true,
      }),

      // Documentos vencendo (próximos 30 dias)
      this.prisma.document.count({
        where: {
          companyId,
          isDeleted: false,
          isLatestVersion: true,
          expiryDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
        },
      }),

      // Documentos recentes (últimos 7 dias)
      this.prisma.document.count({
        where: {
          companyId,
          isDeleted: false,
          isLatestVersion: true,
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
    ]);

    return {
      total,
      byType: byType.reduce(
        (acc, item) => {
          acc[item.type] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      byStatus: byStatus.reduce(
        (acc, item) => {
          acc[item.status] = item._count;
          return acc;
        },
        {} as Record<string, number>,
      ),
      expiringDocs,
      recentDocs,
    };
  }
}
