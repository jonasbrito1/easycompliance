import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RisksService } from './risks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('risks')
@Controller('risks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RisksController {
  constructor(private readonly risksService: RisksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all risks from company' })
  findAll(@Request() req: any) {
    return this.risksService.findAll(req.user.companyId);
  }

  @Get('matrix')
  @ApiOperation({ summary: 'Get risk matrix' })
  getRiskMatrix(@Request() req: any) {
    return this.risksService.getRiskMatrix(req.user.companyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get risk by ID' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.risksService.findById(id, req.user.companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new risk' })
  create(@Body() createRiskDto: any, @Request() req: any) {
    return this.risksService.create(
      { ...createRiskDto, companyId: req.user.companyId },
      req.user.userId,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update risk' })
  update(@Param('id') id: string, @Body() updateRiskDto: any, @Request() req: any) {
    return this.risksService.update(id, req.user.companyId, updateRiskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete risk' })
  remove(@Param('id') id: string, @Request() req: any) {
    return this.risksService.remove(id, req.user.companyId);
  }
}
