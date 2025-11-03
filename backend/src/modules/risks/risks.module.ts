import { Module } from '@nestjs/common';
import { RisksService } from './risks.service';
import { RisksController } from './risks.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RisksController],
  providers: [RisksService],
  exports: [RisksService],
})
export class RisksModule {}
