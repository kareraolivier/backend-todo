export class tasksDto {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly isCompleted: boolean;
  readonly categoryId: string;
}

export class createTasksDto {
  readonly title: string;
  readonly description: string;
  readonly isCompleted: boolean;
  readonly categoryId: string;
}
