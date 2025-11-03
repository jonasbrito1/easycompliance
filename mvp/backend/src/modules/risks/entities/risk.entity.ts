import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';

export enum RiskCategory {
  OPERATIONAL = 'operational',
  FINANCIAL = 'financial',
  STRATEGIC = 'strategic',
  COMPLIANCE = 'compliance',
  REPUTATIONAL = 'reputational',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum RiskStatus {
  ACTIVE = 'active',
  MITIGATED = 'mitigated',
  ACCEPTED = 'accepted',
  TRANSFERRED = 'transferred',
  ARCHIVED = 'archived',
}

@Entity('risks')
export class Risk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @ManyToOne(() => Company, (company) => company.risks)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: RiskCategory,
  })
  category: RiskCategory;

  @Column({ type: 'int' })
  probability: number; // 1-5

  @Column({ type: 'int' })
  impact: number; // 1-5

  @Column({ type: 'int' })
  score: number; // probability * impact

  @Column({
    type: 'enum',
    enum: RiskLevel,
  })
  level: RiskLevel;

  @Column({
    name: 'control_effectiveness',
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  controlEffectiveness: number;

  @Column({ name: 'residual_score', type: 'int', nullable: true })
  residualScore: number;

  @Column({ name: 'owner_id', nullable: true })
  ownerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({
    type: 'enum',
    enum: RiskStatus,
    default: RiskStatus.ACTIVE,
  })
  status: RiskStatus;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
