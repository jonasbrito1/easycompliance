import { Injectable } from '@nestjs/common';
import { RiskLevel } from '../entities/risk.entity';

@Injectable()
export class RiskCalculatorService {
  calculateScore(probability: number, impact: number): number {
    this.validateValue(probability, 'Probability');
    this.validateValue(impact, 'Impact');
    return probability * impact;
  }

  calculateResidualRisk(inherentScore: number, controlEffectiveness: number): number {
    if (controlEffectiveness < 0 || controlEffectiveness > 1) {
      throw new Error('Control effectiveness must be between 0 and 1');
    }
    return Math.round(inherentScore * (1 - controlEffectiveness));
  }

  getRiskLevel(score: number): RiskLevel {
    if (score <= 4) return RiskLevel.LOW;
    if (score <= 9) return RiskLevel.MEDIUM;
    if (score <= 14) return RiskLevel.HIGH;
    return RiskLevel.CRITICAL;
  }

  private validateValue(value: number, name: string): void {
    if (value < 1 || value > 5) {
      throw new Error(`${name} must be between 1 and 5`);
    }
  }
}
