import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { RiskLevel } from '@prisma/client';

@Injectable()
export class RisksService {
  constructor(private prisma: PrismaService) {}

  /**
   * Calcula o nível de risco baseado em probabilidade e impacto
   * Matriz 5x5: 1-4 = VERY_LOW, 5-9 = LOW, 10-14 = MEDIUM, 15-19 = HIGH, 20-24 = VERY_HIGH, 25 = CRITICAL
   */
  private calculateRiskLevel(probability: number, impact: number): RiskLevel {
    const score = probability * impact;

    if (score >= 25) return RiskLevel.CRITICAL;
    if (score >= 20) return RiskLevel.VERY_HIGH;
    if (score >= 15) return RiskLevel.HIGH;
    if (score >= 10) return RiskLevel.MEDIUM;
    if (score >= 5) return RiskLevel.LOW;
    return RiskLevel.VERY_LOW;
  }

  async create(createRiskDto: CreateRiskDto) {
    const { probability = 3, impact = 3, ...rest } = createRiskDto;
    const level = this.calculateRiskLevel(probability, impact);

    return this.prisma.risk.create({
      data: {
        ...rest,
        probability,
        impact,
        level,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(companyId: string, filters?: {
    category?: string;
    level?: RiskLevel;
    isActive?: boolean;
    search?: string;
  }) {
    const where: any = { companyId };

    if (filters?.category) {
      where.category = filters.category;
    }

    if (filters?.level) {
      where.level = filters.level;
    }

    if (filters?.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.risk.findMany({
      where,
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        controls: {
          include: {
            control: true,
          },
        },
      },
      orderBy: [
        { level: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async findOne(id: string) {
    const risk = await this.prisma.risk.findUnique({
      where: { id },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        controls: {
          include: {
            control: true,
          },
        },
      },
    });

    if (!risk) {
      throw new NotFoundException(`Risk with ID ${id} not found`);
    }

    return risk;
  }

  async update(id: string, updateRiskDto: UpdateRiskDto) {
    const existing = await this.findOne(id);

    const probability = updateRiskDto.probability ?? existing.probability;
    const impact = updateRiskDto.impact ?? existing.impact;
    const level = this.calculateRiskLevel(probability, impact);

    return this.prisma.risk.update({
      where: { id },
      data: {
        ...updateRiskDto,
        level,
      },
      include: {
        company: {
          select: {
            id: true,
            name: true,
          },
        },
        controls: {
          include: {
            control: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.risk.delete({
      where: { id },
    });
  }

  /**
   * Retorna estatísticas de riscos por empresa
   */
  async getStatistics(companyId: string) {
    const risks = await this.prisma.risk.findMany({
      where: { companyId, isActive: true },
    });

    const total = risks.length;
    const byLevel = {
      CRITICAL: risks.filter(r => r.level === RiskLevel.CRITICAL).length,
      VERY_HIGH: risks.filter(r => r.level === RiskLevel.VERY_HIGH).length,
      HIGH: risks.filter(r => r.level === RiskLevel.HIGH).length,
      MEDIUM: risks.filter(r => r.level === RiskLevel.MEDIUM).length,
      LOW: risks.filter(r => r.level === RiskLevel.LOW).length,
      VERY_LOW: risks.filter(r => r.level === RiskLevel.VERY_LOW).length,
    };

    const byCategory: Record<string, number> = {};
    risks.forEach(risk => {
      const category = risk.category || 'Outros';
      byCategory[category] = (byCategory[category] || 0) + 1;
    });

    // Matriz de riscos para heatmap
    const matrix: number[][] = Array(5).fill(0).map(() => Array(5).fill(0));
    risks.forEach(risk => {
      const prob = risk.probability - 1; // 0-4
      const imp = risk.impact - 1; // 0-4
      matrix[prob][imp]++;
    });

    return {
      total,
      byLevel,
      byCategory,
      matrix,
    };
  }

  /**
   * Adiciona um controle a um risco
   */
  async addControl(riskId: string, controlId: string) {
    // Verifica se o risco existe
    await this.findOne(riskId);

    // Verifica se o controle existe
    const control = await this.prisma.control.findUnique({
      where: { id: controlId },
    });

    if (!control) {
      throw new NotFoundException(`Control with ID ${controlId} not found`);
    }

    // Adiciona a relação (se ainda não existir)
    return this.prisma.riskControl.upsert({
      where: {
        riskId_controlId: {
          riskId,
          controlId,
        },
      },
      create: {
        riskId,
        controlId,
      },
      update: {},
      include: {
        risk: true,
        control: true,
      },
    });
  }

  /**
   * Remove um controle de um risco
   */
  async removeControl(riskId: string, controlId: string) {
    const riskControl = await this.prisma.riskControl.findFirst({
      where: {
        riskId,
        controlId,
      },
    });

    if (!riskControl) {
      throw new NotFoundException('Risk-Control relationship not found');
    }

    return this.prisma.riskControl.delete({
      where: { id: riskControl.id },
    });
  }
}
