import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RisksService } from './risks.service';
import { RisksController } from './risks.controller';
import { Risk } from './entities/risk.entity';
import { RiskCalculatorService } from './services/risk-calculator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Risk])],
  controllers: [RisksController],
  providers: [RisksService, RiskCalculatorService],
  exports: [RisksService],
})
export class RisksModule {}
