import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createTasksDto, tasksDto } from './dto/tasks.dto';
import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { categoriesDto } from 'src/categories/dto/category.dto';
@Injectable()
export class TasksService {
  constructor(@Inject('JsonDBInstance') private readonly db: JsonDB) {}

  private get allTasks() {
    return this.db.getData('/tasks') || [];
  }

  private get allcategory() {
    return this.db.getData('/categories') || [];
  }

  async findAll(): Promise<tasksDto[]> {
    try {
      return await this.allTasks;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async createTask(createTasksDto: createTasksDto): Promise<tasksDto> {
    const categories = await this.allcategory;
    const categoryIndex = categories.find(
      (category: categoriesDto) => category.id === createTasksDto.categoryId,
    );
    if (!categoryIndex) {
      throw new NotFoundException('Category not does not exist');
    }
    const newTasks: tasksDto = {
      id: uuidv4(),
      title: createTasksDto.title,
      description: createTasksDto.description,
      isCompleted: createTasksDto.isCompleted,
      categoryId: createTasksDto.categoryId,
    };
    console.log(newTasks);
    await this.db.push(`/tasks[]`, newTasks);
    return newTasks;
  }
}
