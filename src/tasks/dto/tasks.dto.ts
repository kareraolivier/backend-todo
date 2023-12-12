import { IsBoolean, IsString } from 'class-validator';

export class createTasksDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsBoolean()
  readonly isCompleted: boolean;
  @IsString()
  readonly categoryId: string;
}

export class updateTasksDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsBoolean()
  readonly isCompleted: boolean;
  @IsString()
  readonly categoryId: string;
}
