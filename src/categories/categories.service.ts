import { Injectable, NotFoundException } from '@nestjs/common';
import { categoriesDto, createCategoriesDto } from './dto/category.dto';
import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CategoriesService {
  //    constructor(@Inject('JsonDBInstance') private readonly db: JsonDB) {}
  private db = new JsonDB(new Config('Categories', true, false, '/'));
  allcategory = this.db.getData('/categories');
  async findAll(): Promise<categoriesDto[]> {
    try {
      return await this.allcategory;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getCategoryById(id: string): Promise<categoriesDto | null> {
    try {
      const categories = await this.allcategory;
      const singleCategory = categories.find(
        (category: categoriesDto) => category.id === id,
      );
      if (!singleCategory)
        throw new NotFoundException('singleCategory does not exist');
      return singleCategory;
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
    await this.db.push(`/categories[]`, newCategory);
    return newCategory;
  }
  async updateCategory(
    id: string,
    createCategoriesDto: createCategoriesDto,
  ): Promise<categoriesDto> {
    try {
      const categories = await this.allcategory;
      const categoryIndex = categories.findIndex(
        (category: categoriesDto) => category.id === id,
      );
      if (!categoryIndex) {
        throw new NotFoundException('Category not found');
      }
      categories[categoryIndex] = {
        id,
        ...createCategoriesDto,
      };
      await this.db.push(`/categories`, categories);

      return categories[categoryIndex];
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  async deleteCategoryById(id: string): Promise<string> {
    try {
      const categories = await this.allcategory;
      const singleCategory = categories.filter(
        (category: categoriesDto) => category.id !== id,
      );
      if (!singleCategory)
        throw new NotFoundException('singleCategory does not exist');
      await this.db.push(`/categories`, singleCategory);
      return 'deleted';
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
