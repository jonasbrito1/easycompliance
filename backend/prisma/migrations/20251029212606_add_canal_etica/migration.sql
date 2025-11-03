-- CreateEnum
CREATE TYPE "EthicsReportType" AS ENUM ('ASSEDIO_MORAL', 'ASSEDIO_SEXUAL', 'DISCRIMINACAO', 'FRAUDE', 'CORRUPCAO', 'CONFLITO_INTERESSES', 'VIOLACAO_CODIGO_ETICA', 'VIOLACAO_POLITICAS', 'ROUBO_FURTO', 'USO_INDEVIDO_RECURSOS', 'VAZAMENTO_INFORMACOES', 'MEIO_AMBIENTE', 'SEGURANCA_TRABALHO', 'OUTROS');

-- CreateEnum
CREATE TYPE "EthicsReportStatus" AS ENUM ('NOVO', 'EM_ANALISE', 'EM_INVESTIGACAO', 'AGUARDANDO_INFORMACOES', 'AGUARDANDO_DECISAO', 'EM_ACAO', 'CONCLUIDO', 'ARQUIVADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "EthicsReportOrigin" AS ENUM ('WEB_ANONIMO', 'WEB_IDENTIFICADO', 'TELEFONE', 'EMAIL', 'PRESENCIAL', 'CARTA', 'TERCEIROS');

-- CreateEnum
CREATE TYPE "EthicsReportPriority" AS ENUM ('BAIXA', 'MEDIA', 'ALTA', 'URGENTE');

-- CreateEnum
CREATE TYPE "EthicsReportConfidentiality" AS ENUM ('PUBLICA', 'INTERNA', 'CONFIDENCIAL', 'RESTRITA');

-- CreateTable
CREATE TABLE "ethics_reports" (
    "id" TEXT NOT NULL,
    "protocol" TEXT NOT NULL,
    "type" "EthicsReportType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "EthicsReportStatus" NOT NULL DEFAULT 'NOVO',
    "substatus" TEXT,
    "priority" "EthicsReportPriority" NOT NULL DEFAULT 'MEDIA',
    "confidentiality" "EthicsReportConfidentiality" NOT NULL DEFAULT 'CONFIDENCIAL',
    "origin" "EthicsReportOrigin" NOT NULL,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT true,
    "reporterName" TEXT,
    "reporterEmail" TEXT,
    "reporterPhone" TEXT,
    "reporterDocument" TEXT,
    "unit" TEXT,
    "department" TEXT,
    "location" TEXT,
    "involvedParties" TEXT,
    "witnesses" TEXT,
    "incidentDate" TIMESTAMP(3),
    "reportedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "lastInteractionAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closedAt" TIMESTAMP(3),
    "assignedTo" TEXT,
    "investigationTeam" TEXT,
    "estimatedDays" INTEGER,
    "conclusion" TEXT,
    "actionsTaken" TEXT,
    "isFounded" BOOLEAN,
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "requiresAction" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ethics_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ethics_report_interactions" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isInternal" BOOLEAN NOT NULL DEFAULT false,
    "isFromReporter" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "readAt" TIMESTAMP(3),
    "reportId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ethics_report_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ethics_report_attachments" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "description" TEXT,
    "uploadedBy" TEXT,
    "isEvidence" BOOLEAN NOT NULL DEFAULT true,
    "isConfidential" BOOLEAN NOT NULL DEFAULT true,
    "reportId" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ethics_report_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ethics_report_timeline" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "oldValue" TEXT,
    "newValue" TEXT,
    "userId" TEXT,
    "userName" TEXT NOT NULL,
    "userRole" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "reportId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ethics_report_timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ethics_channel_configs" (
    "id" TEXT NOT NULL,
    "slaResponseDays" INTEGER NOT NULL DEFAULT 15,
    "slaInvestigationDays" INTEGER NOT NULL DEFAULT 30,
    "slaClosingDays" INTEGER NOT NULL DEFAULT 45,
    "enableEmailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "enableSmsNotifications" BOOLEAN NOT NULL DEFAULT false,
    "notificationEmails" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "allowAnonymous" BOOLEAN NOT NULL DEFAULT true,
    "allowIdentified" BOOLEAN NOT NULL DEFAULT true,
    "requiresEvidence" BOOLEAN NOT NULL DEFAULT false,
    "customFields" JSONB,
    "termsOfUse" TEXT,
    "welcomeMessage" TEXT,
    "retentionDays" INTEGER NOT NULL DEFAULT 1825,
    "primaryColor" TEXT NOT NULL DEFAULT '#0066CC',
    "logo" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ethics_channel_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ethics_reports_protocol_key" ON "ethics_reports"("protocol");

-- CreateIndex
CREATE INDEX "ethics_reports_companyId_idx" ON "ethics_reports"("companyId");

-- CreateIndex
CREATE INDEX "ethics_reports_protocol_idx" ON "ethics_reports"("protocol");

-- CreateIndex
CREATE INDEX "ethics_reports_status_idx" ON "ethics_reports"("status");

-- CreateIndex
CREATE INDEX "ethics_reports_priority_idx" ON "ethics_reports"("priority");

-- CreateIndex
CREATE INDEX "ethics_reports_type_idx" ON "ethics_reports"("type");

-- CreateIndex
CREATE INDEX "ethics_reports_origin_idx" ON "ethics_reports"("origin");

-- CreateIndex
CREATE INDEX "ethics_reports_reportedAt_idx" ON "ethics_reports"("reportedAt");

-- CreateIndex
CREATE INDEX "ethics_reports_dueDate_idx" ON "ethics_reports"("dueDate");

-- CreateIndex
CREATE INDEX "ethics_report_interactions_reportId_idx" ON "ethics_report_interactions"("reportId");

-- CreateIndex
CREATE INDEX "ethics_report_interactions_createdAt_idx" ON "ethics_report_interactions"("createdAt");

-- CreateIndex
CREATE INDEX "ethics_report_attachments_reportId_idx" ON "ethics_report_attachments"("reportId");

-- CreateIndex
CREATE INDEX "ethics_report_timeline_reportId_idx" ON "ethics_report_timeline"("reportId");

-- CreateIndex
CREATE INDEX "ethics_report_timeline_createdAt_idx" ON "ethics_report_timeline"("createdAt");

-- CreateIndex
CREATE INDEX "ethics_report_timeline_action_idx" ON "ethics_report_timeline"("action");

-- CreateIndex
CREATE UNIQUE INDEX "ethics_channel_configs_companyId_key" ON "ethics_channel_configs"("companyId");

-- AddForeignKey
ALTER TABLE "ethics_reports" ADD CONSTRAINT "ethics_reports_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ethics_report_interactions" ADD CONSTRAINT "ethics_report_interactions_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ethics_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ethics_report_attachments" ADD CONSTRAINT "ethics_report_attachments_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ethics_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ethics_report_timeline" ADD CONSTRAINT "ethics_report_timeline_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "ethics_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ethics_channel_configs" ADD CONSTRAINT "ethics_channel_configs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
