import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createTasksDto } from './dto/tasks.dto';
import { JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import { Tasks } from './interface/tasks.interface';
import { Category } from 'src/categories/interface/category.interface';
@Injectable()
export class TasksService {
  constructor(@Inject('JsonDBInstance') private readonly db: JsonDB) {}

  private get allTasks() {
    return this.db.getData('/tasks') || [];
  }

  private get allcategory() {
    return this.db.getData('/categories') || [];
  }

  async findAll(): Promise<Tasks[]> {
    try {
      return await this.allTasks;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  async getTaksById(id: string): Promise<Tasks | null> {
    try {
      const tasks = await this.allTasks;
      const singleTask = tasks.find((task: Tasks) => task.id === id);
      if (!singleTask) throw new NotFoundException('singleTask does not exist');
      return singleTask;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
  async createTask(createTasksDto: createTasksDto): Promise<Tasks> {
    const categories = await this.allcategory;
    const category = categories.find(
      (category: Category) => category.id === createTasksDto.categoryId,
    );
    if (!category) {
      throw new NotFoundException('Category not does not exist');
    }
    const newTasks: Tasks = {
      id: uuidv4(),
      title: createTasksDto.title,
      description: createTasksDto.description,
      isCompleted: false,
      categoryId: createTasksDto.categoryId,
      category: category,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    console.log(newTasks);
    await this.db.push(`/tasks[]`, newTasks);
    return newTasks;
  }

  async updateTask(id: string, createTasksDto: createTasksDto): Promise<Tasks> {
    try {
      const tasks = await this.allTasks;
      const singleTask = tasks.find((task: Tasks) => task.id === id);
      if (!singleTask) throw new NotFoundException('singleTask does not exist');
      tasks[singleTask.id] = {
        id,
        ...createTasksDto,
      };
      await this.db.push(`/categories`, tasks);

      return tasks[singleTask.id];
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async deleteTaskById(id: string): Promise<string> {
    try {
      const tasks = await this.allTasks;
      const singleTask = tasks.filter((task: Tasks) => task.id !== id);
      if (!singleTask) throw new NotFoundException('singleTask does not exist');
      await this.db.push(`/categories[]`, singleTask);
      return 'deleted';
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
