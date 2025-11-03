import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Risk, RiskLevel } from './entities/risk.entity';
import { RiskCalculatorService } from './services/risk-calculator.service';

@Injectable()
export class RisksService {
  constructor(
    @InjectRepository(Risk)
    private risksRepository: Repository<Risk>,
    private riskCalculator: RiskCalculatorService,
  ) {}

  async create(createRiskDto: any, userId: string): Promise<Risk> {
    const score = this.riskCalculator.calculateScore(
      createRiskDto.probability,
      createRiskDto.impact,
    );
    const level = this.riskCalculator.getRiskLevel(score);
    const residualScore = this.riskCalculator.calculateResidualRisk(
      score,
      createRiskDto.controlEffectiveness || 0,
    );

    const risk = this.risksRepository.create({
      ...createRiskDto,
      score,
      level,
      residualScore,
      createdBy: userId,
    });

    return await this.risksRepository.save(risk) as unknown as Risk;
  }

  async findAll(companyId: string): Promise<Risk[]> {
    return this.risksRepository.find({
      where: { companyId },
      relations: ['owner', 'creator'],
      order: { score: 'DESC' },
    });
  }

  async findById(id: string, companyId: string): Promise<Risk> {
    const risk = await this.risksRepository.findOne({
      where: { id, companyId },
      relations: ['owner', 'creator'],
    });

    if (!risk) {
      throw new NotFoundException('Risk not found');
    }

    return risk;
  }

  async update(id: string, companyId: string, updateData: Partial<Risk>): Promise<Risk> {
    const risk = await this.findById(id, companyId);

    if (updateData.probability || updateData.impact) {
      const probability = updateData.probability || risk.probability;
      const impact = updateData.impact || risk.impact;
      const score = this.riskCalculator.calculateScore(probability, impact);
      const level = this.riskCalculator.getRiskLevel(score);

      updateData.score = score;
      updateData.level = level;
    }

    if (updateData.score && updateData.controlEffectiveness !== undefined) {
      updateData.residualScore = this.riskCalculator.calculateResidualRisk(
        updateData.score,
        updateData.controlEffectiveness,
      );
    }

    await this.risksRepository.update(id, updateData);
    return this.findById(id, companyId);
  }

  async remove(id: string, companyId: string): Promise<void> {
    await this.risksRepository.delete({ id, companyId });
  }

  async getRiskMatrix(companyId: string): Promise<any> {
    const risks = await this.findAll(companyId);

    const matrix: Risk[][][] = Array(5).fill(null).map(() =>
      Array(5).fill(null).map(() => [])
    );

    risks.forEach(risk => {
      const row = 5 - risk.probability;
      const col = risk.impact - 1;
      matrix[row][col].push(risk);
    });

    return {
      matrix,
      summary: {
        total: risks.length,
        critical: risks.filter(r => r.level === RiskLevel.CRITICAL).length,
        high: risks.filter(r => r.level === RiskLevel.HIGH).length,
        medium: risks.filter(r => r.level === RiskLevel.MEDIUM).length,
        low: risks.filter(r => r.level === RiskLevel.LOW).length,
      },
    };
  }
}
