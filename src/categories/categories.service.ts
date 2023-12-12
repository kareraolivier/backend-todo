import {
  Inject,
  Injectable,
  // NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { createCategoriesDto } from './dto/category.dto';
import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './interface/category.interface';
@Injectable()
export class CategoriesService {
  constructor(@Inject('JsonDBInstance') private readonly db: JsonDB) {}

  private get allcategory() {
    return this.db.getData('/categories') || [];
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.allcategory;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const categories = await this.allcategory;

      const singleCategory = categories.find(
        (category: Category) => category.id === id,
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
  ): Promise<Category> {
    // const categories = await this.allcategory;
    // console.log(categories);
    // const singleCategory =
    //   categories.some(
    //     (category: Category) =>
    //       category.category === createCategoriesDto.category,
    //   ) || [];
    // if (singleCategory.length > 0)
    //   throw new NotAcceptableException('category exist');
    const newCategory: Category = {
      id: uuidv4(),
      category: createCategoriesDto.category,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    await this.db.push(`/categories[]`, newCategory);
    return newCategory;
  }

  async updateCategory(
    id: string,
    createCategoriesDto: createCategoriesDto,
  ): Promise<Category> {
    try {
      const categories = await this.allcategory;
      const categoryIndex = categories.findIndex(
        (category: Category) => category.id === id,
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
        (category: Category) => category.id !== id,
      );
      if (!singleCategory)
        throw new NotFoundException('singleCategory does not exist');
      await this.db.push(`/categories[]`, singleCategory);
      return 'deleted';
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
