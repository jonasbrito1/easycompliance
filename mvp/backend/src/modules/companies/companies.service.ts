import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: any): Promise<Company> {
    const company = this.companiesRepository.create(createCompanyDto);
    return await this.companiesRepository.save(company) as unknown as Company;
  }

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find({ where: { isActive: true } });
  }

  async findById(id: string): Promise<Company> {
    const company = await this.companiesRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(id: string, updateData: Partial<Company>): Promise<Company> {
    await this.companiesRepository.update(id, updateData);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.companiesRepository.update(id, { isActive: false });
  }
}
