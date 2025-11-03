import { Module } from '@nestjs/common';
import { EthicsChannelController } from './ethics-channel.controller';
import { EthicsChannelService } from './ethics-channel.service';

@Module({
  controllers: [EthicsChannelController],
  providers: [EthicsChannelService],
  exports: [EthicsChannelService],
})
export class EthicsChannelModule {}
