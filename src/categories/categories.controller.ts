import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { categoriesDto } from './dto/category.dto';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  async findAll(): Promise<categoriesDto[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<categoriesDto> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  async createCategory(
    @Body() categoriesDto: categoriesDto,
  ): Promise<categoriesDto> {
    return await this.categoriesService.createCategory(categoriesDto);
  }
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() categoriesDto: categoriesDto,
  ): Promise<categoriesDto> {
    return await this.categoriesService.updateCategory(id, categoriesDto);
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id') id: string): Promise<string> {
    return await this.categoriesService.deleteCategoryById(id);
  }
}
