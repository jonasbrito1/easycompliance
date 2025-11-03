# Guia Prático de Implementação do MVP
## EasyCompliance - 4 Meses (16 Semanas)

---

## 📋 Índice

1. [Checklist de Setup Inicial](#checklist-de-setup-inicial)
2. [Sprint 1-2: Fundação (Semanas 1-4)](#sprint-1-2-fundação)
3. [Sprint 3-4: Multi-Tenant (Semanas 5-8)](#sprint-3-4-multi-tenant)
4. [Sprint 5-6: Gestão de Riscos (Semanas 9-12)](#sprint-5-6-gestão-de-riscos)
5. [Sprint 7-8: Documentos & Deploy (Semanas 13-16)](#sprint-7-8-documentos--deploy)
6. [Definition of Done](#definition-of-done)
7. [Métricas de Qualidade](#métricas-de-qualidade)

---

## Checklist de Setup Inicial

### Dia 1: Repositório e Ferramentas

```bash
# 1. Criar repositório
git init
git remote add origin https://github.com/username/easycompliance.git

# 2. Estrutura de branches
git checkout -b develop
git checkout -b staging
git checkout -b main

# 3. Criar estrutura de pastas
mkdir -p backend/{src,test,docs}
mkdir -p frontend/{src,public,docs}
mkdir -p infrastructure
mkdir -p docs

# 4. Inicializar projetos
cd backend && npm init -y
cd ../frontend && npx create-next-app@latest . --typescript --tailwind --app

# 5. Configurar ferramentas
npm install -D eslint prettier husky lint-staged
npx husky install
```

### Configurações Essenciais

#### .husky/pre-commit
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint
npm run type-check
npm run test:staged
```

#### package.json
```json
{
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "test": "jest",
    "test:cov": "jest --coverage",
    "test:staged": "jest --findRelatedTests",
    "lint": "eslint \"{src,test}/**/*.ts\"",
    "lint:fix": "eslint \"{src,test}/**/*.ts\" --fix",
    "format": "prettier --write \"src/**/*.ts\"",
    "type-check": "tsc --noEmit"
  },
  "lint-staged": {
    "*.ts": [
      "eslint --fix",
      "prettier --write",
      "jest --findRelatedTests"
    ]
  }
}
```

---

## Sprint 1-2: Fundação

### Semana 1: Infraestrutura Backend

**Objetivo:** Setup completo do backend com autenticação funcional

#### Dia 1-2: Setup NestJS
```bash
# Instalar CLI e criar projeto
npm i -g @nestjs/cli
nest new backend --package-manager npm

# Instalar dependências essenciais
npm install @nestjs/typeorm typeorm pg
npm install @nestjs/passport passport passport-jwt
npm install @nestjs/jwt bcrypt
npm install class-validator class-transformer
npm install @nestjs/config
npm install redis ioredis
```

#### Estrutura de Módulos
```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   └── users/
│       ├── users.module.ts
│       ├── users.controller.ts
│       ├── users.service.ts
│       ├── users.repository.ts
│       └── entities/
│           └── user.entity.ts
├── common/
│   ├── decorators/
│   │   └── current-user.decorator.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── filters/
│       └── http-exception.filter.ts
├── config/
│   ├── database.config.ts
│   └── jwt.config.ts
└── main.ts
```

#### Código Essencial: User Entity
```typescript
// src/modules/users/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'consultant', 'client', 'viewer'] })
  role: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

#### Auth Service Completo
```typescript
// src/modules/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDTO, RegisterDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDTO) {
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    return this.generateTokens(user);
  }

  async login(dto: LoginDTO) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  private generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
```

#### Dia 3-4: Database e Migrations

```typescript
// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false, // NUNCA true em produção
  logging: process.env.NODE_ENV === 'development',
};
```

```bash
# Criar migration inicial
npm run migration:create -- src/database/migrations/InitialSchema

# Executar migrations
npm run migration:run

# Reverter migration
npm run migration:revert
```

#### Dia 5: CI/CD Setup

```yaml
# .github/workflows/backend-ci.yml
name: Backend CI

on:
  push:
    branches: [develop, staging, main]
    paths:
      - 'backend/**'
  pull_request:
    branches: [develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install dependencies
        working-directory: backend
        run: npm ci

      - name: Run tests
        working-directory: backend
        run: npm run test:cov

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./backend/coverage/lcov.info
```

### Semana 2: Frontend Foundation

#### Dia 1-2: Next.js 14 Setup

```bash
# Criar projeto Next.js
npx create-next-app@latest frontend --typescript --tailwind --app

cd frontend

# Instalar dependências
npm install zustand
npm install react-hook-form zod @hookform/resolvers
npm install @tanstack/react-query
npm install axios
npm install lucide-react
npm install clsx tailwind-merge
```

#### App Structure
```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   └── forms/
│       └── LoginForm.tsx
├── lib/
│   ├── api/
│   │   └── client.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   └── utils.ts
└── store/
    └── auth.store.ts
```

#### API Client
```typescript
// src/lib/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - adiciona token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - trata erros
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado - tentar refresh
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const { data } = await axios.post('/auth/refresh', { refreshToken });
          localStorage.setItem('accessToken', data.accessToken);

          // Retry request original
          error.config.headers.Authorization = `Bearer ${data.accessToken}`;
          return axios(error.config);
        } catch {
          // Refresh falhou - logout
          localStorage.clear();
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
```

#### Auth Store (Zustand)
```typescript
// src/store/auth.store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (user: User, accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      login: (user, accessToken, refreshToken) => {
        set({ user, accessToken, refreshToken });
      },

      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null });
        localStorage.clear();
      },

      isAuthenticated: () => {
        const { accessToken } = get();
        return !!accessToken;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
```

#### Login Form
```typescript
// src/components/forms/LoginForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import apiClient from '@/lib/api/client';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await apiClient.post('/auth/login', data);
      const { user, accessToken, refreshToken } = response.data;

      login(user, accessToken, refreshToken);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Credenciais inválidas');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Senha
        </label>
        <input
          {...register('password')}
          type="password"
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  );
}
```

### Semana 3-4: Design System e Infraestrutura

#### shadcn/ui Components
```bash
# Instalar shadcn/ui
npx shadcn-ui@latest init

# Adicionar componentes base
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add table
npx shadcn-ui@latest add toast
```

#### Infrastructure as Code (Terraform)
```hcl
# infrastructure/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# RDS PostgreSQL
resource "aws_db_instance" "postgres" {
  identifier           = "easycompliance-${var.environment}"
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  storage_encrypted    = true

  db_name  = "easycompliance"
  username = var.db_username
  password = var.db_password

  backup_retention_period = 7
  skip_final_snapshot     = var.environment == "dev"

  tags = {
    Environment = var.environment
  }
}

# S3 Bucket para documentos
resource "aws_s3_bucket" "documents" {
  bucket = "easycompliance-documents-${var.environment}"

  tags = {
    Environment = var.environment
  }
}

resource "aws_s3_bucket_versioning" "documents" {
  bucket = aws_s3_bucket.documents.id

  versioning_configuration {
    status = "Enabled"
  }
}

# ElastiCache Redis
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "easycompliance-${var.environment}"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379
}
```

---

## Sprint 3-4: Multi-Tenant

### Semana 5-6: Multi-Tenancy Backend

#### Company Entity
```typescript
// src/modules/companies/entities/company.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  cnpj: string;

  @Column()
  name: string;

  @Column({ name: 'trading_name' })
  tradingName: string;

  @Column({ type: 'simple-json', nullable: true })
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

#### Tenant Isolation Guard
```typescript
// src/common/guards/tenant.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const companyIdParam = request.params.companyId;

    // Verifica se o usuário tem acesso à empresa solicitada
    if (companyIdParam && user.companyId !== companyIdParam) {
      // Admin pode acessar todas as empresas
      if (user.role !== 'admin') {
        throw new ForbiddenException('You do not have access to this company');
      }
    }

    return true;
  }
}
```

#### Company Selector Component
```typescript
// src/components/CompanySelector.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import apiClient from '@/lib/api/client';
import { Check, ChevronsUpDown } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  tradingName: string;
}

export function CompanySelector() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const { data } = await apiClient.get('/companies');
    setCompanies(data);
    if (data.length > 0) {
      setSelectedCompany(data[0].id);
    }
  };

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompany(companyId);
    // Atualizar contexto global
    localStorage.setItem('selectedCompanyId', companyId);
    window.location.reload(); // Recarrega para aplicar novo contexto
  };

  const currentCompany = companies.find((c) => c.id === selectedCompany);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50"
      >
        <span className="font-medium">
          {currentCompany?.tradingName || 'Selecione uma empresa'}
        </span>
        <ChevronsUpDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute mt-2 w-full rounded-lg border bg-white shadow-lg">
          {companies.map((company) => (
            <button
              key={company.id}
              onClick={() => {
                handleSelectCompany(company.id);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-2 hover:bg-gray-50"
            >
              <div className="text-left">
                <div className="font-medium">{company.tradingName}</div>
                <div className="text-sm text-gray-500">{company.name}</div>
              </div>
              {selectedCompany === company.id && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Semana 7-8: Dashboard e Notificações

#### WebSocket Gateway
```typescript
// src/modules/notifications/notifications.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/notifications',
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const payload = this.jwtService.verify(token);

      // Join room baseado na empresa
      client.join(`company:${payload.companyId}`);
      console.log(`User ${payload.sub} joined company room ${payload.companyId}`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  sendToCompany(companyId: string, event: string, data: any) {
    this.server.to(`company:${companyId}`).emit(event, data);
  }

  sendToUser(userId: string, event: string, data: any) {
    this.server.to(`user:${userId}`).emit(event, data);
  }
}
```

---

## Sprint 5-6: Gestão de Riscos

### Risk Entity (Completa)
```typescript
// src/modules/risks/entities/risk.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';

export enum RiskType {
  INHERENT = 'inherent',
  RESIDUAL = 'residual',
  TARGET = 'target',
}

export enum RiskCategory {
  OPERATIONAL = 'operational',
  FINANCIAL = 'financial',
  STRATEGIC = 'strategic',
  COMPLIANCE = 'compliance',
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

@Entity('risks')
export class Risk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ name: 'company_id' })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ type: 'enum', enum: RiskCategory })
  category: RiskCategory;

  @Column({ type: 'int', comment: 'Probability (1-5)' })
  probability: number;

  @Column({ type: 'int', comment: 'Impact (1-5)' })
  impact: number;

  @Column({ type: 'int', comment: 'Calculated risk score (probability * impact)' })
  score: number;

  @Column({ type: 'enum', enum: RiskLevel })
  level: RiskLevel;

  @Column({ name: 'control_effectiveness', type: 'decimal', precision: 3, scale: 2, default: 0 })
  controlEffectiveness: number;

  @Column({ name: 'residual_score', type: 'int', nullable: true })
  residualScore: number;

  @Column({ name: 'owner_id', nullable: true })
  ownerId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ default: 'active' })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

### Risk Calculator Service
```typescript
// src/modules/risks/services/risk-calculator.service.ts
import { Injectable } from '@nestjs/common';
import { RiskLevel } from '../entities/risk.entity';

@Injectable()
export class RiskCalculatorService {
  /**
   * Calcula o score do risco (probabilidade × impacto)
   */
  calculateScore(probability: number, impact: number): number {
    this.validateValue(probability, 'Probability');
    this.validateValue(impact, 'Impact');
    return probability * impact;
  }

  /**
   * Calcula o risco residual aplicando a efetividade dos controles
   */
  calculateResidualRisk(inherentScore: number, controlEffectiveness: number): number {
    if (controlEffectiveness < 0 || controlEffectiveness > 1) {
      throw new Error('Control effectiveness must be between 0 and 1');
    }
    return Math.round(inherentScore * (1 - controlEffectiveness));
  }

  /**
   * Determina o nível do risco baseado no score
   */
  getRiskLevel(score: number): RiskLevel {
    if (score <= 4) return RiskLevel.LOW;
    if (score <= 9) return RiskLevel.MEDIUM;
    if (score <= 14) return RiskLevel.HIGH;
    return RiskLevel.CRITICAL;
  }

  /**
   * Valida se o valor está no intervalo correto (1-5)
   */
  private validateValue(value: number, name: string): void {
    if (value < 1 || value > 5) {
      throw new Error(`${name} must be between 1 and 5`);
    }
  }
}
```

### Risk Matrix Component
```typescript
// src/components/risks/RiskMatrix.tsx
'use client';

import { useMemo } from 'react';

interface Risk {
  id: string;
  name: string;
  probability: number;
  impact: number;
  score: number;
  level: string;
}

interface RiskMatrixProps {
  risks: Risk[];
}

export function RiskMatrix({ risks }: RiskMatrixProps) {
  const matrix = useMemo(() => {
    const grid: Risk[][][] = Array(5)
      .fill(null)
      .map(() =>
        Array(5)
          .fill(null)
          .map(() => [])
      );

    risks.forEach((risk) => {
      const row = 5 - risk.probability; // Inverte para ter 5 no topo
      const col = risk.impact - 1;
      grid[row][col].push(risk);
    });

    return grid;
  }, [risks]);

  const getCellColor = (probability: number, impact: number): string => {
    const score = probability * impact;
    if (score <= 4) return 'bg-green-100 border-green-300';
    if (score <= 9) return 'bg-yellow-100 border-yellow-300';
    if (score <= 14) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full">
        {/* Labels */}
        <div className="mb-2 text-center font-bold">IMPACTO →</div>

        <div className="flex">
          {/* Probability Label */}
          <div className="flex flex-col justify-center pr-4">
            <div className="rotate-180 text-center font-bold" style={{ writingMode: 'vertical-rl' }}>
              ← PROBABILIDADE
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="grid grid-cols-5 gap-1">
            {matrix.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const probability = 5 - rowIndex;
                const impact = colIndex + 1;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      relative h-24 w-24 border-2 p-2
                      ${getCellColor(probability, impact)}
                      hover:shadow-lg transition-shadow cursor-pointer
                    `}
                  >
                    {/* Score no canto */}
                    <div className="absolute right-1 top-1 text-xs font-bold opacity-50">
                      {probability * impact}
                    </div>

                    {/* Riscos na célula */}
                    <div className="flex h-full flex-col justify-center">
                      {cell.slice(0, 2).map((risk) => (
                        <div
                          key={risk.id}
                          className="mb-1 truncate rounded bg-white px-1 text-xs shadow"
                          title={risk.name}
                        >
                          {risk.name}
                        </div>
                      ))}
                      {cell.length > 2 && (
                        <div className="text-xs font-bold">+{cell.length - 2} mais</div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-green-100 border-2 border-green-300"></div>
            <span className="text-sm">Baixo (1-4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-yellow-100 border-2 border-yellow-300"></div>
            <span className="text-sm">Médio (5-9)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-orange-100 border-2 border-orange-300"></div>
            <span className="text-sm">Alto (10-14)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded bg-red-100 border-2 border-red-300"></div>
            <span className="text-sm">Crítico (15-25)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Sprint 7-8: Documentos & Deploy

### Document Service
```typescript
// src/modules/documents/documents.service.ts
import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DocumentsService {
  private s3: S3;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_REGION'),
    });
    this.bucketName = configService.get('AWS_S3_BUCKET');
  }

  async upload(file: Express.Multer.File, companyId: string): Promise<string> {
    const fileKey = `${companyId}/${uuid()}-${file.originalname}`;

    await this.s3
      .upload({
        Bucket: this.bucketName,
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
        ServerSideEncryption: 'AES256',
      })
      .promise();

    return fileKey;
  }

  async download(fileKey: string): Promise<Buffer> {
    const result = await this.s3
      .getObject({
        Bucket: this.bucketName,
        Key: fileKey,
      })
      .promise();

    return result.Body as Buffer;
  }

  async delete(fileKey: string): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: this.bucketName,
        Key: fileKey,
      })
      .promise();
  }

  async getSignedUrl(fileKey: string, expiresIn: number = 3600): Promise<string> {
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: this.bucketName,
      Key: fileKey,
      Expires: expiresIn,
    });
  }
}
```

### Deploy Script
```bash
#!/bin/bash
# scripts/deploy.sh

set -e

echo "🚀 Starting deployment..."

# 1. Run tests
echo "🧪 Running tests..."
npm run test

# 2. Build
echo "🏗️  Building application..."
npm run build

# 3. Run migrations
echo "📊 Running database migrations..."
npm run migration:run

# 4. Deploy to AWS (example with Elastic Beanstalk)
echo "☁️  Deploying to AWS..."
eb deploy easycompliance-production

# 5. Health check
echo "🏥 Running health check..."
curl -f https://api.easycompliance.app/health || exit 1

echo "✅ Deployment completed successfully!"
```

---

## Definition of Done

### Para cada Feature:

- [ ] Código implementado e funcional
- [ ] Testes unitários escritos (cobertura >80%)
- [ ] Testes de integração para fluxos críticos
- [ ] Code review aprovado
- [ ] Documentação atualizada (README, Swagger)
- [ ] Sem warnings do ESLint
- [ ] TypeScript sem erros
- [ ] Migrations criadas (se necessário)
- [ ] Deploy em staging bem-sucedido
- [ ] QA manual realizado
- [ ] Performance aceitável (<3s time to interactive)
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Acessível (básico WCAG 2.1 AA)

### Para cada Sprint:

- [ ] Todas as features do sprint completadas
- [ ] Demo realizada para stakeholders
- [ ] Retrospectiva documentada
- [ ] Backlog atualizado para próximo sprint
- [ ] Métricas coletadas (bugs, velocity, etc.)

---

## Métricas de Qualidade

### Code Quality Metrics

```bash
# Cobertura de testes (mínimo 80%)
npm run test:cov

# Complexidade ciclomática (máximo 10 por função)
npx ts-cyclomatic-complexity src/**/*.ts

# Duplicação de código
npx jscpd src/

# Type coverage
npx type-coverage
```

### Performance Budgets

```json
{
  "budgets": [
    {
      "type": "bundle",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    }
  ]
}
```

### Lighthouse Scores (mínimos)

- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

---

## Comandos Rápidos

```bash
# Development
npm run dev              # Start dev server
npm run test:watch       # Watch mode tests

# Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix lint issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript check

# Testing
npm run test             # Run all tests
npm run test:cov         # With coverage
npm run test:e2e         # E2E tests

# Database
npm run migration:create # Create migration
npm run migration:run    # Run migrations
npm run migration:revert # Revert migration
npm run seed             # Seed database

# Build & Deploy
npm run build            # Production build
npm run start            # Start production
npm run deploy:staging   # Deploy to staging
npm run deploy:prod      # Deploy to production
```

---

**Última atualização:** 2025-10-21
**Versão:** 1.0 - MVP Implementation Guide
