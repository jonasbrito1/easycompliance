import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RisksService } from './risks.service';
import { CreateRiskDto } from './dto/create-risk.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';
import { RiskLevel } from '@prisma/client';

@Controller('risks')
export class RisksController {
  constructor(private readonly risksService: RisksService) {}

  @Post()
  create(@Body() createRiskDto: CreateRiskDto) {
    return this.risksService.create(createRiskDto);
  }

  @Get()
  findAll(
    @Query('companyId') companyId: string,
    @Query('category') category?: string,
    @Query('level') level?: RiskLevel,
    @Query('isActive') isActive?: string,
    @Query('search') search?: string,
  ) {
    return this.risksService.findAll(companyId, {
      category,
      level,
      isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
      search,
    });
  }

  @Get('statistics/:companyId')
  getStatistics(@Param('companyId') companyId: string) {
    return this.risksService.getStatistics(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.risksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiskDto: UpdateRiskDto) {
    return this.risksService.update(id, updateRiskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.risksService.remove(id);
  }

  @Post(':id/controls/:controlId')
  addControl(
    @Param('id') id: string,
    @Param('controlId') controlId: string,
  ) {
    return this.risksService.addControl(id, controlId);
  }

  @Delete(':id/controls/:controlId')
  removeControl(
    @Param('id') id: string,
    @Param('controlId') controlId: string,
  ) {
    return this.risksService.removeControl(id, controlId);
  }
}
