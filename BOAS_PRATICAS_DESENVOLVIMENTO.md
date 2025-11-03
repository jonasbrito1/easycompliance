# Boas Práticas de Desenvolvimento e Engenharia de Software
## EasyCompliance MVP - Guia Técnico Completo

---

## Índice

1. [Arquitetura e Design](#1-arquitetura-e-design)
2. [Padrões de Código](#2-padrões-de-código)
3. [Controle de Versão (Git)](#3-controle-de-versão-git)
4. [Testes Automatizados](#4-testes-automatizados)
5. [CI/CD Pipeline](#5-cicd-pipeline)
6. [Segurança](#6-segurança)
7. [Performance e Otimização](#7-performance-e-otimização)
8. [Documentação](#8-documentação)
9. [Code Review](#9-code-review)
10. [Monitoramento e Logs](#10-monitoramento-e-logs)
11. [DevOps e Infraestrutura](#11-devops-e-infraestrutura)
12. [Qualidade de Código](#12-qualidade-de-código)

---

## 1. Arquitetura e Design

### 1.1 Princípios Fundamentais

#### SOLID Principles

**S - Single Responsibility Principle (SRP)**
```typescript
// ❌ BAD: Classe com múltiplas responsabilidades
class UserService {
  createUser(data) { /* ... */ }
  sendEmail(email) { /* ... */ }
  generateReport() { /* ... */ }
  validateCPF(cpf) { /* ... */ }
}

// ✅ GOOD: Separação de responsabilidades
class UserService {
  constructor(
    private emailService: EmailService,
    private validationService: ValidationService
  ) {}

  async createUser(data: CreateUserDTO) {
    await this.validationService.validateCPF(data.cpf);
    const user = await this.userRepository.create(data);
    await this.emailService.sendWelcomeEmail(user.email);
    return user;
  }
}

class EmailService {
  async sendWelcomeEmail(email: string) { /* ... */ }
  async sendPasswordReset(email: string) { /* ... */ }
}

class ValidationService {
  validateCPF(cpf: string): boolean { /* ... */ }
  validateCNPJ(cnpj: string): boolean { /* ... */ }
}
```

**O - Open/Closed Principle**
```typescript
// ✅ GOOD: Aberto para extensão, fechado para modificação
interface RiskCalculator {
  calculate(risk: Risk): number;
}

class InherentRiskCalculator implements RiskCalculator {
  calculate(risk: Risk): number {
    return risk.probability * risk.impact;
  }
}

class ResidualRiskCalculator implements RiskCalculator {
  calculate(risk: Risk): number {
    const inherent = risk.probability * risk.impact;
    return inherent * (1 - risk.controlEffectiveness);
  }
}

class RiskService {
  constructor(private calculator: RiskCalculator) {}

  assessRisk(risk: Risk): number {
    return this.calculator.calculate(risk);
  }
}
```

**L - Liskov Substitution Principle**
```typescript
// ✅ GOOD: Subtipos devem ser substituíveis pelos seus tipos base
interface Document {
  upload(): Promise<void>;
  download(): Promise<Buffer>;
}

class PDFDocument implements Document {
  async upload(): Promise<void> { /* ... */ }
  async download(): Promise<Buffer> { /* ... */ }
}

class ImageDocument implements Document {
  async upload(): Promise<void> { /* ... */ }
  async download(): Promise<Buffer> { /* ... */ }
}
```

**I - Interface Segregation Principle**
```typescript
// ❌ BAD: Interface muito grande
interface User {
  login(): void;
  logout(): void;
  createReport(): void;
  manageCompanies(): void;
  adminPanel(): void; // Nem todos os usuários são admin!
}

// ✅ GOOD: Interfaces segregadas
interface Authenticatable {
  login(): void;
  logout(): void;
}

interface Reporter {
  createReport(): void;
  exportReport(): void;
}

interface CompanyManager {
  manageCompanies(): void;
  switchCompany(id: string): void;
}

interface Administrator extends Authenticatable, CompanyManager {
  adminPanel(): void;
}

class ConsultantUser implements Authenticatable, Reporter, CompanyManager {
  login() { /* ... */ }
  logout() { /* ... */ }
  createReport() { /* ... */ }
  exportReport() { /* ... */ }
  manageCompanies() { /* ... */ }
  switchCompany(id: string) { /* ... */ }
}
```

**D - Dependency Inversion Principle**
```typescript
// ❌ BAD: Dependência de implementação concreta
class UserService {
  private db = new PostgresDatabase(); // Acoplamento forte

  async getUser(id: string) {
    return this.db.query('SELECT * FROM users WHERE id = $1', [id]);
  }
}

// ✅ GOOD: Dependência de abstração
interface Database {
  query(sql: string, params: any[]): Promise<any>;
}

class UserService {
  constructor(private db: Database) {} // Injeção de dependência

  async getUser(id: string) {
    return this.db.query('SELECT * FROM users WHERE id = $1', [id]);
  }
}

class PostgresDatabase implements Database {
  async query(sql: string, params: any[]) { /* ... */ }
}
```

### 1.2 Arquitetura em Camadas

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                      │
│  (Controllers, Routes, Middlewares, DTOs, Validation)       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                      │
│         (Use Cases, Services, Business Logic)               │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                        DOMAIN LAYER                         │
│    (Entities, Value Objects, Domain Events, Interfaces)     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                      │
│  (Database, External APIs, File Storage, Email, Cache)      │
└─────────────────────────────────────────────────────────────┘
```

#### Estrutura de Pastas (Backend - NestJS)

```
src/
├── modules/
│   ├── auth/
│   │   ├── controllers/
│   │   │   └── auth.controller.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── jwt.service.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── auth.module.ts
│   │
│   ├── companies/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── dto/
│   │   ├── entities/
│   │   └── companies.module.ts
│   │
│   ├── risks/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── dto/
│   │   ├── entities/
│   │   └── risks.module.ts
│   │
│   └── documents/
│       ├── controllers/
│       ├── services/
│       ├── dto/
│       ├── entities/
│       └── documents.module.ts
│
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── interceptors/
│   ├── pipes/
│   ├── guards/
│   └── utils/
│
├── config/
│   ├── database.config.ts
│   ├── jwt.config.ts
│   └── app.config.ts
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── data-source.ts
│
└── main.ts
```

#### Estrutura de Pastas (Frontend - Next.js 14)

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── companies/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── risks/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── documents/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   └── [...catchAll]/
│   │       └── route.ts
│   │
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   │
│   ├── forms/
│   │   ├── LoginForm.tsx
│   │   ├── CompanyForm.tsx
│   │   └── RiskForm.tsx
│   │
│   ├── layouts/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── DashboardLayout.tsx
│   │
│   └── features/
│       ├── risks/
│       │   ├── RiskMatrix.tsx
│       │   ├── RiskCard.tsx
│       │   └── RiskChart.tsx
│       └── companies/
│           └── CompanySelector.tsx
│
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   └── endpoints.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCompanies.ts
│   │   └── useRisks.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── constants.ts
│   └── types/
│       ├── user.ts
│       ├── company.ts
│       └── risk.ts
│
├── store/
│   ├── auth.store.ts
│   ├── company.store.ts
│   └── ui.store.ts
│
└── styles/
    └── globals.css
```

### 1.3 Design Patterns Essenciais

#### Repository Pattern

```typescript
// domain/repositories/user.repository.interface.ts
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}

// infrastructure/repositories/user.repository.ts
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async findById(id: string): Promise<User | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async create(data: CreateUserDTO): Promise<User> {
    const entity = this.repository.create(data);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  private toDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      email: entity.email,
      name: entity.name,
      // ...
    });
  }
}

// application/services/user.service.ts
@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
```

#### Factory Pattern

```typescript
// Risk Calculator Factory
interface RiskCalculator {
  calculate(risk: Risk): number;
}

class InherentRiskCalculator implements RiskCalculator {
  calculate(risk: Risk): number {
    return risk.probability * risk.impact;
  }
}

class ResidualRiskCalculator implements RiskCalculator {
  calculate(risk: Risk): number {
    const inherent = risk.probability * risk.impact;
    return inherent * (1 - risk.controlEffectiveness);
  }
}

class TargetRiskCalculator implements RiskCalculator {
  calculate(risk: Risk): number {
    return risk.targetProbability * risk.targetImpact;
  }
}

@Injectable()
export class RiskCalculatorFactory {
  create(type: RiskType): RiskCalculator {
    switch (type) {
      case RiskType.INHERENT:
        return new InherentRiskCalculator();
      case RiskType.RESIDUAL:
        return new ResidualRiskCalculator();
      case RiskType.TARGET:
        return new TargetRiskCalculator();
      default:
        throw new Error(`Unknown risk type: ${type}`);
    }
  }
}

// Usage
class RiskService {
  constructor(private calculatorFactory: RiskCalculatorFactory) {}

  assessRisk(risk: Risk, type: RiskType): number {
    const calculator = this.calculatorFactory.create(type);
    return calculator.calculate(risk);
  }
}
```

#### Strategy Pattern

```typescript
// Document Upload Strategy
interface UploadStrategy {
  upload(file: File): Promise<string>;
  delete(url: string): Promise<void>;
}

class S3UploadStrategy implements UploadStrategy {
  async upload(file: File): Promise<string> {
    // Upload to AWS S3
    const result = await s3.upload({
      Bucket: 'easycompliance-docs',
      Key: file.name,
      Body: file.buffer
    }).promise();
    return result.Location;
  }

  async delete(url: string): Promise<void> {
    // Delete from S3
  }
}

class LocalUploadStrategy implements UploadStrategy {
  async upload(file: File): Promise<string> {
    // Save locally for development
    const path = `./uploads/${file.name}`;
    await fs.writeFile(path, file.buffer);
    return path;
  }

  async delete(url: string): Promise<void> {
    await fs.unlink(url);
  }
}

@Injectable()
export class DocumentService {
  private uploadStrategy: UploadStrategy;

  constructor(@Inject('CONFIG') private config: AppConfig) {
    this.uploadStrategy = config.env === 'production'
      ? new S3UploadStrategy()
      : new LocalUploadStrategy();
  }

  async uploadDocument(file: File): Promise<string> {
    return this.uploadStrategy.upload(file);
  }
}
```

#### Observer Pattern (Event-Driven)

```typescript
// domain/events/user-created.event.ts
export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string
  ) {}
}

// application/listeners/user-created.listener.ts
@Injectable()
export class UserCreatedListener {
  constructor(
    private emailService: EmailService,
    private auditService: AuditService
  ) {}

  @OnEvent('user.created')
  async handleUserCreated(event: UserCreatedEvent) {
    // Send welcome email
    await this.emailService.sendWelcomeEmail(event.email, event.name);

    // Log audit
    await this.auditService.log({
      action: 'USER_CREATED',
      userId: event.userId,
      timestamp: new Date()
    });
  }
}

// application/services/user.service.ts
@Injectable()
export class UserService {
  constructor(
    private userRepository: IUserRepository,
    private eventEmitter: EventEmitter2
  ) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create(data);

    // Emit event
    this.eventEmitter.emit('user.created',
      new UserCreatedEvent(user.id, user.email, user.name)
    );

    return user;
  }
}
```

---

## 2. Padrões de Código

### 2.1 TypeScript - Configuração Estrita

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "strict": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

### 2.2 ESLint - Regras de Qualidade

```json
// .eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:security/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint",
    "security",
    "import",
    "unused-imports"
  ],
  "rules": {
    // TypeScript
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"]
      },
      {
        "selector": "class",
        "format": ["PascalCase"]
      },
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE", "PascalCase"]
      }
    ],

    // Code Quality
    "complexity": ["error", 10],
    "max-lines": ["error", 300],
    "max-lines-per-function": ["error", 50],
    "max-depth": ["error", 3],
    "max-params": ["error", 4],

    // Imports
    "import/order": [
      "error",
      {
        "groups": [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ],
        "newlines-between": "always",
        "alphabetize": {
          "order": "asc"
        }
      }
    ],
    "unused-imports/no-unused-imports": "error",

    // Security
    "security/detect-object-injection": "warn",
    "security/detect-non-literal-regexp": "warn"
  }
}
```

### 2.3 Prettier - Formatação Consistente

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true,
  "jsxSingleQuote": false
}
```

### 2.4 Nomenclatura e Convenções

```typescript
// ✅ GOOD: Nomenclatura clara e descritiva

// Classes: PascalCase
class UserService {}
class RiskCalculator {}

// Interfaces: PascalCase com prefixo "I"
interface IUserRepository {}
interface IRiskCalculator {}

// Types: PascalCase
type UserRole = 'admin' | 'consultant' | 'client';
type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// Constantes: UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const API_BASE_URL = process.env.API_URL;

// Variáveis e funções: camelCase
const currentUser = useAuth();
const isAuthenticated = checkAuth();

// Funções booleanas: prefixo is, has, should, can
function isValidEmail(email: string): boolean {}
function hasPermission(user: User, permission: string): boolean {}
function shouldShowWarning(risk: Risk): boolean {}
function canEditCompany(user: User, companyId: string): boolean {}

// Event Handlers: prefixo handle ou on
const handleSubmit = () => {};
const onUserClick = () => {};

// Hooks customizados: prefixo use
function useAuth() {}
function useCompanies() {}
function useRiskMatrix() {}

// Componentes: PascalCase
function LoginForm() {}
function RiskMatrix() {}
function CompanySelector() {}

// Arquivos:
// - Componentes: PascalCase (UserCard.tsx)
// - Utilities: kebab-case (date-utils.ts)
// - Hooks: camelCase (useAuth.ts)
// - Types: kebab-case (user-types.ts)
```

### 2.5 Comentários Significativos

```typescript
// ❌ BAD: Comentários óbvios
// Incrementa i
i++;

// Retorna o usuário
function getUser() {
  return user;
}

// ✅ GOOD: Comentários que agregam valor

/**
 * Calcula o risco residual aplicando a efetividade dos controles
 * sobre o risco inerente.
 *
 * Fórmula: Risco Residual = Risco Inerente × (1 - Efetividade dos Controles)
 *
 * @param inherentRisk - Risco inerente calculado (probabilidade × impacto)
 * @param controlEffectiveness - Efetividade dos controles (0 a 1)
 * @returns Valor do risco residual
 *
 * @example
 * const residual = calculateResidualRisk(25, 0.7); // 7.5
 */
function calculateResidualRisk(
  inherentRisk: number,
  controlEffectiveness: number
): number {
  if (controlEffectiveness < 0 || controlEffectiveness > 1) {
    throw new Error('Control effectiveness must be between 0 and 1');
  }

  return inherentRisk * (1 - controlEffectiveness);
}

// FIXME: Bug na validação de CPF - aceita CPFs inválidos com dígitos repetidos
// TODO: Implementar cache Redis para melhorar performance
// HACK: Workaround temporário até a API do COAF ser atualizada
// NOTE: Este algoritmo segue a ISO 31000:2018
```

### 2.6 DRY (Don't Repeat Yourself)

```typescript
// ❌ BAD: Código duplicado
function calculateInherentRisk(probability: number, impact: number): number {
  if (probability < 1 || probability > 5) {
    throw new Error('Probability must be between 1 and 5');
  }
  if (impact < 1 || impact > 5) {
    throw new Error('Impact must be between 1 and 5');
  }
  return probability * impact;
}

function calculateTargetRisk(probability: number, impact: number): number {
  if (probability < 1 || probability > 5) {
    throw new Error('Probability must be between 1 and 5');
  }
  if (impact < 1 || impact > 5) {
    throw new Error('Impact must be between 1 and 5');
  }
  return probability * impact;
}

// ✅ GOOD: Reutilização de código
function validateRiskValue(value: number, name: string): void {
  if (value < 1 || value > 5) {
    throw new Error(`${name} must be between 1 and 5`);
  }
}

function calculateRisk(probability: number, impact: number): number {
  validateRiskValue(probability, 'Probability');
  validateRiskValue(impact, 'Impact');
  return probability * impact;
}

const calculateInherentRisk = calculateRisk;
const calculateTargetRisk = calculateRisk;
```

### 2.7 KISS (Keep It Simple, Stupid)

```typescript
// ❌ BAD: Complexidade desnecessária
function getUserRole(user: User): string {
  return user.roles && user.roles.length > 0
    ? user.roles[0].permissions && user.roles[0].permissions.length > 0
      ? user.roles[0].permissions.includes('admin')
        ? 'admin'
        : user.roles[0].permissions.includes('consultant')
        ? 'consultant'
        : 'client'
      : 'client'
    : 'client';
}

// ✅ GOOD: Código simples e legível
function getUserRole(user: User): string {
  const primaryRole = user.roles?.[0];

  if (!primaryRole?.permissions) {
    return 'client';
  }

  if (primaryRole.permissions.includes('admin')) {
    return 'admin';
  }

  if (primaryRole.permissions.includes('consultant')) {
    return 'consultant';
  }

  return 'client';
}
```

### 2.8 YAGNI (You Aren't Gonna Need It)

```typescript
// ❌ BAD: Funcionalidades especulativas
class User {
  id: string;
  email: string;
  name: string;

  // Funcionalidades que talvez nunca sejam usadas:
  favoriteColor?: string;
  shoeSize?: number;
  middleName?: string;
  preferredLanguage?: string;
  timezone?: string;
  // ...
}

// ✅ GOOD: Apenas o necessário para o MVP
class User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId: string;
  createdAt: Date;
}

// Adicione novos campos apenas quando forem realmente necessários
```

---

## 3. Controle de Versão (Git)

### 3.1 Git Flow Simplificado

```
main (produção)
  ↑
  └─── staging (homologação)
         ↑
         └─── develop (desenvolvimento)
                ↑
                ├─── feature/user-authentication
                ├─── feature/risk-matrix
                ├─── bugfix/login-validation
                └─── hotfix/security-patch
```

### 3.2 Convenção de Commits (Conventional Commits)

```bash
# Formato:
<type>(<scope>): <subject>

<body>

<footer>

# Types:
# - feat: Nova funcionalidade
# - fix: Correção de bug
# - docs: Documentação
# - style: Formatação (não afeta código)
# - refactor: Refatoração
# - perf: Melhoria de performance
# - test: Testes
# - chore: Tarefas de build, configs, etc.
# - ci: CI/CD

# Exemplos:

feat(auth): add JWT authentication

Implement JWT-based authentication with refresh tokens.
- Add login endpoint
- Add token refresh logic
- Add authentication middleware

Closes #123

---

fix(risks): correct residual risk calculation

The control effectiveness was being applied incorrectly.
Changed formula to: inherent * (1 - effectiveness)

Fixes #456

---

perf(dashboard): optimize risk matrix query

Add database index on company_id and risk_level.
Reduce query time from 2s to 200ms.

---

docs(api): update swagger documentation

Add missing endpoints and request examples.

---

test(companies): add unit tests for company service

Coverage increased to 85%.
```

### 3.3 Branch Naming

```bash
# Feature branches
feature/user-authentication
feature/risk-matrix-visualization
feature/document-versioning

# Bugfix branches
bugfix/login-redirect-loop
bugfix/cpf-validation-regex

# Hotfix branches (produção)
hotfix/security-sql-injection
hotfix/memory-leak-fix

# Chore/Refactor
chore/upgrade-dependencies
refactor/risk-calculator-factory
```

### 3.4 .gitignore Essencial

```bash
# .gitignore

# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.*.local
.env.production

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Temporary files
tmp/
temp/
*.tmp

# Uploads (dev)
uploads/
public/uploads/

# Database
*.sqlite
*.db

# Secrets
*.pem
*.key
secrets/
```

### 3.5 Pull Request Template

```markdown
<!-- .github/pull_request_template.md -->

## 📝 Descrição
<!-- Descreva as mudanças realizadas -->

## 🎯 Tipo de Mudança
- [ ] 🐛 Bug fix
- [ ] ✨ Nova feature
- [ ] 🔨 Refatoração
- [ ] 📚 Documentação
- [ ] 🎨 Estilo/UI
- [ ] ⚡ Performance
- [ ] 🧪 Testes

## 🔗 Issue Relacionada
Closes #[número da issue]

## 📋 Checklist
- [ ] Código segue os padrões do projeto
- [ ] Self-review realizado
- [ ] Comentários adicionados onde necessário
- [ ] Documentação atualizada
- [ ] Testes adicionados/atualizados
- [ ] Todos os testes passando
- [ ] Sem warnings do linter
- [ ] Build executado com sucesso

## 🧪 Como Testar
1. Passo 1
2. Passo 2
3. Resultado esperado

## 📸 Screenshots (se aplicável)

## 📌 Observações Adicionais
```

---

## 4. Testes Automatizados

### 4.1 Pirâmide de Testes

```
        /\
       /  \
      / E2E \ ← 10% (End-to-End)
     /──────\
    /   INT  \ ← 20% (Integration)
   /──────────\
  /    UNIT    \ ← 70% (Unit Tests)
 /──────────────\
```

### 4.2 Testes Unitários (Jest)

```typescript
// src/modules/risks/services/risk-calculator.service.spec.ts

describe('RiskCalculatorService', () => {
  let service: RiskCalculatorService;

  beforeEach(() => {
    service = new RiskCalculatorService();
  });

  describe('calculateInherentRisk', () => {
    it('should calculate inherent risk correctly', () => {
      // Arrange
      const probability = 3;
      const impact = 4;

      // Act
      const result = service.calculateInherentRisk(probability, impact);

      // Assert
      expect(result).toBe(12);
    });

    it('should throw error when probability is out of range', () => {
      // Arrange
      const probability = 6;
      const impact = 3;

      // Act & Assert
      expect(() => {
        service.calculateInherentRisk(probability, impact);
      }).toThrow('Probability must be between 1 and 5');
    });

    it('should throw error when impact is out of range', () => {
      // Arrange
      const probability = 3;
      const impact = 0;

      // Act & Assert
      expect(() => {
        service.calculateInherentRisk(probability, impact);
      }).toThrow('Impact must be between 1 and 5');
    });
  });

  describe('calculateResidualRisk', () => {
    it('should apply control effectiveness correctly', () => {
      // Arrange
      const inherentRisk = 20;
      const controlEffectiveness = 0.7; // 70%

      // Act
      const result = service.calculateResidualRisk(inherentRisk, controlEffectiveness);

      // Assert
      expect(result).toBe(6); // 20 * (1 - 0.7) = 6
    });

    it('should return inherent risk when control effectiveness is 0', () => {
      const result = service.calculateResidualRisk(20, 0);
      expect(result).toBe(20);
    });

    it('should return 0 when control effectiveness is 1', () => {
      const result = service.calculateResidualRisk(20, 1);
      expect(result).toBe(0);
    });
  });

  describe('getRiskLevel', () => {
    it.each([
      [1, 'low'],
      [3, 'low'],
      [4, 'low'],
      [5, 'medium'],
      [9, 'medium'],
      [10, 'high'],
      [14, 'high'],
      [15, 'critical'],
      [25, 'critical'],
    ])('should return %s for risk value %d', (riskValue, expectedLevel) => {
      const result = service.getRiskLevel(riskValue);
      expect(result).toBe(expectedLevel);
    });
  });
});
```

### 4.3 Testes de Integração

```typescript
// src/modules/users/users.service.integration.spec.ts

describe('UserService (Integration)', () => {
  let app: INestApplication;
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433, // Test database
          username: 'test',
          password: 'test',
          database: 'easycompliance_test',
          entities: [User, Company],
          synchronize: true,
        }),
        UsersModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    userService = moduleRef.get<UserService>(UserService);
    userRepository = moduleRef.get('UserRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clear database before each test
    await userRepository.clear();
  });

  describe('createUser', () => {
    it('should create user and save to database', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'SecurePass123!',
      };

      // Act
      const user = await userService.createUser(userData);

      // Assert
      expect(user.id).toBeDefined();
      expect(user.email).toBe(userData.email);
      expect(user.name).toBe(userData.name);

      // Verify in database
      const savedUser = await userRepository.findOne({
        where: { email: userData.email },
      });
      expect(savedUser).toBeDefined();
      expect(savedUser.name).toBe(userData.name);
    });

    it('should hash password before saving', async () => {
      const userData = {
        email: 'test2@example.com',
        name: 'Test User 2',
        password: 'PlainPassword123!',
      };

      await userService.createUser(userData);

      const savedUser = await userRepository.findOne({
        where: { email: userData.email },
      });

      expect(savedUser.password).not.toBe(userData.password);
      expect(savedUser.password).toMatch(/^\$2[aby]\$/); // bcrypt hash pattern
    });

    it('should throw error when email already exists', async () => {
      const userData = {
        email: 'duplicate@example.com',
        name: 'User 1',
        password: 'Pass123!',
      };

      await userService.createUser(userData);

      await expect(
        userService.createUser({ ...userData, name: 'User 2' })
      ).rejects.toThrow('Email already exists');
    });
  });
});
```

### 4.4 Testes E2E (End-to-End)

```typescript
// test/auth.e2e-spec.ts

describe('Authentication (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register new user successfully', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          name: 'New User',
          password: 'SecurePass123!',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toBe('newuser@example.com');
          expect(res.body).not.toHaveProperty('password');
        });
    });

    it('should return 400 for invalid email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'invalid-email',
          name: 'User',
          password: 'Pass123!',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('email');
        });
    });

    it('should return 400 for weak password', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'user@example.com',
          name: 'User',
          password: '123', // Too weak
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('password');
        });
    });
  });

  describe('/auth/login (POST)', () => {
    beforeAll(async () => {
      // Create test user
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'logintest@example.com',
          name: 'Login Test',
          password: 'TestPass123!',
        });
    });

    it('should login successfully and return JWT token', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'TestPass123!',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('accessToken');
          expect(res.body).toHaveProperty('refreshToken');
          expect(res.body.accessToken).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
        });
    });

    it('should return 401 for invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'WrongPassword123!',
        })
        .expect(401);
    });
  });

  describe('Protected Routes', () => {
    let accessToken: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'logintest@example.com',
          password: 'TestPass123!',
        });

      accessToken = response.body.accessToken;
    });

    it('should access protected route with valid token', () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.email).toBe('logintest@example.com');
        });
    });

    it('should return 401 without token', () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .expect(401);
    });

    it('should return 401 with invalid token', () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
});
```

### 4.5 Cobertura de Testes

```json
// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

---

## 5. CI/CD Pipeline

### 5.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci-cd.yml

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop, staging]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20.x'

jobs:
  # ============================================
  # JOB 1: Linting e Formatação
  # ============================================
  lint:
    name: Lint & Format Check
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check code formatting
        run: npm run format:check

      - name: TypeScript type check
        run: npm run type-check

  # ============================================
  # JOB 2: Testes Unitários e de Integração
  # ============================================
  test:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: easycompliance_test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:7-alpine
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:cov
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/easycompliance_test
          REDIS_URL: redis://localhost:6379

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests

  # ============================================
  # JOB 3: Testes E2E
  # ============================================
  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: easycompliance_test
        ports:
          - 5432:5432

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run E2E tests
        run: npm run test:e2e
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/easycompliance_test

  # ============================================
  # JOB 4: Security Scan
  # ============================================
  security:
    name: Security Scan
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Run npm audit
        run: npm audit --audit-level=high

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  # ============================================
  # JOB 5: Build
  # ============================================
  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, test]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build backend
        run: npm run build:backend

      - name: Build frontend
        run: npm run build:frontend
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: |
            dist/
            .next/

  # ============================================
  # JOB 6: Deploy to Staging
  # ============================================
  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build, security]
    if: github.ref == 'refs/heads/staging'
    environment:
      name: staging
      url: https://staging.easycompliance.app

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build

      - name: Deploy to Staging
        run: |
          # Deploy commands here (AWS, Vercel, etc.)
          echo "Deploying to staging..."

      - name: Run smoke tests
        run: npm run test:smoke -- --url=https://staging.easycompliance.app

  # ============================================
  # JOB 7: Deploy to Production
  # ============================================
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build, security]
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://app.easycompliance.app

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build

      - name: Deploy to Production
        run: |
          # Production deployment
          echo "Deploying to production..."

      - name: Create release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: v${{ github.run_number }}
          release_name: Release v${{ github.run_number }}
          draft: false
          prerelease: false

      - name: Notify team
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 6. Segurança

### 6.1 Autenticação e Autorização

```typescript
// JWT Strategy
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<UserPayload> {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
      companyId: payload.companyId,
    };
  }
}

// RBAC Guard
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.some((role) => user.role === role);
  }
}

// Usage
@Controller('companies')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CompaniesController {
  @Get()
  @Roles(UserRole.ADMIN, UserRole.CONSULTANT)
  findAll() {
    // Only admin and consultant can access
  }

  @Post()
  @Roles(UserRole.ADMIN)
  create() {
    // Only admin can create
  }
}
```

### 6.2 Proteção contra Ataques Comuns

```typescript
// main.ts - Security Middleware
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Helmet - Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
  }));

  // CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Rate Limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
    })
  );

  // Request size limit
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    })
  );

  await app.listen(3000);
}
```

### 6.3 Validação de Entrada

```typescript
// DTOs with validation
import { IsEmail, IsString, MinLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  name: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    { message: 'Password must contain uppercase, lowercase, number and special character' }
  )
  password: string;

  @ApiProperty({ example: '12345678900', required: false })
  @IsOptional()
  @Matches(/^\d{11}$/, { message: 'CPF must contain 11 digits' })
  cpf?: string;
}

// SQL Injection Prevention (using TypeORM)
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  // ✅ GOOD: Parameterized query
  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email }, // TypeORM handles sanitization
    });
  }

  // ❌ BAD: Never do this!
  async findByEmailUnsafe(email: string): Promise<User | null> {
    return this.repository.query(
      `SELECT * FROM users WHERE email = '${email}'` // SQL Injection vulnerability!
    );
  }
}
```

### 6.4 Criptografia e Hashing

```typescript
// Password hashing
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 12;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

// Data encryption for sensitive fields
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor(configService: ConfigService) {
    this.key = Buffer.from(configService.get('ENCRYPTION_KEY'), 'hex');
  }

  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }

  decrypt(encryptedData: string): string {
    const [ivHex, authTagHex, encrypted] = encryptedData.split(':');

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
```

### 6.5 Secrets Management

```bash
# .env.example (template - não inclui valores reais)
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/easycompliance
DATABASE_SSL=false

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRATION=1h
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRATION=7d

# AWS
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=easycompliance-documents

# Redis
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Encryption
ENCRYPTION_KEY=your-32-byte-hex-key

# External APIs
CLICKSIGN_API_KEY=your-clicksign-key
OPENAI_API_KEY=your-openai-key
```

```typescript
// Config validation
import { IsString, IsNumber, IsUrl, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

class EnvironmentVariables {
  @IsString()
  NODE_ENV: string;

  @IsNumber()
  PORT: number;

  @IsUrl({ require_tld: false })
  DATABASE_URL: string;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  AWS_ACCESS_KEY_ID: string;

  @IsString()
  AWS_SECRET_ACCESS_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(`Config validation error: ${errors.toString()}`);
  }

  return validatedConfig;
}
```

---

## 7. Performance e Otimização

### 7.1 Database Optimization

```typescript
// Indexes
@Entity('risks')
@Index(['companyId', 'status'])
@Index(['category', 'level'])
export class Risk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  companyId: string;

  @Column()
  status: RiskStatus;

  @Column()
  category: RiskCategory;

  @Column()
  level: RiskLevel;
}

// Query optimization
@Injectable()
export class RiskService {
  // ❌ BAD: N+1 Query Problem
  async getRisksWithControlsBad(companyId: string): Promise<Risk[]> {
    const risks = await this.riskRepository.find({ where: { companyId } });

    for (const risk of risks) {
      risk.controls = await this.controlRepository.find({ where: { riskId: risk.id } });
    }

    return risks;
  }

  // ✅ GOOD: Eager loading with relations
  async getRisksWithControlsGood(companyId: string): Promise<Risk[]> {
    return this.riskRepository.find({
      where: { companyId },
      relations: ['controls', 'owner'],
      select: {
        id: true,
        name: true,
        level: true,
        controls: {
          id: true,
          name: true,
          effectiveness: true,
        },
      },
    });
  }

  // ✅ BEST: Query builder for complex queries
  async getRisksWithControlsBest(companyId: string): Promise<Risk[]> {
    return this.riskRepository
      .createQueryBuilder('risk')
      .leftJoinAndSelect('risk.controls', 'control')
      .leftJoinAndSelect('risk.owner', 'owner')
      .where('risk.companyId = :companyId', { companyId })
      .andWhere('risk.status = :status', { status: 'active' })
      .orderBy('risk.level', 'DESC')
      .take(100)
      .getMany();
  }
}
```

### 7.2 Caching Strategy

```typescript
// Redis caching
@Injectable()
export class CacheService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis
  ) {}

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}

// Cache decorator
export function Cacheable(ttl: number = 3600) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const cacheService = this.cacheService as CacheService;
      const cacheKey = `${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`;

      const cached = await cacheService.get(cacheKey);
      if (cached) {
        return cached;
      }

      const result = await originalMethod.apply(this, args);
      await cacheService.set(cacheKey, result, ttl);
      return result;
    };

    return descriptor;
  };
}

// Usage
@Injectable()
export class CompanyService {
  constructor(private cacheService: CacheService) {}

  @Cacheable(1800) // Cache for 30 minutes
  async getCompanyById(id: string): Promise<Company> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async updateCompany(id: string, data: UpdateCompanyDTO): Promise<Company> {
    const company = await this.companyRepository.update(id, data);

    // Invalidate cache
    await this.cacheService.del(`CompanyService:getCompanyById:["${id}"]`);

    return company;
  }
}
```

### 7.3 Frontend Performance

```typescript
// Code splitting and lazy loading
// app/layout.tsx
import dynamic from 'next/dynamic';

const DynamicAnalytics = dynamic(() => import('@/components/Analytics'), {
  loading: () => <AnalyticsSkeleton />,
  ssr: false,
});

// Memoization
import { memo, useMemo, useCallback } from 'react';

const RiskCard = memo(({ risk }: { risk: Risk }) => {
  // Component only re-renders if risk changes
  return <div>{risk.name}</div>;
});

function RiskMatrix({ risks }: { risks: Risk[] }) {
  // Expensive calculation cached
  const risksByLevel = useMemo(() => {
    return risks.reduce((acc, risk) => {
      acc[risk.level] = (acc[risk.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [risks]);

  // Function reference cached
  const handleRiskClick = useCallback((riskId: string) => {
    console.log('Risk clicked:', riskId);
  }, []);

  return <div>{/* ... */}</div>;
}

// Image optimization
import Image from 'next/image';

function CompanyLogo({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="Company logo"
      width={200}
      height={100}
      placeholder="blur"
      blurDataURL="data:image/..." // Low quality placeholder
      loading="lazy"
    />
  );
}

// Virtual scrolling for large lists
import { FixedSizeList } from 'react-window';

function LargeRiskList({ risks }: { risks: Risk[] }) {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <RiskCard risk={risks[index]} />
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={risks.length}
      itemSize={100}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

## 8. Documentação

### 8.1 README.md Template

```markdown
# EasyCompliance MVP

Sistema de gestão de compliance multi-tenant.

## Requisitos

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Docker (opcional)

## Instalação

\`\`\`bash
# Clone o repositório
git clone https://github.com/yourusername/easycompliance.git
cd easycompliance

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Execute as migrações
npm run migration:run

# Inicie o servidor de desenvolvimento
npm run dev
\`\`\`

## Estrutura do Projeto

\`\`\`
easycompliance/
├── src/
│   ├── modules/      # Módulos da aplicação
│   ├── common/       # Código compartilhado
│   └── config/       # Configurações
├── test/             # Testes E2E
├── docs/             # Documentação adicional
└── prisma/           # Schemas e migrações
\`\`\`

## Scripts Disponíveis

- \`npm run dev\` - Inicia servidor de desenvolvimento
- \`npm run build\` - Build de produção
- \`npm run start\` - Inicia servidor de produção
- \`npm run test\` - Executa testes
- \`npm run test:cov\` - Testes com cobertura
- \`npm run lint\` - Executa linter
- \`npm run format\` - Formata código

## Licença

MIT
```

### 8.2 API Documentation (Swagger)

```typescript
// main.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('EasyCompliance API')
  .setDescription('API para gestão de compliance')
  .setVersion('1.0')
  .addBearerAuth()
  .addTag('auth', 'Autenticação e autorização')
  .addTag('companies', 'Gestão de empresas')
  .addTag('risks', 'Gestão de riscos')
  .addTag('documents', 'Gestão de documentos')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);

// Controller documentation
@ApiTags('risks')
@Controller('risks')
export class RisksController {
  @Get()
  @ApiOperation({ summary: 'Lista todos os riscos da empresa' })
  @ApiResponse({
    status: 200,
    description: 'Lista de riscos retornada com sucesso',
    type: [RiskDTO],
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async findAll(@CurrentUser() user: UserPayload): Promise<Risk[]> {
    return this.risksService.findAll(user.companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo risco' })
  @ApiBody({ type: CreateRiskDTO })
  @ApiResponse({
    status: 201,
    description: 'Risco criado com sucesso',
    type: RiskDTO,
  })
  async create(@Body() dto: CreateRiskDTO): Promise<Risk> {
    return this.risksService.create(dto);
  }
}
```

### 8.3 JSDoc Comments

```typescript
/**
 * Serviço responsável pelo cálculo de riscos conforme metodologia ISO 31000:2018
 *
 * @class RiskCalculatorService
 * @version 1.0.0
 * @since MVP Phase 1
 */
@Injectable()
export class RiskCalculatorService {
  /**
   * Calcula o risco inerente baseado em probabilidade e impacto
   *
   * @param {number} probability - Probabilidade de ocorrência (1-5)
   * @param {number} impact - Impacto em caso de ocorrência (1-5)
   * @returns {number} Valor do risco inerente (1-25)
   * @throws {Error} Se probabilidade ou impacto estiverem fora do intervalo válido
   *
   * @example
   * const risk = calculator.calculateInherentRisk(4, 5);
   * // Returns: 20
   */
  calculateInherentRisk(probability: number, impact: number): number {
    this.validateValue(probability, 'Probability');
    this.validateValue(impact, 'Impact');

    return probability * impact;
  }
}
```

---

## 9. Code Review

### 9.1 Checklist de Code Review

```markdown
## Code Review Checklist

### Funcionalidade
- [ ] O código faz o que se propõe a fazer?
- [ ] Os casos extremos (edge cases) foram tratados?
- [ ] A lógica de negócio está correta?

### Qualidade de Código
- [ ] O código segue os padrões do projeto (ESLint, Prettier)?
- [ ] Nomenclatura é clara e descritiva?
- [ ] Funções têm responsabilidade única?
- [ ] Código está DRY (sem duplicação)?
- [ ] Complexidade ciclomática aceitável (<10)?

### Testes
- [ ] Testes unitários adicionados/atualizados?
- [ ] Cobertura de testes adequada (>80%)?
- [ ] Testes E2E para fluxos críticos?
- [ ] Todos os testes passando?

### Segurança
- [ ] Inputs são validados?
- [ ] Queries SQL parametrizadas?
- [ ] Secrets não commitados?
- [ ] Autenticação/Autorização correta?
- [ ] Dados sensíveis criptografados?

### Performance
- [ ] Queries otimizadas (sem N+1)?
- [ ] Cache implementado onde faz sentido?
- [ ] Recursos liberados adequadamente?
- [ ] Sem memory leaks?

### Documentação
- [ ] Código autodocumentado?
- [ ] Comentários onde necessário?
- [ ] README atualizado?
- [ ] Swagger atualizado?

### UX/UI (Frontend)
- [ ] Interface responsiva?
- [ ] Acessibilidade (a11y)?
- [ ] Loading states?
- [ ] Error handling apropriado?

### Deploy
- [ ] Migrations criadas?
- [ ] Variáveis de ambiente documentadas?
- [ ] Breaking changes comunicados?
```

---

## 10. Monitoramento e Logs

### 10.1 Logging Structure

```typescript
// logger.service.ts
import { Injectable, Logger } from '@nestjs/common';

export interface LogContext {
  userId?: string;
  companyId?: string;
  requestId?: string;
  [key: string]: any;
}

@Injectable()
export class LoggerService extends Logger {
  log(message: string, context?: LogContext) {
    super.log(JSON.stringify({ message, ...context, timestamp: new Date().toISOString() }));
  }

  error(message: string, trace: string, context?: LogContext) {
    super.error(
      JSON.stringify({
        message,
        trace,
        ...context,
        timestamp: new Date().toISOString(),
      })
    );
  }

  warn(message: string, context?: LogContext) {
    super.warn(JSON.stringify({ message, ...context, timestamp: new Date().toISOString() }));
  }

  debug(message: string, context?: LogContext) {
    super.debug(JSON.stringify({ message, ...context, timestamp: new Date().toISOString() }));
  }
}

// Usage
@Injectable()
export class UserService {
  constructor(private logger: LoggerService) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    this.logger.log('Creating new user', {
      email: data.email,
      action: 'user.create',
    });

    try {
      const user = await this.userRepository.create(data);

      this.logger.log('User created successfully', {
        userId: user.id,
        email: user.email,
        action: 'user.created',
      });

      return user;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack, {
        email: data.email,
        error: error.message,
        action: 'user.create.failed',
      });
      throw error;
    }
  }
}
```

### 10.2 Health Checks

```typescript
// health.controller.ts
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  DiskHealthIndicator,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private disk: DiskHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () => this.disk.checkStorage('disk', { path: '/', thresholdPercent: 0.9 }),
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
    ]);
  }
}
```

---

## 11. DevOps e Infraestrutura

### 11.1 Docker Setup

```dockerfile
# Dockerfile (Backend)
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: easycompliance
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: easycompliance_dev
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - '3001:3000'
    environment:
      DATABASE_URL: postgresql://easycompliance:secure_password@postgres:5432/easycompliance_dev
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
```

---

## 12. Qualidade de Código

### 12.1 SonarQube Configuration

```properties
# sonar-project.properties
sonar.projectKey=easycompliance-mvp
sonar.projectName=EasyCompliance MVP
sonar.projectVersion=1.0

sonar.sources=src
sonar.tests=test,src/**/*.spec.ts
sonar.test.inclusions=**/*.spec.ts,**/*.test.ts

sonar.typescript.lcov.reportPaths=coverage/lcov.info

sonar.coverage.exclusions=**/*.spec.ts,**/*.test.ts,**/test/**,**/*.config.ts

sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

---

## Conclusão

Este documento representa as **boas práticas essenciais** para o desenvolvimento do MVP do EasyCompliance.

### Prioridades para o MVP:

1. ✅ **Segurança** - Não negociável
2. ✅ **Testes** - Cobertura >80%
3. ✅ **Code Quality** - ESLint + Prettier
4. ✅ **CI/CD** - Automação total
5. ✅ **Documentação** - Código autodocumentado

### Próximos Passos:

1. Setup inicial do repositório seguindo estrutura definida
2. Configuração de ferramentas (ESLint, Prettier, Husky)
3. Setup do CI/CD pipeline
4. Implementação dos módulos seguindo os padrões
5. Code reviews rigorosos em cada PR

---

**Última atualização:** 2025-10-21
**Versão:** 1.0
**Mantenedor:** Tech Lead
