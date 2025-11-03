import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar tenant padrão
  const tenant = await prisma.tenant.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      name: 'EasyCompliance',
      slug: 'easycompliance',
      isActive: true,
    },
  });

  console.log('✅ Tenant criado:', tenant.name);

  // Criar usuário super admin
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@easycompliance.com' },
    update: {},
    create: {
      email: 'admin@easycompliance.com',
      name: 'Administrador',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      tenantId: tenant.id,
      isActive: true,
    },
  });

  console.log('✅ Usuário admin criado:', adminUser.email);

  // Criar empresa de exemplo
  const company = await prisma.company.upsert({
    where: {
      tenantId_cnpj: {
        cnpj: '00000000000191',
        tenantId: tenant.id,
      }
    },
    update: {},
    create: {
      name: 'Empresa Demo',
      cnpj: '00000000000191',
      tenantId: tenant.id,
      isActive: true,
    },
  });

  console.log('✅ Empresa criada:', company.name);

  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('\n📝 Credenciais de acesso:');
  console.log('   Email: admin@easycompliance.com');
  console.log('   Senha: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
