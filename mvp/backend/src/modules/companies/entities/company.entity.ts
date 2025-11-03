import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Risk } from '../../risks/entities/risk.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'trading_name', length: 255 })
  tradingName: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ name: 'address_street', length: 255, nullable: true })
  addressStreet: string;

  @Column({ name: 'address_number', length: 20, nullable: true })
  addressNumber: string;

  @Column({ name: 'address_complement', length: 100, nullable: true })
  addressComplement: string;

  @Column({ name: 'address_city', length: 100, nullable: true })
  addressCity: string;

  @Column({ name: 'address_state', length: 2, nullable: true })
  addressState: string;

  @Column({ name: 'address_zip_code', length: 8, nullable: true })
  addressZipCode: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => Risk, (risk) => risk.company)
  risks: Risk[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
