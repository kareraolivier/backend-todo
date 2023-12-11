import { Body, Controller, Get, Post } from '@nestjs/common';
import { tasksDto } from './dto/tasks.dto';
import { TasksService } from './tasks.service';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(): Promise<tasksDto[]> {
    return await this.tasksService.findAll();
  }
  @Post()
  async createTask(@Body() tasksDto: tasksDto): Promise<tasksDto> {
    return await this.tasksService.createTask(tasksDto);
  }
}
