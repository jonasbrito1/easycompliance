import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { EthicsChannelModule } from './modules/ethics-channel/ethics-channel.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { RisksModule } from './modules/risks/risks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    RisksModule,
    EthicsChannelModule,
    DocumentsModule,
  ],
})
export class AppModule {}
