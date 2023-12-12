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
import { Category } from './interface/category.interface';
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.getCategoryById(id);
  }

  @Post()
  async createCategory(@Body() category: Category): Promise<Category> {
    return await this.categoriesService.createCategory(category);
  }
  @Patch(':id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: Category,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(id, category);
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id') id: string): Promise<string> {
    return await this.categoriesService.deleteCategoryById(id);
  }
}
