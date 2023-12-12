import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Tasks } from './interface/tasks.interface';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<Tasks[]> {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async getTaksById(@Param('id') id: string): Promise<Tasks> {
    return await this.tasksService.getTaksById(id);
  }
  @Post()
  async createTask(@Body() tasks: Tasks): Promise<Tasks> {
    return await this.tasksService.createTask(tasks);
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() task: Tasks,
  ): Promise<Tasks> {
    return await this.tasksService.updateTask(id, task);
  }

  @Delete(':id')
  async deleteCategoryById(@Param('id') id: string): Promise<string> {
    return await this.tasksService.deleteTaskById(id);
  }
}
