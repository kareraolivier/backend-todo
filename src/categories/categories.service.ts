import { Injectable, NotFoundException } from '@nestjs/common';
import { categoriesDto, createCategoriesDto } from './dto/category.dto';
import { JsonDB, Config } from 'node-json-db';

import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CategoriesService {
  private db = new JsonDB(new Config('Categories', true, false, '/'));
  async findAll(): Promise<categoriesDto[]> {
    try {
      const allcategory = await this.db.getData('/categories');
      console.log(allcategory);
      return allcategory;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getCategoryById(id: string): Promise<categoriesDto | null> {
    try {
      const category = (await this.db.getData(`/categories[${id}]`)) || null;
      if (!category) throw new NotFoundException('category does not exist');
      return category;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createCategory(
    createCategoriesDto: createCategoriesDto,
  ): Promise<categoriesDto> {
    const newCategory: categoriesDto = {
      id: uuidv4(),
      category: createCategoriesDto.category,
    };
    console.log(newCategory);
    await this.db.push(`/categories`, newCategory);
    return newCategory;
  }
}
