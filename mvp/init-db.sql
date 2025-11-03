-- EasyCompliance Initial Database Schema
-- MVP Version 1.0

-- Set charset
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS easycompliance
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE easycompliance;

-- Companies Table (Multi-tenant)
CREATE TABLE IF NOT EXISTS companies (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  cnpj VARCHAR(14) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  trading_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  address_street VARCHAR(255),
  address_number VARCHAR(20),
  address_complement VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(2),
  address_zip_code VARCHAR(8),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cnpj (cnpj),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  company_id VARCHAR(36) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  cpf VARCHAR(11),
  phone VARCHAR(20),
  role ENUM('admin', 'consultant', 'client', 'viewer') NOT NULL DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  INDEX idx_email (email),
  INDEX idx_company (company_id),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Risks Table
CREATE TABLE IF NOT EXISTS risks (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  company_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category ENUM('operational', 'financial', 'strategic', 'compliance', 'reputational') NOT NULL,
  probability INT NOT NULL CHECK (probability BETWEEN 1 AND 5),
  impact INT NOT NULL CHECK (impact BETWEEN 1 AND 5),
  score INT GENERATED ALWAYS AS (probability * impact) STORED,
  level ENUM('low', 'medium', 'high', 'critical') AS (
    CASE
      WHEN (probability * impact) <= 4 THEN 'low'
      WHEN (probability * impact) <= 9 THEN 'medium'
      WHEN (probability * impact) <= 14 THEN 'high'
      ELSE 'critical'
    END
  ) STORED,
  control_effectiveness DECIMAL(3,2) DEFAULT 0.00 CHECK (control_effectiveness BETWEEN 0 AND 1),
  residual_score INT AS (ROUND((probability * impact) * (1 - control_effectiveness))) STORED,
  owner_id VARCHAR(36),
  status ENUM('active', 'mitigated', 'accepted', 'transferred', 'archived') DEFAULT 'active',
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_company (company_id),
  INDEX idx_category (category),
  INDEX idx_level (level),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Controls Table
CREATE TABLE IF NOT EXISTS controls (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  company_id VARCHAR(36) NOT NULL,
  risk_id VARCHAR(36),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type ENUM('preventive', 'detective', 'corrective') NOT NULL,
  effectiveness DECIMAL(3,2) DEFAULT 0.00 CHECK (effectiveness BETWEEN 0 AND 1),
  frequency ENUM('continuous', 'daily', 'weekly', 'monthly', 'quarterly', 'annual') NOT NULL,
  responsible_id VARCHAR(36),
  status ENUM('active', 'inactive', 'under_review') DEFAULT 'active',
  last_test_date DATE,
  next_test_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE SET NULL,
  FOREIGN KEY (responsible_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_company (company_id),
  INDEX idx_risk (risk_id),
  INDEX idx_type (type),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Documents Table
CREATE TABLE IF NOT EXISTS documents (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  company_id VARCHAR(36) NOT NULL,
  risk_id VARCHAR(36),
  control_id VARCHAR(36),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INT,
  mime_type VARCHAR(100),
  category ENUM('policy', 'procedure', 'evidence', 'report', 'other') NOT NULL,
  version VARCHAR(20) DEFAULT '1.0',
  expiry_date DATE,
  uploaded_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE SET NULL,
  FOREIGN KEY (control_id) REFERENCES controls(id) ON DELETE SET NULL,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_company (company_id),
  INDEX idx_category (category),
  INDEX idx_expiry (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Action Plans Table
CREATE TABLE IF NOT EXISTS action_plans (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  company_id VARCHAR(36) NOT NULL,
  risk_id VARCHAR(36),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('low', 'medium', 'high', 'critical') NOT NULL,
  status ENUM('pending', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
  responsible_id VARCHAR(36),
  start_date DATE,
  due_date DATE,
  completion_date DATE,
  progress INT DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  created_by VARCHAR(36),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (risk_id) REFERENCES risks(id) ON DELETE SET NULL,
  FOREIGN KEY (responsible_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_company (company_id),
  INDEX idx_status (status),
  INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  company_id VARCHAR(36),
  user_id VARCHAR(36),
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(36),
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_company (company_id),
  INDEX idx_user (user_id),
  INDEX idx_action (action),
  INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Demo Company
INSERT INTO companies (id, cnpj, name, trading_name, email, phone, is_active)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  '12345678000190',
  'EasyCompliance Consultoria LTDA',
  'EasyCompliance',
  'contato@easycompliance.com',
  '11999999999',
  TRUE
);

-- Insert Demo Admin User (password: Admin@2024)
-- Hash bcrypt para 'Admin@2024': $2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyIwGJ6V5Wii
INSERT INTO users (id, company_id, email, password, name, cpf, role, is_active)
VALUES (
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440000',
  'admin@easycompliance.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyIwGJ6V5Wii',
  'Administrador do Sistema',
  '12345678900',
  'admin',
  TRUE
);

-- Insert Demo Consultant (password: Consultor@2024)
INSERT INTO users (id, company_id, email, password, name, role, is_active)
VALUES (
  '660e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440000',
  'consultor@easycompliance.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyIwGJ6V5Wii',
  'Consultor de Compliance',
  'consultant',
  TRUE
);

-- Insert Demo Risks
INSERT INTO risks (company_id, name, description, category, probability, impact, owner_id, created_by)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Risco de Conformidade Regulatória', 'Não conformidade com regulamentações do setor financeiro', 'compliance', 4, 5, '660e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Risco Operacional - Falha de Sistema', 'Indisponibilidade do sistema principal', 'operational', 3, 4, '660e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Risco Financeiro - Inadimplência', 'Alto índice de inadimplência de clientes', 'financial', 2, 4, '660e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Risco Estratégico - Perda de Mercado', 'Entrada de novos concorrentes', 'strategic', 3, 3, '660e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Risco Reputacional - Vazamento de Dados', 'Exposição de dados sensíveis de clientes', 'reputational', 2, 5, '660e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001');

-- Create Views for Analytics
CREATE OR REPLACE VIEW v_risk_summary AS
SELECT
  c.id as company_id,
  c.name as company_name,
  COUNT(r.id) as total_risks,
  SUM(CASE WHEN r.level = 'critical' THEN 1 ELSE 0 END) as critical_risks,
  SUM(CASE WHEN r.level = 'high' THEN 1 ELSE 0 END) as high_risks,
  SUM(CASE WHEN r.level = 'medium' THEN 1 ELSE 0 END) as medium_risks,
  SUM(CASE WHEN r.level = 'low' THEN 1 ELSE 0 END) as low_risks,
  AVG(r.score) as avg_risk_score,
  AVG(r.residual_score) as avg_residual_score
FROM companies c
LEFT JOIN risks r ON c.id = r.company_id AND r.status = 'active'
GROUP BY c.id, c.name;

COMMIT;
